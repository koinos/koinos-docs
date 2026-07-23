import test from "node:test";
import assert from "node:assert/strict";

import { headHeight, NETWORKS } from "./index.js";

test("uses the current public testnet JSON-RPC endpoint", () => {
  assert.equal(
    NETWORKS.testnet.rpc,
    "https://testnet.koinosfoundation.org/jsonrpc"
  );
});

test("extracts the current head height", () => {
  assert.equal(headHeight({ head_topology: { height: "123" } }), "123");
  assert.equal(headHeight({}), "unknown");
});
