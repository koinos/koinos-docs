# Testnet transaction workflows

This Node.js project contains the transaction, batching, testnet, exchange, and
governance examples used by the documentation. `npm start` only builds and
prints a dry-run transfer operation. `npm run smoke` additionally performs
read-only health and chain checks against the current public testnet.

```bash
npm install
npm start
npm test
npm run smoke
```

Broadcast is disabled by default. The exported `broadcastTransfer` function
requires both `BROADCAST=true` and `TESTNET_WIF` for a dedicated funded testnet
account. Never use a mainnet key.
