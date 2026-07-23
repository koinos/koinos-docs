import test from "node:test";
import assert from "node:assert/strict";

import { getHeadInfo, getKoinBalance, withRetry } from "./index.js";

const jsonResponse = (value) => ({
  ok: true,
  json: async () => value,
});

test("reads head information", async () => {
  const result = await getHeadInfo(async () =>
    jsonResponse({ head_topology: { height: "42" } })
  );
  assert.equal(result.head_topology.height, "42");
});

test("encodes the account in a balance request", async () => {
  let requestedUrl;
  await getKoinBalance("address with spaces", async (url) => {
    requestedUrl = url;
    return jsonResponse({ value: "1" });
  });
  assert.match(requestedUrl, /address%20with%20spaces/);
});

test("retries a transient failure", async () => {
  let attempts = 0;
  const result = await withRetry(async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("temporary");
    return "ok";
  });
  assert.equal(result, "ok");
  assert.equal(attempts, 2);
});
