# Ecosystem applications and services

This page lists live applications, services, and node software whose purpose
and canonical destination were verified. Each entry identifies whether it is
community-maintained or third-party.

Inclusion is not an endorsement, audit, or guarantee of availability. Before
connecting a wallet, verify the domain, selected network, contract, assets, and
operation. Never share a recovery phrase, WIF, or private key.

## Exchange application

### KoinDX

[KoinDX](https://koindx.com/) is a decentralized-exchange application for
swapping Koinos tokens. Follow the application's current interface and
documentation; this directory does not assess its contracts, prices, or
liquidity.

- **Maintainer:** KoinDX project.
- **Ownership:** third-party.

## Bridge

### Vortex Bridge

[Vortex Bridge](https://vortexbridge.io/) provides a cross-chain bridge
interface that includes Koinos. Bridge use depends on third-party contracts and
multiple networks. Confirm the supported route and the current project
documentation before submitting a transfer.

- **Maintainer:** Vortex project.
- **Ownership:** third-party.

## Community applications

### Koin Krew

[Koin Krew](https://koincrew.com/) operates a Koinos community site and
[application portal](https://app.koincrew.com/) with token-tracking, NFT,
airdrop, and ownership-verification tools.

- **Maintainer:** Koin Krew project.
- **Ownership:** third-party.
- **Source:** no public source repository was verified.

Some features connect a wallet or interact with tokens. Confirm the destination,
contract, permissions, and transaction contents before using them. This
directory does not assess the listed tokens, NFTs, prices, or application
contracts.

## Block-production pools

These services provide interfaces for participating in pooled block production.
They are not part of the Koinos protocol or the official node software.

- [Fogata](https://fogata.io/) — pool discovery and participation interface
  maintained by Julián González; related source is available in
  [joticajulian/fogata](https://github.com/joticajulian/fogata). It is
  third-party.
- [BurnKoin](https://burnkoin.com/) — block-production pool interface
  maintained by the BurnKoin project/Luke Willis. The site links its
  [pool contracts](https://github.com/lukemwillis/koinos-burn-pool) and
  [web interface](https://github.com/lukemwillis/koinos-burn-pool-ui)
  repositories. It is third-party.

This directory makes no claim about rewards, returns, uptime, performance, or
the safety of funds. For protocol-level block production and Proof of Burn, see
[Node Operators](../nodes/index.md) and
[Proof of Burn](../architecture/proof-of-burn.md).

## Node software and operator applications

The official Koinos reference node remains the
[microservice-based Koinos node](https://github.com/koinos/koinos). The
projects below are community-led, experimental alternatives. Follow the
[Node Operators](../nodes/index.md) documentation for the standard production
path.

### Koinos One

[Koinos One](https://github.com/koinos/koinos-one) is an experimental desktop
application for running and managing a local Koinos node. It uses Teleno as its
native node engine and currently targets macOS.

- **Maintainer:** community contributors led by Pablo García.
- **Ownership:** community-maintained; the repository is hosted in the Koinos
  GitHub organization.
- **Current reviewed release:** [Koinos One v1.1.1](https://github.com/koinos/koinos-one/releases/tag/v1.1.1).

### Teleno

[Teleno](https://github.com/koinos/teleno) is an experimental,
Koinos-compatible node implemented as a single native C++ binary. It is the
node engine used by Koinos One; it does not replace the official
microservice-based reference implementation.

- **Maintainer:** community contributors led by Pablo García.
- **Ownership:** community-maintained; the repository is hosted in the Koinos
  GitHub organization.
- **Current reviewed release:** [Teleno node 1.1.0](https://github.com/koinos/teleno/releases/tag/teleno-node-v1.1.0).

Verify the selected network, release, configuration, data path, and key-handling
instructions in each project's own documentation before running either
experimental project.

## Request an entry or correction

The list intentionally omits projects whose current site, ownership, purpose, or
network compatibility could not be independently verified. See
[Community and learning](community-and-learning.md#propose-a-resources-entry)
for the evidence required to propose an addition.
