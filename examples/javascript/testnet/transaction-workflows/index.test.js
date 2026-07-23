import test from "node:test";
import assert from "node:assert/strict";

import {
  TESTNET,
  assertSuccessfulReceipt,
  buildBatch,
  deploymentPlan,
  faucetInstructions,
  networkConfig,
  previewTransfer,
  proposalPlan,
  signerFromEnvironment,
} from "./index.js";

const address = TESTNET.faucetAccount;

test("encodes a testnet KOIN transfer without broadcasting", async () => {
  const preview = await previewTransfer({
    from: address,
    to: address,
    amount: "0.00000001",
  });
  assert.equal(preview.broadcast, false);
  assert.equal(preview.operations[0].call_contract.contract_id, TESTNET.koinContract);
});

test("builds an atomic batch", async () => {
  const batch = await buildBatch(address, [
    { to: address, amount: "0.00000001" },
    { to: address, amount: "0.00000002" },
  ]);
  assert.equal(batch.operations.length, 2);
  assert.equal(batch.broadcast, false);
});

test("requires explicit environment configuration for signing", () => {
  assert.throws(() => signerFromEnvironment({}), /TESTNET_WIF/);
  assert.throws(() => networkConfig({ KOINOS_NETWORK: "mainnet" }), /testnet-only/);
});

test("validates receipts and plans", () => {
  assert.throws(
    () => assertSuccessfulReceipt({ reverted: true, logs: ["failure"] }),
    /failure/
  );
  assert.equal(faucetInstructions(address).command, `/faucet ${address}`);
  assert.equal(deploymentPlan("contract.wasm").broadcast, false);
  assert.equal(
    proposalPlan({ title: "Test", description: "Testnet proposal" }).broadcast,
    false
  );
});
