# Read Data from a Contract

Learn how to query smart contract state and read data from contracts on the Koinos blockchain.

## Overview

Reading contract data is a fundamental operation when building applications on Koinos. Unlike transactions that modify state, reading data is free and doesn't require mana.

## Prerequisites

- Basic understanding of [Quick Start](quick-start.md)
- Node.js and Koilib installed

## Reading Contract State

### Basic Contract Read

<!-- example: interacting-read-head-info -->
```javascript
--8<-- "examples/javascript/interacting/read-only-queries/index.js:head-info"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/interacting/read-only-queries/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/interacting/read-only-queries)

This first read verifies the connection by retrieving the current mainnet head.
It is read-only and requires no account.

## Working Without a Local ABI

### Fetching ABI from the Blockchain

If you don't have the ABI locally, query the contract metadata service through
the provider and parse the returned JSON:

<!-- example: interacting-fetch-contract-abi -->
```javascript
--8<-- "examples/javascript/interacting/read-only-queries/index.js:contract-abi"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/interacting/read-only-queries/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/interacting/read-only-queries)

### ABI Fetching Explained

The `fetchAbi()` function:

- **Retrieves the ABI** directly from the blockchain where it's stored
- **Links it to the contract interface** so you can call functions
- **Works with any contract** as long as you have the contract address and the ABI was deployed by the creator

### When to Use Each Approach

**Local ABI (Recommended):**

- Better performance (no network call)
- Works offline during development
- More predictable for production applications

**Dynamic ABI Fetching:**

- When you don't have the ABI available locally
- For exploring unknown contracts
- When building tools that work with arbitrary contracts

## Common Read Operations

### Token Balance

The public REST layer exposes contract-backed token reads in a convenient form:

<!-- example: interacting-read-token-balance -->
```javascript
--8<-- "examples/javascript/interacting/read-only-queries/index.js:balance"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/interacting/read-only-queries/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/interacting/read-only-queries)

### Contract Metadata

The same API can read the KOIN token's name, symbol, decimals, and supply:

<!-- example: interacting-read-token-metadata -->
```javascript
--8<-- "examples/javascript/interacting/read-only-queries/index.js:token-metadata"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/interacting/read-only-queries/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/interacting/read-only-queries)

All four examples are read-only. A live run needs network access to the public
mainnet API but no key or wallet.
## Best Practices

1. **Cache results** when appropriate to reduce API calls
2. **Handle errors** gracefully for network issues
3. **Use appropriate data types** for contract parameters
4. **Validate results** before using in your application

## Next Steps

- [Submit a transaction](submit-transaction.md)
- [Work with multiple operations](multiple-operations.md)
