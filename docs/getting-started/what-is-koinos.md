# What is Koinos?

Koinos is a general-purpose blockchain whose applications and protocol
components run as WebAssembly smart contracts. Its design combines a
regenerating resource system called Mana, Proof-of-Burn consensus, upgradeable
system contracts, and a node made from cooperating microservices.

## Mana and fee-less transactions

Koinos does not require a user to pay a token fee for every transaction.
Transactions consume **Mana**, a regenerating resource associated with KOIN.
Mana is temporarily consumed when the network performs work and becomes
available again over time.

This changes the cost model, but it does not make network capacity unlimited:

- an account can submit work only while sufficient Mana is available;
- applications or other accounts can pay resource costs for a user;
- holding or delegating resource capacity still has an opportunity cost; and
- nodes enforce resource limits for computation, storage, and network usage.

The result is a protocol that can support fee-less user interactions without
removing resource accounting.

## Smart contracts and WebAssembly

Koinos executes smart contracts as WebAssembly (WASM). Current development
tooling includes SDKs for:

- [AssemblyScript](https://github.com/koinos/koinos-sdk-as), which has
  TypeScript-like syntax; and
- [C++](https://github.com/koinos/koinos-sdk-cpp).

WebAssembly provides a common execution target. It does not mean that every
language can be used without an SDK, compiler support, and Koinos-specific
bindings.

## System contracts and upgrades

Core behavior such as token logic, Mana accounting, governance, and consensus
is implemented partly through **system contracts**. Approved upgrades can
replace system-contract code while the chain continues operating. This is often
described as an *in-band upgrade*.

This design reduces the number of changes that require replacing the node
software. It does not guarantee that every possible protocol change can happen
without software updates, operator coordination, or a network fork.

## Proof-of-Burn consensus

Koinos mainnet uses **Proof-of-Burn (PoB)**. A block producer burns KOIN to
receive **VHP** (Virtual Hash Power). VHP represents production power: a
producer with more effective VHP has a greater probability of satisfying the
block-production target.

Creating blocks consumes VHP over time, while successful production provides
block rewards. Burning KOIN is irreversible, so block production requires an
up-front economic commitment without requiring energy-intensive mining
hardware.

For the protocol details, see the
[Proof-of-Burn architecture guide](../architecture/proof-of-burn.md).

## Microservice node architecture

A Koinos node is composed of services that communicate through AMQP. Core
services handle the chain, block storage, the mempool, and peer-to-peer
networking. Optional services expose JSON-RPC, REST, account history, and other
indexes.

This separation allows operators to enable the services they need and lets
developers build additional services without embedding everything in one node
process.

## Mainnet and testnet

- **Mainnet** is the production Koinos network. Transactions can affect assets
  with real value.
- **Testnet** is a public development network. Its tokens have no monetary
  value, and its state and chain ID can change after a reset.
- **Local networks** are useful for isolated contract development and automated
  tests.

See [Mainnet vs Testnet](mainnet-vs-testnet.md) for current endpoints and the
public testnet faucet.

## What to learn next

- [Accounts, Keys, and Wallets](accounts-keys-wallets.md)
- [Mainnet vs Testnet](mainnet-vs-testnet.md)
- [Tooling Overview](tooling-overview.md)
