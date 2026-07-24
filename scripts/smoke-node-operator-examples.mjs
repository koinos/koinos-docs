import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const query = path.join(
  root,
  "examples/node-operators/networks/query-network.sh"
);
const required = process.argv.includes("--required");
const checks = [
  {
    name: "mainnet JSON-RPC",
    args: ["https://api.koinos.io/jsonrpc"],
  },
  {
    name: "current public testnet JSON-RPC",
    args: [
      "https://testnet.koinosfoundation.org/jsonrpc",
      "EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==",
    ],
  },
];

let passed = 0;
let unavailable = 0;
for (const check of checks) {
  const result = spawnSync(query, check.args, {
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
