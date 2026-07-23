import { pathToFileURL } from "node:url";

export const MAINNET_REST_URL = "https://api.koinos.io";
export const KOIN_CONTRACT_ID = "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK";
// Public Fogata pool address used only to make the example runnable as-is.
export const DEFAULT_PUBLIC_ADDRESS = "13iFaqgdnsoqUTCwZC9GtRXwh8ZvdiiPwm";

// --8<-- [start:program]
export function balanceUrl(address) {
  const account = encodeURIComponent(address);
  return (
    `${MAINNET_REST_URL}/v1/account/${account}/balance/` +
    KOIN_CONTRACT_ID
  );
}

export async function readKoinBalance(address, fetchImpl = fetch) {
  const response = await fetchImpl(balanceUrl(address), {
    headers: {
      accept: "application/json",
      "user-agent": "koinos-docs-example/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`Koinos REST API returned HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (typeof payload.value !== "string") {
    throw new Error("Koinos REST API response has no string balance value");
  }
  return payload.value;
}

async function main() {
  const address = process.argv[2] ?? DEFAULT_PUBLIC_ADDRESS;
  const balance = await readKoinBalance(address);
  console.log(`${address}: ${balance} KOIN`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
// --8<-- [end:program]
