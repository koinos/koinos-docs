# Tooling Overview

Koinos tools fall into four groups: client libraries, wallets, command-line
tools, and smart-contract SDKs. Choose the smallest toolset that matches the
task.

## Koilib

[Koilib](https://github.com/joticajulian/koilib) is a JavaScript and TypeScript
library for reading Koinos data, preparing transactions, and interacting with
contracts.

Install the current npm package:

```bash
npm install koilib
```

Its principal APIs include:

- `Provider` for JSON-RPC connections;
- `Contract` for ABI-based contract calls;
- `Signer` and `Transaction` for signed operations; and
- `utils`, including token ABIs and unit conversion helpers.

Use `utils.formatUnits` and `utils.parseUnits` when converting token values.
Never use JavaScript floating-point arithmetic for on-chain integer amounts.

See the [Koilib API documentation](https://joticajulian.github.io/koilib/) for
the installed version's interfaces.

## Kondor

[Kondor 2](kondor-wallet.md) is a self-custody Chrome extension. It is suitable
for users who want a graphical wallet and for dApps that need a user-approved
signature.

Use the current [Kondor documentation](https://kondorwallet.com/docs/) rather
than legacy browser-global examples. The extension requires a separate user
approval for connections and signing requests.

## Koinos CLI

The [Koinos CLI](cli-wallet.md) is an official Go command-line application. It
supports interactive wallet management, RPC connections, contract
registration, token transfers, contract uploads, and transaction sessions.

Download a binary from the
[release page](https://github.com/koinos/koinos-cli/releases) or build the
official repository from source. There is no published `@koinos/cli` npm
package.

## Smart-contract development

### AssemblyScript SDK

The official
[Koinos AssemblyScript SDK](https://github.com/koinos/koinos-sdk-as) provides
the runtime types and APIs used by AssemblyScript contracts. The associated
[`@koinos/sdk-as-cli`](https://www.npmjs.com/package/@koinos/sdk-as-cli)
package provides project tooling.

### C++ SDK

The official [Koinos C++ SDK](https://github.com/koinos/koinos-sdk-cpp)
supports contracts written in C++.

### Arkinos

[Arkinos](https://github.com/joticajulian/koinos-contract) is a
community-maintained project scaffolder for AssemblyScript contracts and
optional frontends. The published package is named `arkinos`:

```bash
npx arkinos
```

The package `@arkinos/cli` does not exist. After scaffolding, follow the README
generated inside the project because its scripts depend on the selected
template.

## Network access

Choose an endpoint based on the environment:

- mainnet JSON-RPC: `https://api.koinos.io/`
- public testnet JSON-RPC:
  `https://testnet.koinosfoundation.org/jsonrpc`
- local development: a JSON-RPC service from your own Koinos node or test
  environment

See [Mainnet vs Testnet](mainnet-vs-testnet.md) before signing testnet
transactions.

## Explorers

Explorers are useful for inspecting public blocks, accounts, contracts, and
transactions. [Koinos Blocks](https://koinosblocks.com/) is linked from the
official Koinos ecosystem site and was reachable during this review.

An explorer is not an authority for private-key requests. Never enter a private
key or recovery phrase into an explorer.

## Which tool should I use?

| Task | Suggested starting point |
| --- | --- |
| Read chain or contract data in JavaScript | Koilib |
| Approve dApp transactions in Chrome | Kondor |
| Manage a wallet from a terminal | Koinos CLI |
| Build an AssemblyScript contract | Koinos AssemblyScript SDK |
| Scaffold a community contract template | Arkinos |
| Build a C++ contract | Koinos C++ SDK |
| Inspect a transaction | Koinos Blocks |

## Next steps

- [Connect to mainnet or testnet](mainnet-vs-testnet.md)
- [Interacting with Koinos](../interacting/index.md)
- [Smart Contract Development](../contracts/index.md)
