import { pathToFileURL } from "node:url";
import { Provider } from "koilib";

export const API_BASE = "https://api.koinos.io";
export const KOIN_CONTRACT_ID = "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK";
export const PUBLIC_ADDRESS = "13iFaqgdnsoqUTCwZC9GtRXwh8ZvdiiPwm";
export const NICKNAMES_CONTRACT_ID = "1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz";

async function getJson(path, fetchImpl = fetch) {
  const response = await fetchImpl(`${API_BASE}${path}`, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Koinos API HTTP ${response.status}: ${detail}`);
  }
  return response.json();
}

// --8<-- [start:head-info]
export async function getHeadInfo(fetchImpl = fetch) {
  return getJson("/v1/chain/head_info", fetchImpl);
}
// --8<-- [end:head-info]

// --8<-- [start:balance]
export async function getKoinBalance(address, fetchImpl = fetch) {
  const account = encodeURIComponent(address);
  return getJson(
    `/v1/account/${account}/balance/${KOIN_CONTRACT_ID}`,
    fetchImpl
  );
}
// --8<-- [end:balance]

// --8<-- [start:token-metadata]
export async function getKoinMetadata(fetchImpl = fetch) {
  return getJson(`/v1/token/${KOIN_CONTRACT_ID}/info`, fetchImpl);
}
// --8<-- [end:token-metadata]

// --8<-- [start:contract-abi]
export async function getContractAbi() {
  const provider = new Provider(API_BASE);
  const response = await provider.call(
    "contract_meta_store.get_contract_meta",
    { contract_id: NICKNAMES_CONTRACT_ID }
  );
  if (!response.meta?.abi) throw new Error("Contract ABI is unavailable");
  return JSON.parse(response.meta.abi);
}
// --8<-- [end:contract-abi]

// --8<-- [start:error-handling]
export async function withRetry(operation, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
      }
    }
  }
  throw lastError;
}
// --8<-- [end:error-handling]

async function main() {
  const [head, balance, token, abi] = await Promise.all([
    withRetry(() => getHeadInfo()),
    withRetry(() => getKoinBalance(PUBLIC_ADDRESS)),
    withRetry(() => getKoinMetadata()),
    withRetry(() => getContractAbi()),
  ]);
  console.log(`Head height: ${head.head_topology.height}`);
  console.log(`Public balance: ${balance.value} ${token.symbol}`);
  console.log(`Token decimals: ${token.decimals}`);
  console.log(`Nicknames ABI methods: ${Object.keys(abi.methods).length}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
