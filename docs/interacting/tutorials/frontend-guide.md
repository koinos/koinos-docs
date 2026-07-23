# Frontend dApp Guide

This guide builds a minimal browser application with Vite and `kondor-js`. The
complete project is intentionally small enough to run locally or inspect in
StackBlitz.

## Install and run

```bash
npm install
npm start
```

The page can load without Kondor. Wallet operations require the extension in
the same browser context and explicit user approval.

## Wallet page initialization

<!-- example: frontend-wallet-client -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/main.js:wallet-client"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/main.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

The unavailable state is part of the application, not an unhandled error.

## Application controller

<!-- example: frontend-app-controller -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/src/main.js:app-controller"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/src/main.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

Connect and sign are bound to buttons so the approval requests follow user
gestures. Rejections are displayed in the status element.

## Vite configuration

<!-- example: frontend-vite-config -->
```javascript
--8<-- "examples/javascript/browser/kondor-dapp/vite.config.js:vite-config"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/browser/kondor-dapp/vite.config.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/browser/kondor-dapp)

Vite provides the local development server and production build without the
obsolete Webpack polyfill configuration used by earlier versions of this page.

## Verify the project

```bash
npm test
npm run build
```

The tests mock the wallet boundary; they do not trigger an extension prompt.
Manual testing should cover unavailable wallet, rejected approval, account
changes, network changes, and a successful local message signature.
