# Quick Start

Learn how to read a KOIN balance from the Koinos blockchain in just a few lines of code.

## Prerequisites

- Node.js installed
- Basic JavaScript/TypeScript knowledge

## Setup

1. **Create a new project:**
```bash
mkdir koinos-quickstart
cd koinos-quickstart
npm init -y
```

2. **Install Koilib:**
```bash
npm install koilib
```

## Read a Balance

Create `index.js`:

<!-- example: interacting-quick-start-balance -->
```javascript
--8<-- "examples/javascript/getting-started/read-koin-balance/index.js:program"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/getting-started/read-koin-balance/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/getting-started/read-koin-balance)

The script is a read-only Node.js example. It defaults to a public address and
accepts another Koinos address as its first command-line argument.

3. **Run the script:**
```bash
node index.js
```

## Expected Output

```
Balance: 1234.56789012 KOIN
```

## What's Happening?

1. The script calls the current Koinos REST API.
2. The account and KOIN contract IDs form the balance endpoint.
3. The response contains the human-readable KOIN balance.
4. Errors are reported with the HTTP status instead of being silently ignored.

## Next Steps

- [Read data from other contracts](read-contract-data.md)
- [Submit your first transaction](submit-transaction.md)
- [Work with multiple operations](multiple-operations.md)
