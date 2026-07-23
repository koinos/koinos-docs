# Submit Multiple Operations in One Transaction

A Koinos transaction can contain multiple operations. They are atomic: either
the transaction succeeds as a unit or its state changes are reverted. These
examples build testnet-only dry-run plans.

## Build a transfer batch

<!-- example: multi-build-batch -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:multi-operations"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Pair two atomic transfers

<!-- example: multi-atomic-pair -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:atomic-swap"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

This only groups two operations; it is not a trustless swap protocol. A real
swap also needs authorization and counterparty logic in a contract.

## Describe related contract updates

<!-- example: multi-describe-updates -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:complex-update"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

Replace each description with a tested contract operation before signing.

## Batch recipients

<!-- example: multi-batch-recipients -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:batch-transfers"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

## Size resource limits deliberately

<!-- example: multi-operation-options -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:multi-options"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

The calculation is a conservative example, not a network estimate. Simulate
your actual operations and set an appropriate limit. Keep batches reasonably
sized, validate every recipient, and inspect the full transaction before
broadcast.
