import { pathToFileURL } from "node:url";
import { Provider } from "koilib";

export const NETWORKS = {
  mainnet: {
    label: "Koinos mainnet",
    rpc: "https://api.koinos.io/",
  },
  testnet: {
    label: "Koinos public testnet",
    rpc: "https://testnet.koinosfoundation.org/jsonrpc",
  },
};

// --8<-- [start:mainnet]
export async function connectMainnet() {
  const provider = new Provider("https://api.koinos.io/");
  const [chainId, head] = await Promise.all([
    provider.getChainId(),
    provider.getHeadInfo(),
  ]);
  return { chainId, head };
}
// --8<-- [end:mainnet]

// --8<-- [start:testnet]
export async function connectTestnet() {
  const provider = new Provider(
    "https://testnet.koinosfoundation.org/jsonrpc"
  );
  const [chainId, head] = await Promise.all([
    provider.getChainId(),
    provider.getHeadInfo(),
  ]);
  return { chainId, head };
}
// --8<-- [end:testnet]

export function headHeight(head) {
  return head?.head_topology?.height ?? "unknown";
}

async function main() {
  const network = process.argv[2] ?? "mainnet";
  if (!NETWORKS[network]) {
    throw new Error("Usage: node index.js mainnet|testnet");
  }

  const result =
    network === "mainnet" ? await connectMainnet() : await connectTestnet();
  console.log(`${NETWORKS[network].label}`);
  console.log(`Chain ID: ${result.chainId}`);
  console.log(`Head height: ${headHeight(result.head)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
