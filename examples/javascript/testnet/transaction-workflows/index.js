import { pathToFileURL } from "node:url";
import {
  Contract,
  Provider,
  Signer,
  Transaction,
  utils,
} from "koilib";

export const TESTNET = {
  name: "Koinos Foundation public testnet",
  rpc: "https://testnet.koinosfoundation.org/jsonrpc",
  health: "https://testnet.koinosfoundation.org/health",
  faucet: "https://t.me/KoinosTestnetFaucetBot",
  koinContract: "1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju",
  faucetAccount: "1AvfaswZsCJ4FTaWDengYRj2y3aTnJ4oNo",
};

const transferAbi = {
  methods: {
    transfer: {
      argument: "token.transfer_args",
      return: "",
      entry_point: 670398154,
      read_only: false,
    },
  },
  koilib_types: {
    nested: {
      token: {
        nested: {
          transfer_args: {
            fields: {
              from: { type: "bytes", id: 1 },
              to: { type: "bytes", id: 2 },
              value: { type: "uint64", id: 3 },
            },
          },
        },
      },
    },
  },
};

function addressBytes(address) {
  return utils.encodeBase64url(utils.decodeBase58(address));
}

// --8<-- [start:setup-signer]
export function signerFromEnvironment(env = process.env) {
  if (!env.TESTNET_WIF) {
    throw new Error("Set TESTNET_WIF to a dedicated, funded testnet key");
  }
  const provider = new Provider(TESTNET.rpc);
  const signer = Signer.fromWif(env.TESTNET_WIF);
  signer.provider = provider;
  return { provider, signer };
}
// --8<-- [end:setup-signer]

// --8<-- [start:transfer]
export async function createTransferOperation({ from, to, amount }) {
  const contract = new Contract({
    id: TESTNET.koinContract,
    provider: new Provider(TESTNET.rpc),
    abi: transferAbi,
  });
  const { operation } = await contract.functions.transfer(
    {
      from: addressBytes(from),
      to: addressBytes(to),
      value: utils.parseUnits(amount, 8),
    },
    { onlyOperation: true }
  );
  return operation;
}
// --8<-- [end:transfer]

// --8<-- [start:transaction-options]
export function safeTransactionOptions(env = process.env) {
  return {
    rcLimit: env.RC_LIMIT ?? "100000000",
    broadcast: env.BROADCAST === "true",
  };
}
// --8<-- [end:transaction-options]

// --8<-- [start:dry-run]
export async function previewTransfer({ from, to, amount }) {
  const operation = await createTransferOperation({ from, to, amount });
  return { network: TESTNET.name, broadcast: false, operations: [operation] };
}
// --8<-- [end:dry-run]

// --8<-- [start:error-handling]
export function assertSuccessfulReceipt(receipt) {
  if (receipt.reverted) {
    throw new Error(`Transaction reverted: ${(receipt.logs ?? []).join("; ")}`);
  }
  return receipt;
}
// --8<-- [end:error-handling]

// --8<-- [start:multi-operations]
export async function buildBatch(from, transfers) {
  const operations = [];
  for (const transfer of transfers) {
    operations.push(
      await createTransferOperation({ from, ...transfer })
    );
  }
  return { network: TESTNET.name, broadcast: false, operations };
}
// --8<-- [end:multi-operations]

// --8<-- [start:atomic-swap]
export async function atomicTransferPair(from, first, second) {
  return buildBatch(from, [first, second]);
}
// --8<-- [end:atomic-swap]

// --8<-- [start:complex-update]
export function describeAtomicUpdates(updates) {
  return {
    network: TESTNET.name,
    broadcast: false,
    atomic: true,
    updates,
  };
}
// --8<-- [end:complex-update]

// --8<-- [start:batch-transfers]
export async function batchTokenTransfers(from, recipients) {
  return buildBatch(
    from,
    recipients.map(({ address, amount }) => ({ to: address, amount }))
  );
}
// --8<-- [end:batch-transfers]

// --8<-- [start:multi-options]
export function multiOperationOptions(operationCount) {
  if (operationCount < 1) throw new Error("At least one operation is required");
  return { rcLimit: String(100_000_000 * operationCount), broadcast: false };
}
// --8<-- [end:multi-options]

// --8<-- [start:testnet-connect]
export async function connectTestnet() {
  const provider = new Provider(TESTNET.rpc);
  const [chainId, head] = await Promise.all([
    provider.getChainId(),
    provider.getHeadInfo(),
  ]);
  return { chainId, head };
}
// --8<-- [end:testnet-connect]

// --8<-- [start:faucet]
export function faucetInstructions(address) {
  utils.decodeBase58(address);
  return {
    bot: TESTNET.faucet,
    command: `/faucet ${address}`,
    warning: "Test tokens have no monetary value",
  };
}
// --8<-- [end:faucet]

// --8<-- [start:testnet-setup]
export function testnetClient() {
  return {
    provider: new Provider(TESTNET.rpc),
    koinContract: TESTNET.koinContract,
  };
}
// --8<-- [end:testnet-setup]

// --8<-- [start:environment]
export function networkConfig(env = process.env) {
  if (env.KOINOS_NETWORK === "mainnet") {
    throw new Error("This state-changing example is testnet-only");
  }
  return TESTNET;
}
// --8<-- [end:environment]

// --8<-- [start:unit-test-strategy]
export async function testTransferEncoding(from, to) {
  const preview = await previewTransfer({ from, to, amount: "0.00000001" });
  return preview.operations[0].call_contract.entry_point === 670398154;
}
// --8<-- [end:unit-test-strategy]

// --8<-- [start:integration-test]
export async function testnetHealth(fetchImpl = fetch) {
  const response = await fetchImpl(TESTNET.health);
  if (!response.ok) throw new Error(`Testnet health HTTP ${response.status}`);
  return response.text();
}
// --8<-- [end:integration-test]

// --8<-- [start:deploy-plan]
export function deploymentPlan(wasmFile) {
  if (!wasmFile?.endsWith(".wasm")) throw new Error("Provide a .wasm file");
  return {
    network: TESTNET.name,
    wasmFile,
    broadcast: false,
    requiredEnvironment: "TESTNET_WIF",
  };
}
// --8<-- [end:deploy-plan]

// --8<-- [start:debug-transaction]
export async function debugTransaction(transactionId) {
  const provider = new Provider(TESTNET.rpc);
  return provider.getTransactionReceipt(transactionId);
}
// --8<-- [end:debug-transaction]

// --8<-- [start:exchange-transfer]
export async function exchangeTransferPreview(from, depositAddress, amount) {
  if (from === depositAddress) throw new Error("Addresses must be different");
  return previewTransfer({ from, to: depositAddress, amount });
}
// --8<-- [end:exchange-transfer]

// --8<-- [start:governance-proposal]
export function proposalPlan({ title, description, operations = [] }) {
  if (!title || !description) throw new Error("Title and description are required");
  return {
    network: TESTNET.name,
    broadcast: false,
    title,
    description,
    operations,
  };
}
// --8<-- [end:governance-proposal]

export async function broadcastTransfer({ to, amount }, env = process.env) {
  if (env.BROADCAST !== "true") {
    throw new Error("Set BROADCAST=true to explicitly enable testnet broadcast");
  }
  const { provider, signer } = signerFromEnvironment(env);
  const operation = await createTransferOperation({
    from: signer.getAddress(),
    to,
    amount,
  });
  const transaction = new Transaction({
    provider,
    signer,
    options: { rcLimit: safeTransactionOptions(env).rcLimit },
  });
  await transaction.pushOperation(operation);
  await transaction.prepare();
  await transaction.sign();
  return transaction.send({ broadcast: true });
}

async function main() {
  const address = TESTNET.faucetAccount;
  const preview = await previewTransfer({
    from: address,
    to: address,
    amount: "0.00000001",
  });
  console.log(JSON.stringify(preview, null, 2));
  console.log(faucetInstructions(address).command);

  if (process.argv.includes("--live")) {
    const { chainId, head } = await connectTestnet();
    console.log(`Chain ID: ${chainId}`);
    console.log(`Head height: ${head.head_topology.height}`);
    console.log(`Health: ${await testnetHealth()}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
