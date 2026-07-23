# Kondor Wallet Integration

Kondor is a browser-extension wallet. A website can request account access and
signatures, but it cannot read private keys. Every sensitive action must remain
visible to and approved by the user.

## Detect Kondor

<!-- example: kondor-detect -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:detect"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

An online runner cannot access an extension installed in another browser or
profile. It will truthfully show that Kondor is unavailable.

## Request account access

<!-- example: kondor-connect -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:connect"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

Call this from a user gesture such as a Connect button and handle rejection.

## Set up signer and provider

<!-- example: kondor-setup-signer -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:setup-signer"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

The provider comes from the wallet, so the application observes the network the
user selected instead of silently forcing a stale endpoint.

## Request a signature

<!-- example: kondor-sign-message -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:request-signature"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

The demo signs a plain message only and never broadcasts a transaction. The
wallet still prompts the user to approve the signature.

## Refresh account state

<!-- example: kondor-refresh-account -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:account-refresh"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

Refresh after focus or before an action so a changed or disconnected account is
not mistaken for the previous one.

## Refresh network state

<!-- example: kondor-refresh-network -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:network-refresh"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

Compare chain IDs, not friendly labels, before preparing a state-changing
operation.

## Complete client

<!-- example: kondor-client -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/wallet.js:client"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/wallet.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

The linked Vite project includes UI wiring, automated mocks, and a production
build. Run it in the browser profile where Kondor is installed to exercise
wallet approval.
