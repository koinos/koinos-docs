# Submit a Transaction

Transactions change blockchain state. The examples on this page target only the
current Koinos Foundation public testnet, use test tokens with no monetary
value, and do not broadcast unless you explicitly opt in.

## Configure a signer

Keep a dedicated testnet WIF outside source control:

<!-- example: transaction-setup-signer -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:setup-signer"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Encode a transfer

This function creates a real testnet KOIN contract operation but does not sign
or send it:

<!-- example: transaction-create-transfer -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:transfer"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Resource and broadcast options

<!-- example: transaction-safe-options -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:transaction-options"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

`BROADCAST` is false unless its value is exactly `true`.

## Dry-run preview

<!-- example: transaction-dry-run -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:dry-run"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

`npm start` executes this safe path and prints the encoded operation.

## Receipt handling

<!-- example: transaction-receipt-errors -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:error-handling"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

The complete source exports `broadcastTransfer`. It refuses to run without both
`BROADCAST=true` and `TESTNET_WIF`. Verify the destination and amount before
enabling it.

## Best practices

- Use separate testnet and mainnet wallets.
- Never paste a WIF into code, documentation, or an online runner.
- Preview and test the operation before broadcasting.
- Check `receipt.reverted` and wait for confirmation where needed.

Continue with [multiple operations](multiple-operations.md).
