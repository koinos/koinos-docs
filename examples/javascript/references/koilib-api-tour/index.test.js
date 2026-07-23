import test from "node:test";
import assert from "node:assert/strict";

import {
  createUnsignedTransaction,
  formatKoin,
  identifyContract,
  serializeGreeting,
  signLocalMessage,
} from "./index.js";

test("formats the smallest KOIN units", () => {
  assert.equal(formatKoin("123456789"), "1.23456789");
});

test("round-trips a protobuf message", async () => {
  assert.deepEqual(await serializeGreeting(), { message: "Hello, Koinos" });
});

test("creates a disposable signer and local signature", async () => {
  const result = await signLocalMessage();
  assert.match(result.address, /^1/);
  assert.ok(result.signature.length > 0);
});

test("constructs Contract and Transaction objects without broadcasting", () => {
  assert.equal(identifyContract(), "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK");
  assert.deepEqual(createUnsignedTransaction().transaction.operations, []);
});
