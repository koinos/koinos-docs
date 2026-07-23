# Testnet Development

The current public testnet is operated by the Koinos Foundation. It can reset,
and its vKOIN has no monetary value. Do not reuse mainnet keys or assume old
testnet addresses and chain IDs are still valid.

| Setting | Current value |
| --- | --- |
| JSON-RPC | `https://testnet.koinosfoundation.org/jsonrpc` |
| Health | `https://testnet.koinosfoundation.org/health` |
| KOIN contract | `1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju` |
| Faucet | [KoinosTestnetFaucetBot](https://t.me/KoinosTestnetFaucetBot) |
| Operations source | [koinos/koinos-testnet](https://github.com/koinos/koinos-testnet) |

## Connect and retrieve live chain data

<!-- example: testnet-connect -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:testnet-connect"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

Retrieve the chain ID at runtime because a testnet reset can change it.

## Request vKOIN

<!-- example: testnet-faucet-instructions -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:faucet"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

Send the returned `/faucet ADDRESS` command to the Telegram bot. Never pay for
testnet tokens and never send mainnet funds to a faucet address.

## Create a testnet client

<!-- example: testnet-client -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:testnet-setup"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Prevent accidental mainnet use

<!-- example: testnet-environment-guard -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:environment"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Unit-test operation encoding

<!-- example: testnet-unit-test-strategy -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:unit-test-strategy"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

This verifies the encoded entry point without signing or broadcasting.

## Integration-test availability

<!-- example: testnet-health-check -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:integration-test"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Plan a deployment

<!-- example: testnet-deployment-plan -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:deploy-plan"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

The runner validates and prints a plan. Actual deployment additionally requires
compiled bytecode, its ABI, a dedicated funded testnet signer, and explicit
broadcast.

## Debug a transaction

<!-- example: testnet-debug-transaction -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:debug-transaction"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

Provide a real testnet transaction ID when calling this exported function.
`npm run smoke` performs only health, head, and chain-ID reads.
