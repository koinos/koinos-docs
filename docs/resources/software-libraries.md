# SDKs, libraries, and developer tools

Choose tools by the task you need to perform. Versions shown here were verified
on **2026-07-25**; check the canonical package or repository before installing.
An official repository is maintained in the Koinos GitHub organization. A
community-maintained project has an independent maintainer.

## JavaScript and TypeScript interaction

### Koilib

[Koilib](https://github.com/joticajulian/koilib) is a
community-maintained JavaScript/TypeScript library for providers, signers,
transactions, contracts, and serialization.

```console
npm install koilib
```

- **Published package:** [`koilib` 9.2.0](https://www.npmjs.com/package/koilib)
- **Reviewed source:** commit
  [`ae5b267`](https://github.com/joticajulian/koilib/commit/ae5b2671ee5f31cb9c8f66f3007a4451026d3ec7)
- **Maintainer:** Julián González

See the [Koilib reference](../references/koilib/contract-class.md) and
[Interacting with Koinos](../interacting/index.md) for the relevant workflows.

## AssemblyScript contracts

### Koinos AssemblyScript SDK

The official [Koinos AssemblyScript SDK](https://github.com/koinos/koinos-sdk-as)
provides the contract APIs and types used to build AssemblyScript smart
contracts.

```console
npm install @koinos/sdk-as
```

- **Published package:**
  [`@koinos/sdk-as` 1.4.0](https://www.npmjs.com/package/@koinos/sdk-as)
- **Reviewed source:** commit
  [`d93ad34`](https://github.com/koinos/koinos-sdk-as/commit/d93ad345a34fa65bfd7a25ec5fc3c7ad9d428f21)

The official
[AssemblyScript SDK CLI](https://github.com/koinos/koinos-sdk-as-cli) scaffolds
and manages AssemblyScript contract projects:

```console
npm install --global @koinos/sdk-as-cli
```

The published package is
[`@koinos/sdk-as-cli` 1.0.2](https://www.npmjs.com/package/@koinos/sdk-as-cli);
the reviewed repository revision is
[`6c0a7cb`](https://github.com/koinos/koinos-sdk-as-cli/commit/6c0a7cb18533a02e442998de0d4575e263077b34).
Follow [Smart Contracts](../contracts/index.md) for the complete development
workflow.

## C++ contracts

The official [Koinos C++ SDK](https://github.com/koinos/koinos-sdk-cpp)
provides a C++ smart-contract development kit. Its latest GitHub release at the
time of review is
[`v1.0.0`](https://github.com/koinos/koinos-sdk-cpp/releases/tag/v1.0.0).
Review its build instructions and compatibility with your target chain release
before starting a new project.

## Command-line interaction

The official [Koinos CLI](https://github.com/koinos/koinos-cli) manages
accounts, reads chain state, invokes contracts, and submits transactions. Use
the documented release rather than an unversioned binary; the release verified
for this review is
[`v2.0.0`](https://github.com/koinos/koinos-cli/releases/tag/v2.0.0).

CLI operations can be state-changing. Verify the endpoint, chain ID, account,
operation, and signer before approving a transaction. Start with the
[CLI wallet guide](../getting-started/cli-wallet.md).

## Local testing

- The official
  [Koinos local testnet](https://github.com/koinos/koinos-local-testnet)
  starts a development network for local integration testing. The reviewed
  source is commit
  [`2508a39`](https://github.com/koinos/koinos-local-testnet/commit/2508a39826d6632238edd8a1138c1b42c7ca8cbd).
  A local network is separate from the current public testnet.
- The official
  [Koinos Mock VM](https://github.com/koinos/koinos-mock-vm) supports local
  contract unit tests. The verified package is
  [`@koinos/mock-vm` 1.2.0](https://www.npmjs.com/package/@koinos/mock-vm), and
  the reviewed source is commit
  [`b7bcd44`](https://github.com/koinos/koinos-mock-vm/commit/b7bcd4483447c0d70529ff9d4d5fe4dd5d6b25e7).

A mock runtime does not replace testing against the target integration network.
For the current public testnet, use the official
[koinos/koinos-testnet](https://github.com/koinos/koinos-testnet) source and the
[testnet guide](../interacting/testnet.md).

## Protocol schemas and generated types

The official [koinos-proto](https://github.com/koinos/koinos-proto) repository
contains Koinos Protocol Buffer schemas and generated bindings. The version
reviewed here is
[`v2.6.0`](https://github.com/koinos/koinos-proto/releases/tag/v2.6.0).

Generated C++, embedded C++, Go, JavaScript, and Python bindings expose
protocol-level messages. They are not complete high-level SDKs: application
features such as signing, provider behavior, transaction construction, and
contract abstractions must be evaluated separately.

See [Protocol Buffers](../contracts/protobuffers.md) and
[References](../references/index.md) for related documentation.
