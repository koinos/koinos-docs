# Signer class

`Signer` owns key material and can sign messages, transactions, and blocks.
Production applications must load keys from secure storage or use a wallet
extension; never put a real private key in source code.

<!-- example: reference-koilib-signer -->
```javascript
--8<-- "examples/javascript/references/koilib-api-tour/index.js:signer"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/references/koilib-api-tour/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/references/koilib-api-tour)

The example signs a local message with an explicitly disposable deterministic
key. It never sends the key or a transaction.
