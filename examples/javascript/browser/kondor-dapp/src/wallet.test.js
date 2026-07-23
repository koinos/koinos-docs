import test from "node:test";
import assert from "node:assert/strict";

import {
  KondorClient,
  connectKondor,
  isKondorAvailable,
  refreshAccount,
  refreshNetwork,
  requestMessageSignature,
  setupKondorSigner,
} from "./wallet.js";

function mockApi() {
  const provider = { getChainId: async () => "test-chain" };
  const signer = { signMessage: async (message) => `signed:${message}` };
  return {
    getAccounts: async () => ["1MockAccount"],
    getProvider: async () => provider,
    getSigner: async () => signer,
    provider,
    signer,
  };
}

test("detects the injected wallet", () => {
  assert.equal(isKondorAvailable({ window: { kondor: {} } }), true);
  assert.equal(isKondorAvailable({ window: {} }), false);
});

test("connects and wires the provider to the signer", async () => {
  const api = mockApi();
  assert.equal(await connectKondor(api), "1MockAccount");
  const result = await setupKondorSigner(api);
  assert.equal(result.signer.provider, api.provider);
});

test("requests a user-approved message signature", async () => {
  const result = await requestMessageSignature("hello", mockApi());
  assert.equal(result.signature, "signed:hello");
});

test("refreshes account and network state", async () => {
  assert.equal((await refreshAccount("old", mockApi())).changed, true);
  assert.equal((await refreshNetwork("old", mockApi())).chainId, "test-chain");
});

test("provides a complete client", async () => {
  const client = new KondorClient(mockApi());
  assert.equal((await client.connect()).chainId, "test-chain");
  client.disconnect();
  assert.equal(client.account, null);
});
