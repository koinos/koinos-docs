import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examples = path.join(root, "examples/node-operators");
const failures = [];
let assertions = 0;

function run(relativeScript, args = [], environment = {}) {
  return spawnSync(path.join(examples, relativeScript), args, {
    encoding: "utf8",
    env: { ...process.env, ...environment },
  });
}

function expectFailure(name, result, pattern) {
  assertions += 1;
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.status === 0 || !pattern.test(output)) {
    failures.push(
      `${name}: expected guarded failure matching ${pattern}, ` +
        `status=${result.status}, output=${output}`
    );
  }
}

function expectSuccess(name, result, pattern) {
  assertions += 1;
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.status !== 0 || (pattern && !pattern.test(output))) {
    failures.push(
      `${name}: expected success${pattern ? ` matching ${pattern}` : ""}, ` +
        `status=${result.status}, output=${output}`
    );
  }
}

expectFailure(
  "preflight rejects relative basedir",
  run("observer/preflight.sh", ["relative/path"]),
  /absolute path/
);
expectFailure(
  "preflight rejects root",
  run("observer/preflight.sh", ["/"]),
  /refusing broad basedir/
);
expectFailure(
  "storage measurement rejects root",
  run("observer/measure-storage.sh", ["/"]),
  /unsafe basedir/
);
expectFailure(
  "health check rejects root",
  run("observer/health-check.sh", [".", "/"]),
  /unsafe basedir/
);
expectFailure(
  "network query requires an endpoint",
  run("networks/query-network.sh"),
  /usage: query-network/
);

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "koinos-observer-test-"));
fs.writeFileSync(path.join(fixture, "docker-compose.yml"), "services: {}\n");
fs.writeFileSync(
  path.join(fixture, ".env"),
  "BASEDIR=/tmp/koinos-test\nCOMPOSE_PROFILES=all\n"
);
expectFailure(
  "observer start refuses all profile",
  run("observer/start-observer.sh", [fixture]),
  /refuses COMPOSE_PROFILES=all/
);

fs.writeFileSync(
  path.join(fixture, ".env"),
  "BASEDIR=/tmp/koinos-test\nCOMPOSE_PROFILES=block_producer\n"
);
expectFailure(
  "observer start refuses producer profile",
  run("observer/start-observer.sh", [fixture]),
  /refuses COMPOSE_PROFILES=block_producer/
);

const restoreFixture = fs.mkdtempSync(
  path.join(os.tmpdir(), "koinos-restore-test-")
);
const archiveRoot = path.join(restoreFixture, "archive", "snapshot");
const basedir = path.join(restoreFixture, "basedir");
const fakeBin = path.join(restoreFixture, "bin");
fs.mkdirSync(path.join(archiveRoot, "chain"), { recursive: true });
fs.mkdirSync(path.join(archiveRoot, "block_store"), { recursive: true });
fs.mkdirSync(path.join(basedir, "chain"), { recursive: true });
fs.mkdirSync(path.join(basedir, "block_store"), { recursive: true });
fs.mkdirSync(path.join(basedir, "mempool"), { recursive: true });
fs.mkdirSync(fakeBin, { recursive: true });
fs.writeFileSync(path.join(archiveRoot, "chain", "new"), "new chain\n");
fs.writeFileSync(
  path.join(archiveRoot, "block_store", "new"),
  "new block store\n"
);
fs.writeFileSync(path.join(basedir, "chain", "old"), "old chain\n");
fs.writeFileSync(
  path.join(basedir, "block_store", "old"),
  "old block store\n"
);
fs.writeFileSync(path.join(basedir, "mempool", "old"), "old mempool\n");
fs.writeFileSync(
  path.join(restoreFixture, "config.yml"),
  "chain:\n  verify-blocks: true\n"
);
fs.writeFileSync(
  path.join(fakeBin, "docker"),
  "#!/usr/bin/env bash\nexit 0\n",
  { mode: 0o755 }
);

const archive = path.join(restoreFixture, "backup.tar.gz");
const checksum = path.join(restoreFixture, "backup.tar.gz.sha256");
const tarResult = spawnSync(
  "tar",
  ["-czf", archive, "-C", path.join(restoreFixture, "archive"), "snapshot"],
  { encoding: "utf8" }
);
if (tarResult.status !== 0) {
  failures.push(`restore fixture archive creation failed: ${tarResult.stderr}`);
}
const archiveHash = crypto
  .createHash("sha256")
  .update(fs.readFileSync(archive))
  .digest("hex");
fs.writeFileSync(checksum, `${archiveHash}  backup.tar.gz\n`);

const restoreArgs = [
  "--archive",
  archive,
  "--checksum",
  checksum,
  "--basedir",
  basedir,
  "--config",
  path.join(restoreFixture, "config.yml"),
  "--network",
  "mainnet",
];
const restoreEnv = { PATH: `${fakeBin}:${process.env.PATH}` };

expectSuccess(
  "backup inspector accepts safe fixture",
  run("backup-restore/inspect-backup.sh", [archive, checksum]),
  /Inspection complete/
);
expectSuccess(
  "restore defaults to dry run",
  run("backup-restore/restore-backup.sh", restoreArgs, restoreEnv),
  /Mode: DRY RUN/
);
if (!fs.existsSync(path.join(basedir, "chain", "old"))) {
  failures.push("restore dry run changed existing chain state");
}
expectFailure(
  "restore rejects root basedir",
  run(
    "backup-restore/restore-backup.sh",
    restoreArgs.map((argument, index) =>
      restoreArgs[index - 1] === "--basedir" ? "/" : argument
    ),
    restoreEnv
  ),
  /refusing unsafe or broad basedir/
);
expectFailure(
  "restore rejects wrong network",
  run(
    "backup-restore/restore-backup.sh",
    restoreArgs.map((argument, index) =>
      restoreArgs[index - 1] === "--network" ? "testnet" : argument
    ),
    restoreEnv
  ),
  /supports only network=mainnet/
);
expectFailure(
  "restore apply requires shutdown acknowledgement",
  run(
    "backup-restore/restore-backup.sh",
    [...restoreArgs, "--apply"],
    restoreEnv
  ),
  /--node-stopped is required/
);
expectFailure(
  "restore apply requires backup acknowledgement",
  run(
    "backup-restore/restore-backup.sh",
    [...restoreArgs, "--apply", "--node-stopped"],
    restoreEnv
  ),
  /--backup-confirmed is required/
);
expectFailure(
  "restore apply requires exact confirmation",
  run(
    "backup-restore/restore-backup.sh",
    [...restoreArgs, "--apply", "--node-stopped", "--backup-confirmed"],
    restoreEnv
  ),
  /--confirm RESTORE_MAINNET is required/
);

const unsafeArchive = path.join(restoreFixture, "unsafe.tar.gz");
const unsafeTarResult = spawnSync(
  "python3",
  [
    "-c",
    [
      "import io,sys,tarfile",
      "with tarfile.open(sys.argv[1], 'w:gz') as archive:",
      " item=tarfile.TarInfo('../escape')",
      " data=b'unsafe'",
      " item.size=len(data)",
      " archive.addfile(item, io.BytesIO(data))",
    ].join("\n"),
    unsafeArchive,
  ],
  { encoding: "utf8" }
);
if (unsafeTarResult.status !== 0) {
  failures.push(`unsafe archive fixture creation failed: ${unsafeTarResult.stderr}`);
} else {
  const unsafeHash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(unsafeArchive))
    .digest("hex");
  const unsafeChecksum = `${unsafeArchive}.sha256`;
  fs.writeFileSync(unsafeChecksum, `${unsafeHash}  unsafe.tar.gz\n`);
  expectFailure(
    "backup inspector rejects path traversal",
    run("backup-restore/inspect-backup.sh", [unsafeArchive, unsafeChecksum]),
    /unsafe archive member/
  );
}

expectSuccess(
  "restore applies only with all confirmations",
  run(
    "backup-restore/restore-backup.sh",
    [
      ...restoreArgs,
      "--apply",
      "--node-stopped",
      "--backup-confirmed",
      "--confirm",
      "RESTORE_MAINNET",
    ],
    restoreEnv
  ),
  /Restore staged successfully/
);

assertions += 1;
const preserved = fs
  .readdirSync(basedir)
  .find((entry) => entry.startsWith(".pre-restore-"));
if (
  !preserved ||
  !fs.existsSync(path.join(basedir, "chain", "new")) ||
  !fs.existsSync(path.join(basedir, "block_store", "new")) ||
  !fs.existsSync(path.join(basedir, preserved, "chain", "old")) ||
  !fs.existsSync(path.join(basedir, preserved, "mempool", "old"))
) {
  failures.push("restore fixture did not preserve old state and install core data");
}

const producerBasedir = path.join(restoreFixture, "producer-basedir");
const producerKeyDir = path.join(producerBasedir, "block_producer");
fs.mkdirSync(producerKeyDir, { recursive: true, mode: 0o755 });
fs.writeFileSync(path.join(producerKeyDir, "private.key"), "fixture-only\n", {
  mode: 0o644,
});
fs.writeFileSync(path.join(producerKeyDir, "public.key"), "fixture-public\n", {
  mode: 0o600,
});
expectFailure(
  "producer key helper rejects root",
  run("block-producer/harden-producer-key.sh", ["/"]),
  /refusing unsafe or broad basedir/
);
expectSuccess(
  "producer key helper defaults to dry run",
  run("block-producer/harden-producer-key.sh", [producerBasedir]),
  /Mode: DRY RUN/
);
expectSuccess(
  "producer key helper applies explicit permissions",
  run("block-producer/harden-producer-key.sh", [producerBasedir, "--apply"]),
  /Permissions updated/
);
assertions += 1;
const privateMode =
  fs.statSync(path.join(producerKeyDir, "private.key")).mode & 0o777;
const directoryMode = fs.statSync(producerKeyDir).mode & 0o777;
if (privateMode !== 0o600 || directoryMode !== 0o700) {
  failures.push(
    `producer key permissions incorrect: dir=${directoryMode.toString(8)} ` +
      `key=${privateMode.toString(8)}`
  );
}

const productionFixture = path.join(restoreFixture, "production-project");
fs.mkdirSync(productionFixture);
fs.writeFileSync(
  path.join(productionFixture, "docker-compose.yml"),
  "services: {}\n"
);
const producedBlock =
  "0x1220aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
fs.writeFileSync(
  path.join(fakeBin, "docker"),
  `#!/usr/bin/env bash\nprintf '%s\\n' 'Produced block - Height: 1, ID: ${producedBlock}'\n`,
  { mode: 0o755 }
);
fs.writeFileSync(
  path.join(fakeBin, "curl"),
  [
    "#!/usr/bin/env bash",
    `printf '%s\\n' '{"jsonrpc":"2.0","result":{"block_items":[{"block_id":"${producedBlock}","block_height":"1"}]},"id":1}'`,
    "",
  ].join("\n"),
  { mode: 0o755 }
);
expectSuccess(
  "production verifier confirms fixture block twice",
  run(
    "block-producer/verify-production.sh",
    [productionFixture, "http://local.invalid", "https://canonical.invalid"],
    restoreEnv
  ),
  /Canonical endpoint confirmed block/
);

const descriptorFixture = path.join(restoreFixture, "koinos_descriptors.pb");
const grpcArgsFile = path.join(restoreFixture, "grpcurl.args");
fs.writeFileSync(descriptorFixture, "fixture descriptor set\n");
fs.writeFileSync(
  path.join(fakeBin, "grpcurl"),
  [
    "#!/usr/bin/env bash",
    "printf '%s\\n' \"$*\" >\"${GRPC_ARGS_FILE:?}\"",
    "printf '%s\\n' '{\"headTopology\":{\"height\":\"1\",\"id\":\"0x1220aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}}'",
    "",
  ].join("\n"),
  { mode: 0o755 }
);
expectSuccess(
  "gRPC probe uses descriptor set without reflection",
  run(
    "rpc/test-grpc.sh",
    ["127.0.0.1:50051", descriptorFixture],
    {
      ...restoreEnv,
      GRPC_PLAINTEXT: "1",
      GRPC_ARGS_FILE: grpcArgsFile,
    }
  ),
  /gRPC OK: height=1/
);
assertions += 1;
const grpcArgs = fs.readFileSync(grpcArgsFile, "utf8");
if (
  !grpcArgs.includes("-plaintext") ||
  !grpcArgs.includes(`-protoset ${descriptorFixture}`) ||
  !grpcArgs.includes("koinos.rpc.chain.chain_rpc/get_head_info")
) {
  failures.push(`gRPC probe did not use expected descriptor invocation: ${grpcArgs}`);
}

fs.rmSync(fixture, { recursive: true, force: true });
fs.rmSync(restoreFixture, { recursive: true, force: true });

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Passed ${assertions} Node Operators guard assertions in temporary fixtures.`
  );
}
