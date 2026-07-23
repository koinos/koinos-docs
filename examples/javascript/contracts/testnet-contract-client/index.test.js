import test from "node:test";
import assert from "node:assert/strict";

import { deploymentConfig, readTokenMetadata } from "./index.js";

test("deployment is testnet-only and dry-run by default", () => {
  const config = deploymentConfig({});
  assert.equal(config.network, "testnet");
  assert.equal(config.broadcast, false);
});

test("reads token metadata with an injectable HTTP client", async () => {
  const result = await readTokenMetadata("contract", async () => ({
    ok: true,
    json: async () => ({ name: "Test token" }),
  }));
  assert.equal(result.name, "Test token");
});
