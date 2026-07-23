import test from "node:test";
import assert from "node:assert/strict";

import { balanceUrl, KOIN_CONTRACT_ID, readKoinBalance } from "./index.js";

test("builds a mainnet balance URL", () => {
  assert.equal(
    balanceUrl("address with spaces"),
    `https://api.koinos.io/v1/account/address%20with%20spaces/balance/${KOIN_CONTRACT_ID}`
  );
});

test("returns the decimal balance string", async () => {
  const value = await readKoinBalance("public-address", async () => ({
    ok: true,
    json: async () => ({ value: "12.34000000" }),
  }));
  assert.equal(value, "12.34000000");
});

test("reports an HTTP failure", async () => {
  await assert.rejects(
    readKoinBalance("public-address", async () => ({
      ok: false,
      status: 503,
    })),
    /HTTP 503/
  );
});
