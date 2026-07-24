import { spawnSync } from "node:child_process";
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

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Passed ${assertions} Node Operators guard assertions in temporary fixtures.`
  );
}
