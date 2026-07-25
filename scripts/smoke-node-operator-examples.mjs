import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const example = (relative) =>
  path.join(root, "examples/node-operators", relative);
const required = process.argv.includes("--required");
const checks = [
  {
    name: "mainnet JSON-RPC",
    script: example("networks/query-network.sh"),
    args: ["https://api.koinos.io/jsonrpc"],
  },
  {
    name: "current public testnet JSON-RPC",
    script: example("networks/query-network.sh"),
    args: [
      "https://testnet.koinosfoundation.org/jsonrpc",
      "EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==",
    ],
  },
  {
    name: "mainnet JSON-RPC protocol probe",
    script: example("rpc/test-jsonrpc.sh"),
    args: ["https://api.koinos.io/jsonrpc"],
  },
  {
    name: "current public testnet JSON-RPC protocol probe",
    script: example("rpc/test-jsonrpc.sh"),
    args: ["https://testnet.koinosfoundation.org/jsonrpc"],
  },
  {
    name: "current public testnet REST protocol probe",
    script: example("rpc/test-rest.sh"),
    args: ["https://testnet.koinosfoundation.org"],
  },
];

let passed = 0;
let unavailable = 0;
for (const check of checks) {
  const result = spawnSync(check.script, check.args, {
    encoding: "utf8",
    timeout: 20_000,
  });
  if (result.status === 0) {
    passed += 1;
    console.log(`PASS: ${check.name}`);
    console.log(result.stdout.trim());
    continue;
  }

  unavailable += 1;
  const message =
    `${check.name} unavailable or invalid: ` +
    `${result.error?.message ?? result.stderr.trim()}`;
  if (required) console.error(`ERROR: ${message}`);
  else console.warn(`WARN: ${message}`);
}

console.log(
  `Node Operators live smoke: ${passed} passed, ${unavailable} unavailable.`
);
if (required && unavailable) process.exitCode = 1;
