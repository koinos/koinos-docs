# Testnet contract client

This Node.js example prints safe deployment configuration and reads the current
testnet KOIN contract metadata. It does not deploy or broadcast.

```bash
npm install
npm start
npm test
```

An actual deployment additionally requires compiled WebAssembly, an ABI, a
dedicated funded `TESTNET_WIF`, and explicit `BROADCAST=true`.
