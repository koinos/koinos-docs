import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const officialBranch = "master";
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

function extractLanguageBlocks(relativePath, language) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const matches = [];
  const pattern = new RegExp(
    `^\`\`\`${language}\\n([\\s\\S]*?)\\n\`\`\`$`,
    "gm"
  );
  let match;
  while ((match = pattern.exec(source)) !== null) matches.push(match[1]);
  return matches;
}

const blocks = docs.flatMap(extractConsoleBlocks);
assert(
  blocks.length === 92,
  `expected 92 reviewed console blocks, found ${blocks.length}; ` +
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
  [
    "docs/nodes/running-node.md",
    ["git clone --branch master", "git pull --ff-only origin master"],
  ],
  [
    "docs/nodes/running-node.md",
    ["cp env.example .env", "cp -R config-example config"],
  ],
  ["docs/nodes/running-node.md", ["docker compose config"]],
  ["docs/nodes/running-node.md", ["RestartCount", "block_producer"]],
  ["docs/nodes/running-node.md", ["local_age", "public_height"]],
  ["docs/nodes/running-node.md", ["height_before", "height_after"]],
  ["docs/nodes/running-node.md", ["p2p.get_gossip_status", "peer_lines"]],
  ["docs/nodes/rpc-node.md", ["grpcurl", "-protoset"]],
  [
    "docs/nodes/rpc-node.md",
    ["Type ENABLE", "ufw --force enable", "sudo ss -lntp"],
  ],
  ["docs/nodes/rpc-node.md", ["for port in", "8888", "15672"]],
  ["docs/nodes/rpc-node.md", ["certbot renew --dry-run", "nginx -t"]],
  ["docs/nodes/block-production.md", ["chmod 600", "private.key"]],
  ["docs/nodes/block-production.md", ["cat", "public.key"]],
  [
    "docs/nodes/block-production.md",
    ["block_store.get_blocks_by_id", "produced_block_id"],
  ],
  ["docs/nodes/configuration.md", ["diff -u", ".env.before-change"]],
  [
    "docs/nodes/configuration.md",
    ["docker compose config --environment", "config --profiles"],
  ],
  [
    "docs/nodes/management.md",
    ["/opt/koinos-next", "--project-name koinos pull", "--remove-orphans"],
  ],
  [
    "docs/nodes/management.md",
    ["/opt/koinos-next", "/opt/koinos", "--project-name koinos stop"],
  ],
  ["docs/nodes/management.md", ["reindex_backup", "chain"]],
  ["docs/nodes/management.md", ["failed_reindex", "reindex_backup"]],
  ["docs/nodes/management.md", ["resync_backup", "for state_dir"]],
  ["docs/nodes/management.md", ["failed_resync", "resync_backup"]],
  ["docs/nodes/backup-restore.md", ["sha256sum --check -", "published_sha"]],
  [
    "docs/nodes/backup-restore.md",
    ["unsafe archive member path", "archive-members.txt"],
  ],
  ["docs/nodes/backup-restore.md", ["local_chain_id", "mainnet_chain_id"]],
  ["docs/nodes/backup-restore.md", ["rollback_dir", "for state_dir"]],
  ["docs/nodes/backup-restore.md", ["tar -xzf", ".koinos/chain"]],
  ["docs/nodes/backup-restore.md", ["cp -a", "block_store"]],
  ["docs/nodes/backup-restore.md", ["failed_restore", "rollback_dir"]],
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
      `${officialBranch}/${relativePath}`;
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
    .replaceAll("/opt/koinos-next", path.join(fixture, "project-next"))
    .replaceAll("/opt/koinos", path.join(fixture, "project"))
    .replaceAll("/var/lib/koinos", path.join(fixture, "active"))
    .replaceAll("/srv/koinos-restore", path.join(fixture, "stage"))
    .replaceAll("sudo -u koinos ", "")
    .replaceAll(
      "-o koinos -g koinos",
      `-o ${process.getuid()} -g ${process.getgid()}`
    )
    .replaceAll(
      "chown -R koinos:koinos",
      `chown -R ${process.getuid()}:${process.getgid()}`
    )
    .replaceAll("sudo ", "");

  if (process.platform !== "linux" && transformed.includes("chown -R --reference=")) {
    const lines = transformed.split("\n");
    const index = lines.findIndex((line) =>
      line.trimStart().startsWith("chown -R --reference=")
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

function runFixtureBlock(name, command, fixture, cwd = root, env = {}) {
  return expectSuccess(
    name,
    run(
      "bash",
      ["-euo", "pipefail", "-c", transformedFixtureCommand(command, fixture)],
      { cwd, env, timeout: 30_000 }
    )
  );
}

function verifyBackupProcedure(fixture) {
  const stage = path.join(fixture, "stage");
  const source = path.join(fixture, "archive-source/.koinos");
  const active = path.join(fixture, "active");
  const project = path.join(fixture, "project");
  const fakeBin = path.join(fixture, "backup-fake-bin");
  fs.mkdirSync(path.join(source, "chain"), { recursive: true });
  fs.mkdirSync(path.join(source, "block_store"), { recursive: true });
  fs.mkdirSync(path.join(active, "chain"), { recursive: true });
  fs.mkdirSync(path.join(active, "block_store"), { recursive: true });
  fs.mkdirSync(path.join(active, "p2p"), { recursive: true });
  for (const state of [
    "mempool",
    "transaction_store",
    "account_history",
    "contract_meta_store",
  ]) {
    fs.mkdirSync(path.join(active, state), { recursive: true });
    fs.writeFileSync(path.join(active, state, "old"), `${state}\n`);
  }
  fs.mkdirSync(path.join(project, "config"), { recursive: true });
  fs.writeFileSync(path.join(project, ".env"), "BASEDIR=/fixture\n");
  fs.writeFileSync(
    path.join(project, "config/config.yml"),
    "chain:\n  verify-blocks: true\n\np2p:\n  listen: fixture\n"
  );
  fs.mkdirSync(stage, { recursive: true });
  fs.mkdirSync(fakeBin, { recursive: true });
  fs.writeFileSync(path.join(source, "chain/new"), "new chain\n");
  fs.writeFileSync(path.join(source, "block_store/new"), "new block store\n");
  fs.writeFileSync(path.join(active, "chain/old"), "old chain\n");
  fs.writeFileSync(path.join(active, "block_store/old"), "old block store\n");
  fs.writeFileSync(path.join(active, "p2p/identity"), "local identity\n");
  fs.writeFileSync(
    path.join(fakeBin, "curl"),
    "#!/usr/bin/env bash\n" +
      "printf '{\"jsonrpc\":\"2.0\",\"result\":{\"chain_id\":\"fixture-chain\"}}\\n'\n",
    { mode: 0o755 }
  );
  fs.writeFileSync(path.join(fakeBin, "docker"), "#!/usr/bin/env bash\nexit 0\n", {
    mode: 0o755,
  });
  const fixtureEnv = { PATH: `${fakeBin}:${process.env.PATH}` };

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
    "sha256sum --check -",
    "published_sha",
  ]);
  const checksumResult = expectSuccess(
    "documented backup checksum command",
    run("bash", ["-euo", "pipefail", "-c", checksumBlock], {
      cwd: stage,
    })
  );
  assert(
    checksumResult.stdout.includes("koinos-backup.tar.gz: OK"),
    "documented checksum command did not verify the archive"
  );

  const archiveListing = findBlock("docs/nodes/backup-restore.md", [
    "tar -tzf koinos-backup.tar.gz",
    "archive-members.txt",
  ]);
  const archiveGuards = findBlock("docs/nodes/backup-restore.md", [
    "unsafe archive member path",
    "archive-members.txt",
  ]);
  const archiveCheck = `${archiveListing}\n${archiveGuards}`;
  expectSuccess(
    "documented archive path and link checks",
    run("bash", ["-euo", "pipefail", "-c", archiveCheck], {
      cwd: stage,
    })
  );
  const maliciousCheck = archiveCheck.replace(
    "tar -tzf koinos-backup.tar.gz > archive-members.txt",
    "printf '../escape\\n' > archive-members.txt"
  );
  const maliciousResult = run(
    "bash",
    ["-euo", "pipefail", "-c", maliciousCheck],
    { cwd: stage }
  );
  assert(
    maliciousResult.status !== 0,
    "documented archive check accepted a parent-traversal member"
  );

  runFixtureBlock(
    "documented restore target and network checks",
    findBlock("docs/nodes/backup-restore.md", [
      "local_chain_id",
      "mainnet_chain_id",
    ]),
    fixture,
    root,
    fixtureEnv
  );
  runFixtureBlock(
    "documented rollback-directory command",
    findBlock("docs/nodes/backup-restore.md", [
      "rollback_dir=",
      "rollback-directory.txt",
      "install -d",
    ]),
    fixture
  );
  runFixtureBlock(
    "documented rollback target display and checks",
    findBlock("docs/nodes/backup-restore.md", [
      "active data:",
      "rollback-directory.txt",
    ]),
    fixture
  );
  runFixtureBlock(
    "documented state-preservation commands",
    findBlock("docs/nodes/backup-restore.md", [
      "for state_dir in",
      "rollback-directory.txt",
      "sudo mv",
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
  runFixtureBlock(
    "documented verify-blocks configuration check",
    findBlock("docs/nodes/backup-restore.md", [
      "chain_section=",
      "verify-blocks:",
    ]),
    fixture
  );

  const rollbackDirectory = fs
    .readFileSync(path.join(stage, "rollback-directory.txt"), "utf8")
    .trim();
  assert(
    fs.existsSync(path.join(active, "chain/new")),
    "restore fixture did not install new chain data"
  );
  assert(
    fs.existsSync(path.join(active, "block_store/new")),
    "restore fixture did not install new block-store data"
  );
  assert(
    fs.existsSync(path.join(rollbackDirectory, "chain/old")),
    "restore fixture did not preserve old chain data"
  );
  assert(
    fs.existsSync(path.join(rollbackDirectory, "block_store/old")),
    "restore fixture did not preserve old block-store data"
  );
  assert(
    fs.readFileSync(path.join(active, "p2p/identity"), "utf8") ===
      "local identity\n",
    "restore fixture changed the local P2P identity"
  );

  runFixtureBlock(
    "documented restore rollback commands",
    findBlock("docs/nodes/backup-restore.md", [
      "failed_restore=",
      "rollback-directory.txt",
      "docker compose up -d",
    ]),
    fixture,
    root,
    fixtureEnv
  );
  assert(
    fs.existsSync(path.join(active, "chain/old")) &&
      fs.existsSync(path.join(active, "block_store/old")),
    "restore rollback did not return the previous core data"
  );
  assert(
    fs.readFileSync(path.join(active, "p2p/identity"), "utf8") ===
      "local identity\n",
    "restore rollback changed the local P2P identity"
  );
  const failedRestores = fs
    .readdirSync(fixture)
    .filter((name) => name.startsWith("active-failed-restore-"));
  assert(
    failedRestores.some((name) =>
      fs.existsSync(path.join(fixture, name, "chain/new"))
    ),
    "restore rollback did not preserve the failed restored generation"
  );
}

function verifyHealthCommands(fixture) {
  const fakeBin = path.join(fixture, "health-fake-bin");
  const headCounter = path.join(fixture, "health-counter");
  const restartCounter = path.join(fixture, "restart-counter");
  fs.mkdirSync(fakeBin, { recursive: true });
  fs.writeFileSync(headCounter, "100\n");
  fs.writeFileSync(restartCounter, "5\n");
  fs.writeFileSync(
    path.join(fakeBin, "docker"),
    `#!/usr/bin/env bash
if [[ "$1" == "compose" && "$2" == "ps" && "$*" == *"--services"* ]]; then
  printf '%s\\n' amqp chain mempool block_store p2p jsonrpc
elif [[ "$1" == "compose" && "$2" == "ps" && "$*" == *"-q"* ]]; then
  printf 'fixture-%s\\n' "\${!#}"
elif [[ "$1" == "inspect" && "$3" == *"State.Status"* ]]; then
  if [[ "$HEALTH_MODE" == "restarting" ]]; then
    printf 'restarting\\n'
  else
    printf 'running\\n'
  fi
elif [[ "$1" == "inspect" && "$3" == *"RestartCount"* ]]; then
  cat "$FAKE_RESTART_COUNTER"
elif [[ "$1" == "compose" && "$2" == "logs" ]]; then
  printf 'p2p | My address:\\n'
  printf 'p2p |  - /ip4/127.0.0.1/tcp/8888/p2p/QmOwnAddress\\n'
  printf 'p2p | Connected peers:\\n'
  if [[ "$HEALTH_MODE" != "own-address-only" ]]; then
    printf 'p2p |  - /ip4/192.0.2.10/tcp/8888/p2p/QmFixturePeer\\n'
  fi
  printf 'p2p | Recently gossiped:\\n'
else
  exit 1
fi
`,
    { mode: 0o755 }
  );
  fs.writeFileSync(
    path.join(fakeBin, "curl"),
    `#!/usr/bin/env bash
if [[ "$*" == *"p2p.get_gossip_status"* ]]; then
  printf '{"jsonrpc":"2.0","result":{"enabled":true}}\\n'
else
  value="$(cat "$FAKE_HEAD_COUNTER")"
  value="$((value + 1))"
  printf '%s\\n' "$value" > "$FAKE_HEAD_COUNTER"
  now_ms="$(($(date +%s) * 1000 - 1000))"
  printf '{"jsonrpc":"2.0","result":{"head_topology":{"height":"%s"},"head_block_time":"%s"}}\\n' "$value" "$now_ms"
fi
`,
    { mode: 0o755 }
  );
  fs.writeFileSync(
    path.join(fakeBin, "sleep"),
    `#!/usr/bin/env bash
if [[ "$HEALTH_MODE" == "restart-increase" ]]; then
  value="$(cat "$FAKE_RESTART_COUNTER")"
  printf '%s\\n' "$((value + 1))" > "$FAKE_RESTART_COUNTER"
fi
exit 0
`,
    { mode: 0o755 }
  );
  const env = {
    PATH: `${fakeBin}:${process.env.PATH}`,
    FAKE_HEAD_COUNTER: headCounter,
    FAKE_RESTART_COUNTER: restartCounter,
    HEALTH_MODE: "stable",
  };

  for (const [name, fragments] of [
    ["service and restart checks", ["RestartCount", "block_producer"]],
    ["head freshness calculation", ["local_age", "public_height"]],
    ["head advancement check", ["height_before", "height_after"]],
    ["gossip and peer checks", ["p2p.get_gossip_status", "peer_lines"]],
  ]) {
    expectSuccess(
      `documented ${name}`,
      run(
        "bash",
        [
          "-euo",
          "pipefail",
          "-c",
          findBlock("docs/nodes/running-node.md", fragments),
        ],
        { env, timeout: 30_000 }
      )
    );
  }

  const restartBlock = findBlock("docs/nodes/running-node.md", [
    "RestartCount",
    "containers_before",
    "containers_after",
  ]);
  fs.writeFileSync(restartCounter, "5\n");
  const increasingRestart = run(
    "bash",
    ["-euo", "pipefail", "-c", restartBlock],
    {
      env: { ...env, HEALTH_MODE: "restart-increase" },
      timeout: 30_000,
    }
  );
  assert(
    increasingRestart.status !== 0,
    "restart check accepted an increasing restart count"
  );

  fs.writeFileSync(restartCounter, "5\n");
  const restartingContainer = run(
    "bash",
    ["-euo", "pipefail", "-c", restartBlock],
    {
      env: { ...env, HEALTH_MODE: "restarting" },
      timeout: 30_000,
    }
  );
  assert(
    restartingContainer.status !== 0,
    "restart check accepted a container in a restart loop"
  );

  const peerBlock = findBlock("docs/nodes/running-node.md", [
    "p2p.get_gossip_status",
    "Connected peers:",
    "peer_lines",
  ]);
  const ownAddressOnly = run(
    "bash",
    ["-euo", "pipefail", "-c", peerBlock],
    {
      env: { ...env, HEALTH_MODE: "own-address-only" },
      timeout: 30_000,
    }
  );
  assert(
    ownAddressOnly.status !== 0,
    "peer check counted the node's own My address entry as a connected peer"
  );
}

function verifyFirewallProcedure(fixture) {
  const firewallFixture = path.join(fixture, "firewall");
  const fakeBin = path.join(firewallFixture, "fake-bin");
  const logPath = path.join(firewallFixture, "commands.log");
  fs.mkdirSync(fakeBin, { recursive: true });
  fs.writeFileSync(
    path.join(fakeBin, "sudo"),
    "#!/usr/bin/env bash\nprintf '%s\\n' \"$*\" >> \"$FIREWALL_LOG\"\n",
    { mode: 0o755 }
  );

  const command = findBlock("docs/nodes/rpc-node.md", [
    "Type ENABLE",
    "ufw --force enable",
    "ufw status verbose",
    "sudo ss -lntp",
  ]);
  const env = {
    PATH: `${fakeBin}:${process.env.PATH}`,
    FIREWALL_LOG: logPath,
  };
  expectSuccess(
    "documented UFW activation after recovery SSH verification",
    run("bash", ["-euo", "pipefail", "-c", command], {
      env,
      input: "ENABLE\n",
    })
  );
  const log = fs.readFileSync(logPath, "utf8");
  for (const expected of [
    "ufw --force enable",
    "ufw status verbose",
    "ss -lntp",
  ]) {
    assert(log.includes(expected), `UFW procedure did not run ${expected}`);
  }

  const rejectedConfirmation = run(
    "bash",
    ["-euo", "pipefail", "-c", command],
    { env, input: "NO\n" }
  );
  assert(
    rejectedConfirmation.status !== 0,
    "UFW procedure accepted activation without explicit confirmation"
  );
}

function verifyUpdateRollback(fixture) {
  const updateFixture = path.join(fixture, "update-switch");
  const currentProject = path.join(updateFixture, "project");
  const nextProject = path.join(updateFixture, "project-next");
  const fakeBin = path.join(updateFixture, "fake-bin");
  const logPath = path.join(updateFixture, "compose.log");
  fs.mkdirSync(currentProject, { recursive: true });
  fs.mkdirSync(nextProject, { recursive: true });
  fs.mkdirSync(fakeBin, { recursive: true });
  fs.writeFileSync(
    path.join(fakeBin, "docker"),
    "#!/usr/bin/env bash\nprintf '%s|%s\\n' \"$PWD\" \"$*\" >> \"$COMPOSE_LOG\"\n",
    { mode: 0o755 }
  );
  const env = {
    PATH: `${fakeBin}:${process.env.PATH}`,
    COMPOSE_LOG: logPath,
  };

  const activation = findBlock("docs/nodes/management.md", [
    "/opt/koinos-next",
    "--project-name koinos pull",
    "--project-name koinos stop",
    "up -d --remove-orphans",
  ]);
  runFixtureBlock(
    "documented update activation commands",
    activation,
    updateFixture,
    root,
    env
  );
  let lines = fs.readFileSync(logPath, "utf8").trim().split("\n");
  assert(
    lines.every((line) => line.includes("compose --project-name koinos")),
    "update activation did not use the explicit Compose project name"
  );
  assert(
    lines.some(
      (line) => line.startsWith(`${nextProject}|`) && line.endsWith(" pull")
    ),
    "update activation did not pull from the proposed checkout"
  );
  assert(
    lines.some(
      (line) =>
        line.startsWith(`${currentProject}|`) && line.endsWith(" stop")
    ),
    "update activation did not stop the current checkout"
  );
  assert(
    lines.some(
      (line) =>
        line.startsWith(`${nextProject}|`) &&
        line.endsWith(" up -d --remove-orphans")
    ),
    "update activation did not start the proposed checkout"
  );

  fs.writeFileSync(logPath, "");
  const rollbackMatch = blocks.find(
    (block) =>
      block.doc === "docs/nodes/management.md" &&
      block.command.includes("/opt/koinos-next") &&
      block.command.includes("/opt/koinos") &&
      block.command.includes("--project-name koinos stop") &&
      block.command.includes("up -d --remove-orphans") &&
      !block.command.includes("--project-name koinos pull")
  );
  assert(
    Boolean(rollbackMatch),
    "docs/nodes/management.md: missing executable update rollback block"
  );
  const rollback = rollbackMatch?.command ?? "";
  runFixtureBlock(
    "documented update rollback commands",
    rollback,
    updateFixture,
    root,
    env
  );
  lines = fs.readFileSync(logPath, "utf8").trim().split("\n");
  assert(
    lines.every((line) => line.includes("compose --project-name koinos")),
    "update rollback did not use the explicit Compose project name"
  );
  assert(
    lines[0]?.startsWith(`${nextProject}|`) && lines[0].endsWith(" stop"),
    "update rollback did not stop the proposed checkout first"
  );
  assert(
    lines.some(
      (line) =>
        line.startsWith(`${currentProject}|`) &&
        line.endsWith(" up -d --remove-orphans")
    ),
    "update rollback did not restart the previous checkout"
  );
}

function verifyNginxConfiguration(fixture) {
  const nginxBlocks = extractLanguageBlocks("docs/nodes/rpc-node.md", "nginx");
  assert(
    nginxBlocks.length === 2,
    `expected two reviewed nginx blocks, found ${nginxBlocks.length}`
  );
  if (nginxBlocks.length !== 2) return;

  const [globalConfig, siteConfig] = nginxBlocks;
  for (const required of [
    "limit_req_zone",
    "Access-Control-Allow-Origin",
    "client_max_body_size",
    "proxy_pass http://127.0.0.1:8080",
    "proxy_pass http://127.0.0.1:3000",
    "grpc_pass grpc://127.0.0.1:50051",
    "ssl_certificate",
  ]) {
    assert(
      `${globalConfig}\n${siteConfig}`.includes(required),
      `nginx configuration is missing ${required}`
    );
  }

  const nginxFixture = path.join(fixture, "nginx");
  const certDirectory = path.join(nginxFixture, "certs");
  fs.mkdirSync(certDirectory, { recursive: true });
  expectSuccess(
    "create disposable nginx certificate",
    run(
      "openssl",
      [
        "req",
        "-x509",
        "-nodes",
        "-newkey",
        "rsa:2048",
        "-subj",
        "/CN=rpc.example.com",
        "-keyout",
        path.join(certDirectory, "privkey.pem"),
        "-out",
        path.join(certDirectory, "fullchain.pem"),
        "-days",
        "1",
      ],
      { timeout: 30_000 }
    )
  );
  const fixtureSite = siteConfig
    .replaceAll(
      "/etc/letsencrypt/live/rpc.example.com/fullchain.pem",
      "/etc/nginx/certs/fullchain.pem"
    )
    .replaceAll(
      "/etc/letsencrypt/live/rpc.example.com/privkey.pem",
      "/etc/nginx/certs/privkey.pem"
    );
  fs.writeFileSync(
    path.join(nginxFixture, "nginx.conf"),
    `pid /tmp/nginx.pid;\nevents {}\nhttp {\n${globalConfig}\n${fixtureSite}\n}\n`
  );
  expectSuccess(
    "documented nginx configuration",
    run(
      "docker",
      [
        "run",
        "--rm",
        "-v",
        `${nginxFixture}:/etc/nginx:ro`,
        "nginx:1.28.0-alpine",
        "nginx",
        "-t",
        "-c",
        "/etc/nginx/nginx.conf",
      ],
      { timeout: 120_000 }
    )
  );
}

function createFakeDocker(directory) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(
    path.join(directory, "docker"),
    "#!/usr/bin/env bash\nexit 0\n",
    { mode: 0o755 }
  );
  return { PATH: `${directory}:${process.env.PATH}` };
}

function verifyRecoveryMoves(fixture) {
  const reindexFixture = path.join(fixture, "reindex");
  const reindexActive = path.join(reindexFixture, "active");
  const reindexProject = path.join(reindexFixture, "project");
  const reindexEnv = createFakeDocker(path.join(reindexFixture, "fake-bin"));
  fs.mkdirSync(path.join(reindexActive, "chain"), { recursive: true });
  fs.mkdirSync(path.join(reindexProject, "config"), { recursive: true });
  fs.writeFileSync(path.join(reindexActive, "chain/old"), "old chain\n");
  fs.writeFileSync(path.join(reindexProject, ".env"), "fixture env\n");
  fs.writeFileSync(
    path.join(reindexProject, "config/config.yml"),
    "chain:\n  verify-blocks: true\n"
  );

  runFixtureBlock(
    "documented reindex preservation commands",
    findBlock("docs/nodes/management.md", [
      "reindex_backup=",
      "reindex-rollback-directory.txt",
      "sudo cp -a",
    ]),
    reindexFixture,
    root,
    reindexEnv
  );
  const reindexBackup = fs
    .readFileSync(
      path.join(reindexActive, "reindex-rollback-directory.txt"),
      "utf8"
    )
    .trim();
  assert(
    fs.existsSync(path.join(reindexBackup, "chain/old")),
    "reindex procedure did not preserve chain state"
  );
  fs.writeFileSync(path.join(reindexActive, "chain/new"), "failed reindex\n");
  fs.writeFileSync(
    path.join(reindexProject, "config/config.yml"),
    "chain:\n  reset: true\n"
  );
  runFixtureBlock(
    "documented reindex rollback commands",
    findBlock("docs/nodes/management.md", [
      "failed_reindex=",
      "reindex_backup=",
      "docker compose up -d",
    ]),
    reindexFixture,
    root,
    reindexEnv
  );
  assert(
    fs.existsSync(path.join(reindexActive, "chain/old")) &&
      !fs.existsSync(path.join(reindexActive, "chain/new")),
    "reindex rollback did not restore the previous chain state"
  );

  const resyncFixture = path.join(fixture, "resync");
  const resyncActive = path.join(resyncFixture, "active");
  const resyncProject = path.join(resyncFixture, "project");
  const resyncEnv = createFakeDocker(path.join(resyncFixture, "fake-bin"));
  fs.mkdirSync(resyncActive, { recursive: true });
  fs.mkdirSync(resyncProject, { recursive: true });
  for (const state of [
    "chain",
    "block_store",
    "mempool",
    "transaction_store",
    "contract_meta_store",
    "account_history",
  ]) {
    fs.mkdirSync(path.join(resyncActive, state), { recursive: true });
    fs.writeFileSync(path.join(resyncActive, state, "old"), `${state}\n`);
  }
  fs.mkdirSync(path.join(resyncActive, "p2p"), { recursive: true });
  fs.writeFileSync(path.join(resyncActive, "p2p/identity"), "identity\n");

  runFixtureBlock(
    "documented resync target and preservation setup",
    findBlock("docs/nodes/management.md", [
      "koinos_basedir=",
      "resync_backup=",
      "resync-rollback-directory.txt",
    ]),
    resyncFixture,
    root,
    resyncEnv
  );
  runFixtureBlock(
    "documented resync state moves",
    findBlock("docs/nodes/management.md", [
      "resync_backup=\"$(cat",
      "for state_dir in",
      "sudo mv",
    ]),
    resyncFixture
  );
  const resyncBackup = fs
    .readFileSync(
      path.join(resyncActive, "resync-rollback-directory.txt"),
      "utf8"
    )
    .trim();
  assert(
    fs.existsSync(path.join(resyncBackup, "chain/old")) &&
      fs.existsSync(path.join(resyncActive, "p2p/identity")),
    "resync procedure did not preserve public state and local identity separately"
  );
  for (const state of ["chain", "block_store", "mempool"]) {
    fs.mkdirSync(path.join(resyncActive, state), { recursive: true });
    fs.writeFileSync(path.join(resyncActive, state, "new"), "new\n");
  }
  runFixtureBlock(
    "documented resync rollback commands",
    findBlock("docs/nodes/management.md", [
      "failed_resync=",
      "resync_backup=",
      "docker compose up -d",
    ]),
    resyncFixture,
    root,
    resyncEnv
  );
  assert(
    fs.existsSync(path.join(resyncActive, "chain/old")) &&
      !fs.existsSync(path.join(resyncActive, "chain/new")) &&
      fs.readFileSync(path.join(resyncActive, "p2p/identity"), "utf8") ===
        "identity\n",
    "resync rollback did not restore state while preserving P2P identity"
  );
}

function verifyProducerCommands(fixture, blockId) {
  const producerFixture = path.join(fixture, "producer");
  const active = path.join(producerFixture, "active");
  const fakeBin = path.join(producerFixture, "fake-bin");
  fs.mkdirSync(path.join(active, "block_producer"), { recursive: true });
  fs.mkdirSync(path.join(producerFixture, "project"), { recursive: true });
  fs.mkdirSync(fakeBin, { recursive: true });
  fs.writeFileSync(
    path.join(active, "block_producer/public.key"),
    "fixture-public-key\n"
  );
  const publicKeyResult = runFixtureBlock(
    "documented producer public-key command",
    findBlock("docs/nodes/block-production.md", ["cat", "public.key"]),
    producerFixture
  );
  assert(
    publicKeyResult.stdout.trim() === "fixture-public-key",
    "producer public-key command did not return the public key"
  );

  fs.writeFileSync(
    path.join(fakeBin, "docker"),
    "#!/usr/bin/env bash\n" +
      "printf 'block_producer | Produced block - Height: 1, ID: %s\\n' " +
      "\"$FIXTURE_BLOCK_ID\"\n",
    { mode: 0o755 }
  );
  const extraction = findBlock("docs/nodes/block-production.md", [
    "produced_block_id=",
    "sed -nE",
  ]);
  const confirmation = findBlock("docs/nodes/block-production.md", [
    "block_store.get_blocks_by_id",
    "returned_height",
  ]).replaceAll(
    "http://127.0.0.1:8080/",
    "https://api.koinos.io/jsonrpc"
  );
  const combinedCommand = transformedFixtureCommand(
    `${extraction}\n${confirmation}`,
    producerFixture
  );
  const confirmationResult = expectSuccess(
    "documented canonical produced-block confirmation",
    run("bash", ["-euo", "pipefail", "-c", combinedCommand], {
      env: {
        PATH: `${fakeBin}:${process.env.PATH}`,
        FIXTURE_BLOCK_ID: blockId,
      },
      timeout: 30_000,
    })
  );
  assert(
    confirmationResult.stdout.includes("confirmed height"),
    "canonical produced-block command returned no confirmation"
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

  const standardNode = serviceSet(bundle, baseEnv, "jsonrpc");
  assertServices(
    "standard node profile",
    standardNode,
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
  const publicGrpcCommand = findBlock("docs/nodes/rpc-node.md", [
    "grpc.example.com:443",
    "-protoset ./koinos_descriptors.pb",
  ]);
  assert(
    !publicGrpcCommand.includes("-plaintext"),
    "public gRPC command must not disable TLS"
  );

  verifyHealthCommands(fixture);
  verifyFirewallProcedure(fixture);
  verifyUpdateRollback(fixture);
  verifyNginxConfiguration(fixture);
  await verifyPublicBackupMetadata();
  verifyBackupProcedure(fixture);
  verifyRecoveryMoves(fixture);
  verifyProducerCommands(fixture, mainnetHead.result.head_topology.id);
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
      `${assertions} syntax, upstream, profile, health, proxy, live-protocol, ` +
      `backup, recovery, producer, and permission assertions.`
  );
}
