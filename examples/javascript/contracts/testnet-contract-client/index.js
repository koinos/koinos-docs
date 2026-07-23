import { pathToFileURL } from "node:url";

export const TESTNET_KOIN = "1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju";

// --8<-- [start:deployment-config]
export function deploymentConfig(env = process.env) {
  return {
    network: "testnet",
    rpcUrl: "https://testnet.koinosfoundation.org/jsonrpc",
    wasmFile: env.WASM_FILE ?? "build/release/contract.wasm",
    privateKeySource: "TESTNET_WIF environment variable",
    broadcast: env.BROADCAST === "true",
  };
}
// --8<-- [end:deployment-config]

// --8<-- [start:read-contract]
export async function readTokenMetadata(
  contractId = TESTNET_KOIN,
  fetchImpl = fetch
) {
  const url =
    `https://testnet.koinosfoundation.org/v1/token/` +
    `${encodeURIComponent(contractId)}/info`;
  const response = await fetchImpl(url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Testnet API HTTP ${response.status}`);
  return response.json();
}
// --8<-- [end:read-contract]

async function main() {
  console.log("Deployment defaults:", deploymentConfig());
  console.log("Testnet token metadata:", await readTokenMetadata());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
