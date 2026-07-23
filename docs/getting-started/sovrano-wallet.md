# Sovrano Wallet

Sovrano is listed in the Koinos ecosystem as a browser-based wallet project.
The project also publishes an authorization SDK for connecting Koinos dApps to
Sovrano through redirects.

Earlier versions of this page described a 2024–2025 roadmap, social recovery,
fiat ramps, plugins, and launch plans as though they were current product
features. Those claims have been removed because the public sources reviewed
for this update do not provide maintained operational documentation for all of
them.

## Current public sources

- [Sovrano authorization SDK](https://github.com/sovrano-io/auth-sdk)
- [Sovrano entry on the Koinos website](https://koinos.io/#wallets)

The previously linked `sovrano.io` landing page currently returns an HTTP 404,
so it is not presented here as an installation source. Check the sources above
before relying on a specific feature, recovery method, supported browser, or
availability status.

## Before using any wallet

Confirm that the current Sovrano interface explains:

1. who controls the private keys;
2. how the account can be recovered;
3. what information is sent to a server;
4. which Koinos network is selected;
5. which operations a dApp is requesting; and
6. whether the product is production-ready or still experimental.

Do not enter a recovery phrase or private key on a site unless the verified
wallet's documented recovery flow explicitly requires it.

## Developer integration

The published `@sovrano-io/auth-sdk` package documents redirect-based signup,
connection, and transaction authorization:

```bash
npm install @sovrano-io/auth-sdk
```

Use the
[SDK repository and README](https://github.com/sovrano-io/auth-sdk) for the
current API. Do not copy the old `SovranoAuth` example from previous versions of
this page; it did not match the published SDK interface.

## Alternatives

For a currently documented Chrome wallet, see
[Kondor Wallet](kondor-wallet.md). For an official command-line workflow, see
the [Koinos CLI Wallet](cli-wallet.md).

Whichever wallet you choose, review
[Accounts, Keys, and Wallets](accounts-keys-wallets.md) before funding it.
