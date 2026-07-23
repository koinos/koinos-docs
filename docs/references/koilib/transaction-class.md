# Transaction class

`Transaction` collects operations and handles preparation, signing, and
optional broadcast.

<!-- example: reference-koilib-transaction -->
```javascript
--8<-- "examples/javascript/references/koilib-api-tour/index.js:transaction"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/references/koilib-api-tour/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/references/koilib-api-tour)

This example creates an empty unsigned transaction only. State-changing
examples elsewhere in these docs default to testnet and require an explicit
broadcast flag.
