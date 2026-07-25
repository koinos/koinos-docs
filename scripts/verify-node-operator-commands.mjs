import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pinnedRevision = "821674672e699bf56e94d7c0e8bce122e83d1482";
const docs = [
  "docs/nodes/requirements.md",
  "docs/nodes/networks.md",
  "docs/nodes/running-node.md",
  "docs/nodes/rpc-node.md",
  "docs/nodes/block-production.md",
  "docs/nodes/configuration.md",
  "docs/nodes/management.md",
  "docs/nodes/backup-restore.md",
];
const failures = [];
let assertions = 0;

function assert(condition, message) {
  assertions += 1;
  if (!condition) failures.push(message);
}

function run(command, args = [], options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    env: { ...process.env, ...options.env },
    input: options.input,
    timeout: options.timeout ?? 30_000,
  });
}

function expectSuccess(name, result) {
  assertions += 1;
  if (result.status !== 0) {
    failures.push(
      `${name}: status=${result.status}\n` +
        `${result.stdout ?? ""}${result.stderr ?? ""}`
    );
  }
  return result;
}

function extractConsoleBlocks(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const blocks = [];
  const pattern = /^```console\n([\s\S]*?)\n```$/gm;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    blocks.push({
      doc: relativePath,
      command: match[1],
      line: source.slice(0, match.index).split("\n").length,
    });
  }
  return blocks;
}

const blocks = docs.flatMap(extractConsoleBlocks);
assert(
  blocks.length === 53,
  `expected 53 reviewed console blocks, found ${blocks.length}; ` +
    "classify and test any command-set change"
);

for (const block of blocks) {
  const syntax = run("bash", ["-n"], { input: `${block.command}\n` });
  assert(
    syntax.status === 0,
    `${block.doc}:${block.line}: invalid shell syntax: ${syntax.stderr}`
  );
  assert(
    !/(?:^|\s)(?:\.\/|bash\s+|sh\s+)\S+\.sh\b/m.test(block.command),
    `${block.doc}:${block.line}: documentation invokes a shell helper`
  );
  assert(
    !block.command.includes("examples/node-operators"),
    `${block.doc}:${block.line}: documentation invokes removed examples`
  );
}

function findBlock(doc, requiredText) {
  const match = blocks.find(
    (block) =>
      block.doc === doc &&
      requiredText.every((text) => block.command.includes(text))
  );
  assert(
    Boolean(match),
    `${doc}: missing reviewed command block containing ${requiredText.join(", ")}`
  );
  return match?.command ?? "";
}

const requiredProcedures = [
  ["docs/nodes/running-node.md", ["docker compose config"]],
  ["docs/nodes/running-node.md", ["chain.get_head_info"]],
  ["docs/nodes/running-node.md", ["p2p.get_gossip_status"]],
  ["docs/nodes/rpc-node.md", ["grpcurl", "-protoset"]],
  ["docs/nodes/rpc-node.md", ["sudo ss -lntp"]],
  ["docs/nodes/block-production.md", ["chmod 600", "private.key"]],
  ["docs/nodes/configuration.md", ["diff -u", ".env.before-change"]],
  ["docs/nodes/management.md", ["docker compose pull"]],
  ["docs/nodes/backup-restore.md", ["sha256sum koinos-backup.tar.gz"]],
  ["docs/nodes/backup-restore.md", ["tar -xzf", ".koinos/chain"]],
  ["docs/nodes/backup-restore.md", ["cp -a", "block_store"]],
];
for (const [doc, fragments] of requiredProcedures) findBlock(doc, fragments);

async function fetchBytes(url) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`unable to fetch ${url}: ${lastError}`);
}

async function downloadOfficialBundle(destination) {
  const files = [
    "docker-compose.yml",
    "env.example",
    "config-example/config.yml",
    "config-example/rabbitmq.conf",
    "config-example/genesis_data.json",
    "config-example/koinos_descriptors.pb",
  ];
  for (const relativePath of files) {
    const url =
      `https://raw.githubusercontent.com/koinos/koinos/` +
      `${pinnedRevision}/${relativePath}`;
    const target = path.join(destination, relativePath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, await fetchBytes(url));
  }
}

function serviceSet(bundle, baseEnv, profile) {
  const envPath = path.join(bundle, `.env.${profile.replace(",", "-")}`);
  fs.writeFileSync(
    envPath,
    `${baseEnv}\n` +
      `BASEDIR=/tmp/koinos-command-verification\n` +
      `JSONRPC_INTERFACE=127.0.0.1\nJSONRPC_PORT=8080\n` +
      `REST_INTERFACE=127.0.0.1\nREST_PORT=3000\n` +
      `GRPC_INTERFACE=127.0.0.1\nGRPC_PORT=50051\n` +
      `COMPOSE_PROFILES=${profile}\n`
  );
  const result = expectSuccess(
    `Docker Compose profile ${profile}`,
    run(
      "docker",
      [
        "compose",
        "--project-directory",
        bundle,
        "--env-file",
        envPath,
        "-f",
        path.join(bundle, "docker-compose.yml"),
        "config",
        "--services",
      ],
      { timeout: 60_000 }
    )
  );
  return new Set(result.stdout.trim().split(/\s+/).filter(Boolean));
}

function assertServices(name, actual, required, forbidden = []) {
  for (const service of required) {
    assert(actual.has(service), `${name}: missing service ${service}`);
  }
  for (const service of forbidden) {
    assert(!actual.has(service), `${name}: unexpectedly enables ${service}`);
  }
}

function parseJsonResult(name, result) {
  expectSuccess(name, result);
  try {
    const payload = JSON.parse(result.stdout);
    assert(!payload.error, `${name}: returned JSON-RPC error`);
    return payload;
  } catch (error) {
    failures.push(`${name}: invalid JSON output: ${error}`);
    return {};
  }
}

function executeLiveCommand(name, block, replacements = []) {
  let command = block;
  for (const [from, to] of replacements) command = command.replaceAll(from, to);
  return parseJsonResult(
    name,
    run("bash", ["-euo", "pipefail", "-c", command], { timeout: 30_000 })
  );
}

function tarNamesFromPartialGzip(compressed) {
  return new Promise((resolve) => {
    const chunks = [];
    const gunzip = createGunzip();
    gunzip.on("data", (chunk) => chunks.push(chunk));
    const finish = () => {
      const uncompressed = Buffer.concat(chunks);
      const names = [];
      let offset = 0;
      while (offset + 512 <= uncompressed.length && names.length < 4) {
        const header = uncompressed.subarray(offset, offset + 512);
        const name = header
          .subarray(0, 100)
          .toString("utf8")
          .replace(/\0.*$/, "");
        if (!name) break;
        const sizeText = header
          .subarray(124, 136)
          .toString("ascii")
          .replace(/\0.*$/, "")
          .trim();
        const size = Number.parseInt(sizeText || "0", 8);
        names.push(name);
        offset += 512 + Math.ceil(size / 512) * 512;
      }
      resolve(names);
    };
    gunzip.on("end", finish);
    gunzip.on("error", finish);
    gunzip.end(compressed);
  });
}

async function verifyPublicBackupMetadata() {
  const base = "https://seed.koinosfoundation.org/backups";
  const metadata = (await fetchBytes(`${base}/koinos-backup.tar.gz.metadata`))
    .toString("utf8");
  const checksum = (await fetchBytes(`${base}/koinos-backup.tar.gz.sha256`))
    .toString("utf8");
  assert(
    metadata.includes("chain/") && metadata.includes("block_store/"),
    "public backup metadata must include chain and block_store"
  );
  assert(
    /^[0-9a-f]{64}\s+/im.test(checksum),
    "public backup checksum file must publish a SHA-256 digest"
  );

  const response = await fetch(`${base}/koinos-backup.tar.gz`, {
    headers: { Range: "bytes=0-65535" },
    signal: AbortSignal.timeout(20_000),
  });
  assert(
    response.status === 206,
    `public backup must support bounded range verification, got ${response.status}`
  );
  const contentRange = response.headers.get("content-range") ?? "";
  assert(
    /^bytes 0-65535\/\d+$/.test(contentRange),
    `unexpected public backup Content-Range: ${contentRange}`
  );
  const names = await tarNamesFromPartialGzip(
    Buffer.from(await response.arrayBuffer())
  );
  assert(
    names[0] === ".koinos/" && names[1] === ".koinos/block_store/",
    `public backup prefix changed: ${names.join(", ")}`
  );
}

function transformedFixtureCommand(command, fixture) {
  let transformed = command
    .replaceAll(
      "/var/lib/koinos-before-restore-2026-07-25",
      path.join(fixture, "before")
    )
    .replaceAll("/var/lib/koinos", path.join(fixture, "active"))
    .replaceAll("/srv/koinos-restore", path.join(fixture, "stage"))
    .replaceAll("sudo ", "");

  if (process.platform !== "linux" && transformed.includes("chown -R --reference=")) {
    const lines = transformed.split("\n");
    const index = lines.findIndex((line) =>
      line.startsWith("chown -R --reference=")
    );
    if (index >= 0) {
      lines.splice(
        index,
        2,
        `chown -R ${process.getuid()}:${process.getgid()} ` +
          `${path.join(fixture, "active/chain")} ` +
          `${path.join(fixture, "active/block_store")}`
      );
      transformed = lines.join("\n");
    }
  }
  return transformed;
}

function runFixtureBlock(name, command, fixture, cwd = root) {
  return expectSuccess(
    name,
    run(
      "bash",
      ["-euo", "pipefail", "-c", transformedFixtureCommand(command, fixture)],
      { cwd, timeout: 30_000 }
    )
  );
}

function verifyBackupProcedure(fixture) {
  const stage = path.join(fixture, "stage");
  const source = path.join(fixture, "archive-source/.koinos");
  const active = path.join(fixture, "active");
  fs.mkdirSync(path.join(source, "chain"), { recursive: true });
  fs.mkdirSync(path.join(source, "block_store"), { recursive: true });
  fs.mkdirSync(path.join(active, "chain"), { recursive: true });
  fs.mkdirSync(path.join(active, "block_store"), { recursive: true });
  fs.mkdirSync(path.join(active, "p2p"), { recursive: true });
  fs.mkdirSync(stage, { recursive: true });
  fs.writeFileSync(path.join(source, "chain/new"), "new chain\n");
  fs.writeFileSync(path.join(source, "block_store/new"), "new block store\n");
  fs.writeFileSync(path.join(active, "chain/old"), "old chain\n");
  fs.writeFileSync(path.join(active, "block_store/old"), "old block store\n");
  fs.writeFileSync(path.join(active, "p2p/identity"), "local identity\n");

  const archive = path.join(stage, "koinos-backup.tar.gz");
  expectSuccess(
    "create disposable backup archive",
    run(
      "tar",
      [
        "-czf",
        archive,
        "-C",
        path.join(fixture, "archive-source"),
        ".koinos",
      ],
      { timeout: 30_000 }
    )
  );
  const digest = crypto
    .createHash("sha256")
    .update(fs.readFileSync(archive))
    .digest("hex");
  fs.writeFileSync(
    path.join(stage, "koinos-backup.tar.gz.sha256"),
    `${digest}  /source/koinos-backup.tar.gz\n`
  );

  const checksumBlock = findBlock("docs/nodes/backup-restore.md", [
    "sha256sum koinos-backup.tar.gz",
  ]);
  const checksumResult = expectSuccess(
    "documented backup checksum command",
    run("bash", ["-euo", "pipefail", "-c", checksumBlock], {
      cwd: stage,
    })
  );
  assert(
    checksumResult.stdout.startsWith(digest),
    "documented checksum command returned the wrong digest"
  );

  runFixtureBlock(
    "documented rollback-directory command",
    findBlock("docs/nodes/backup-restore.md", [
      "mkdir /var/lib/koinos-before-restore-2026-07-25",
    ]),
    fixture
  );
  runFixtureBlock(
    "documented state-preservation commands",
    findBlock("docs/nodes/backup-restore.md", [
      "mv /var/lib/koinos/chain",
      "mv /var/lib/koinos/block_store",
    ]),
    fixture
  );
  runFixtureBlock(
    "documented extraction-directory commands",
    findBlock("docs/nodes/backup-restore.md", ["mkdir extracted"]),
    fixture
  );
  runFixtureBlock(
    "documented selective extraction command",
    findBlock("docs/nodes/backup-restore.md", [
      "tar -xzf",
      ".koinos/chain",
      ".koinos/block_store",
    ]),
    fixture,
    stage
  );
  runFixtureBlock(
    "documented core-state installation commands",
    findBlock("docs/nodes/backup-restore.md", [
      "cp -a",
      "chown -R --reference",
    ]),
    fixture,
    stage
  );

  assert(
    fs.existsSync(path.join(active, "chain/new")),
    "restore fixture did not install new chain data"
  );
  assert(
    fs.existsSync(path.join(active, "block_store/new")),
    "restore fixture did not install new block-store data"
  );
  assert(
    fs.existsSync(path.join(fixture, "before/chain/old")),
    "restore fixture did not preserve old chain data"
  );
  assert(
    fs.existsSync(path.join(fixture, "before/block_store/old")),
    "restore fixture did not preserve old block-store data"
  );
  assert(
    fs.readFileSync(path.join(active, "p2p/identity"), "utf8") ===
      "local identity\n",
    "restore fixture changed the local P2P identity"
  );
}

function verifyKeyPermissions(fixture) {
  const keyDirectory = path.join(fixture, "active/block_producer");
  fs.mkdirSync(keyDirectory, { recursive: true, mode: 0o755 });
  fs.writeFileSync(path.join(keyDirectory, "private.key"), "fixture\n", {
    mode: 0o644,
  });
  fs.writeFileSync(path.join(keyDirectory, "public.key"), "fixture\n", {
    mode: 0o600,
  });

  let command = findBlock("docs/nodes/block-production.md", [
    "chmod 700",
    "chmod 600",
    "chown -R koinos:koinos",
  ])
    .replaceAll("/var/lib/koinos", path.join(fixture, "active"))
    .replaceAll("sudo ", "")
    .replace(
      "chown -R koinos:koinos",
      `chown -R ${process.getuid()}:${process.getgid()}`
    );
  expectSuccess(
    "documented producer-key permission commands",
    run("bash", ["-euo", "pipefail", "-c", command])
  );

  assert(
    (fs.statSync(keyDirectory).mode & 0o777) === 0o700,
    "producer key directory mode is not 700"
  );
  assert(
    (fs.statSync(path.join(keyDirectory, "private.key")).mode & 0o777) ===
      0o600,
    "producer private key mode is not 600"
  );
  assert(
    (fs.statSync(path.join(keyDirectory, "public.key")).mode & 0o777) ===
      0o644,
    "producer public key mode is not 644"
  );
}

const fixture = fs.mkdtempSync(path.join(root, ".node-command-test-"));
try {
  const bundle = path.join(fixture, "official-bundle");
  fs.mkdirSync(bundle, { recursive: true });
  await downloadOfficialBundle(bundle);
  const baseEnv = fs.readFileSync(path.join(bundle, "env.example"), "utf8");
  const requiredCore = ["amqp", "chain", "mempool", "block_store", "p2p"];

  const observer = serviceSet(bundle, baseEnv, "jsonrpc");
  assertServices(
    "observer profile",
    observer,
    [...requiredCore, "jsonrpc"],
    ["block_producer", "rest", "grpc"]
  );

  const api = serviceSet(bundle, baseEnv, "api");
  assertServices(
    "API profile",
    api,
    [
      ...requiredCore,
      "jsonrpc",
      "rest",
      "grpc",
      "transaction_store",
      "contract_meta_store",
      "account_history",
    ],
    ["block_producer"]
  );

  const producer = serviceSet(bundle, baseEnv, "block_producer,jsonrpc");
  assertServices(
    "producer profile",
    producer,
    [...requiredCore, "jsonrpc", "block_producer"],
    ["rest", "grpc", "transaction_store", "account_history"]
  );

  const mainnetChain = executeLiveCommand(
    "documented mainnet chain-ID command",
    findBlock("docs/nodes/networks.md", [
      "https://api.koinos.io/jsonrpc",
      "chain.get_chain_id",
    ])
  );
  assert(
    typeof mainnetChain.result?.chain_id === "string",
    "mainnet chain-ID command returned no chain ID"
  );

  const mainnetHead = executeLiveCommand(
    "documented mainnet head command",
    findBlock("docs/nodes/networks.md", [
      "https://api.koinos.io/jsonrpc",
      "chain.get_head_info",
    ])
  );
  assert(
    Number(mainnetHead.result?.head_topology?.height) > 0,
    "mainnet head command returned no positive height"
  );

  const localHead = executeLiveCommand(
    "documented local JSON-RPC command against mainnet",
    findBlock("docs/nodes/running-node.md", ["chain.get_head_info"]),
    [["http://127.0.0.1:8080/", "https://api.koinos.io/jsonrpc"]]
  );
  assert(
    Number(localHead.result?.head_topology?.height) > 0,
    "local JSON-RPC command shape returned no positive public height"
  );

  const gossip = executeLiveCommand(
    "documented gossip command against mainnet",
    findBlock("docs/nodes/running-node.md", ["p2p.get_gossip_status"]),
    [["http://127.0.0.1:8080/", "https://api.koinos.io/jsonrpc"]]
  );
  assert(
    gossip.result?.enabled === true,
    "gossip command did not report enabled"
  );

  const rest = executeLiveCommand(
    "documented REST command against mainnet",
    findBlock("docs/nodes/rpc-node.md", [
      "http://127.0.0.1:3000/v1/chain/head_info",
    ]),
    [[
      "http://127.0.0.1:3000/v1/chain/head_info",
      "https://api.koinos.io/v1/chain/head_info",
    ]]
  );
  assert(
    Number(rest.head_topology?.height) > 0,
    "REST command returned no positive height"
  );

  const fakeBin = path.join(fixture, "fake-bin");
  const grpcArgs = path.join(fixture, "grpcurl.args");
  fs.mkdirSync(fakeBin);
  fs.writeFileSync(
    path.join(fakeBin, "grpcurl"),
    "#!/usr/bin/env bash\nprintf '%s\\n' \"$@\" > \"$GRPC_ARGS\"\n" +
      "printf '{\"headTopology\":{\"height\":\"1\",\"id\":\"fixture\"}}\\n'\n",
    { mode: 0o755 }
  );
  const grpcCommand = findBlock("docs/nodes/rpc-node.md", [
    "grpcurl",
    "-protoset",
  ]).replace(
    "/opt/koinos/config/koinos_descriptors.pb",
    path.join(bundle, "config-example/koinos_descriptors.pb")
  );
  expectSuccess(
    "documented gRPC command argument shape",
    run("bash", ["-euo", "pipefail", "-c", grpcCommand], {
      env: {
        PATH: `${fakeBin}:${process.env.PATH}`,
        GRPC_ARGS: grpcArgs,
      },
    })
  );
  const recordedGrpcArgs = fs.readFileSync(grpcArgs, "utf8");
  assert(
    recordedGrpcArgs.includes("-plaintext") &&
      recordedGrpcArgs.includes("-protoset") &&
      recordedGrpcArgs.includes("koinos.rpc.chain.chain_rpc/get_head_info"),
    "gRPC command does not pass transport, descriptors, and method"
  );

  await verifyPublicBackupMetadata();
  verifyBackupProcedure(fixture);
  verifyKeyPermissions(fixture);
} finally {
  if (
    fixture.startsWith(`${root}${path.sep}.node-command-test-`) &&
    fs.existsSync(fixture)
  ) {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${blocks.length} documented operator command blocks with ` +
      `${assertions} syntax, upstream, profile, live-protocol, backup, and ` +
      `permission assertions.`
  );
}
