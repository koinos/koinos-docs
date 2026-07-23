# Smart Contract Quick Start

Compile and test a contract locally before considering deployment. The public
testnet can reset, and test keys must remain separate from mainnet keys.

## Prerequisites

- Node.js for the executable client example
- Your contract toolchain and a compiled `.wasm` file for deployment
- A dedicated funded testnet account

The canonical public endpoint is:

```text
https://testnet.koinosfoundation.org/jsonrpc
```

## Safe deployment configuration

<!-- example: contract-testnet-deployment-config -->
```javascript
--8<-- "examples/javascript/contracts/testnet-contract-client/index.js:deployment-config"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/contracts/testnet-contract-client/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/contracts/testnet-contract-client)

The example records the key's environment-variable name, never the key itself,
and defaults to `broadcast: false`. A deployment tool must additionally load
the compiled bytecode and ABI, validate the current chain ID, and obtain
explicit approval before broadcast.

## Read a deployed token contract

<!-- example: contract-read-testnet-token -->
```javascript
--8<-- "examples/javascript/contracts/testnet-contract-client/index.js:read-contract"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/contracts/testnet-contract-client/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/contracts/testnet-contract-client)

The complete Node.js program reads the current testnet KOIN metadata and prints
the dry-run deployment defaults. It requires no key and changes no state.

## Verify

```bash
npm install
npm test
npm start
```

For your own contract, replace the default contract ID only after deployment
and update the read logic to match the deployed ABI.
