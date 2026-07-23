import { pathToFileURL } from "node:url";
import {
  Contract,
  Provider,
  Serializer,
  Signer,
  Transaction,
  utils,
} from "koilib";

export const MAINNET_RPC = "https://api.koinos.io";
export const KOIN_CONTRACT_ID = "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK";

// --8<-- [start:tooling]
export function createClient() {
  const provider = new Provider(MAINNET_RPC);
  const signer = new Signer({ privateKey: new Uint8Array(32).fill(1) });
  return { provider, signer };
}
// --8<-- [end:tooling]

// --8<-- [start:provider]
export async function readHead(provider = new Provider(MAINNET_RPC)) {
  const head = await provider.getHeadInfo();
  return head.head_topology;
}
// --8<-- [end:provider]

// --8<-- [start:contract]
export function identifyContract(provider = new Provider(MAINNET_RPC)) {
  const contract = new Contract({ id: KOIN_CONTRACT_ID, provider });
  return contract.getId();
}
// --8<-- [end:contract]

// --8<-- [start:serializer]
export async function serializeGreeting() {
  const serializer = new Serializer({
    nested: {
      Greeting: {
        fields: { message: { type: "string", id: 1 } },
      },
    },
  });
  const encoded = await serializer.serialize(
    { message: "Hello, Koinos" },
    "Greeting"
  );
  return serializer.deserialize(encoded, "Greeting");
}
// --8<-- [end:serializer]

// --8<-- [start:signer]
export async function signLocalMessage() {
  const signer = new Signer({ privateKey: new Uint8Array(32).fill(1) });
  const signature = await signer.signMessage("Koinos documentation example");
  return { address: signer.getAddress(), signature };
}
// --8<-- [end:signer]

// --8<-- [start:transaction]
export function createUnsignedTransaction(provider = new Provider(MAINNET_RPC)) {
  return new Transaction({ provider });
}
// --8<-- [end:transaction]

// --8<-- [start:utils]
export function formatKoin(amount) {
  return utils.formatUnits(amount, 8);
}
// --8<-- [end:utils]

async function main() {
  const { provider, signer } = createClient();
  const [head, greeting, signed] = await Promise.all([
    readHead(provider),
    serializeGreeting(),
    signLocalMessage(),
  ]);
  console.log(`Head height: ${head.height}`);
  console.log(`Contract: ${identifyContract(provider)}`);
  console.log(`Greeting: ${greeting.message}`);
  console.log(`Disposable signer: ${signer.getAddress()}`);
  console.log(`Signature bytes: ${signed.signature.length}`);
  console.log(`One KOIN: ${formatKoin("100000000")}`);
  console.log(
    `Transaction operations: ${createUnsignedTransaction(provider).transaction.operations.length}`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
