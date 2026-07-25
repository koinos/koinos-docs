# Explorers and network tools

Explorers let you inspect public blockchain data without running a local query.
Network repositories and dashboards serve a different purpose: they describe a
network or report operational status.

Inclusion here is not an endorsement or audit. Verify important transaction and
account information through more than one source when possible.

## Mainnet explorers

### Koinosblocks

[Koinosblocks](https://koinosblocks.com/) is a community-maintained mainnet
explorer operated by Engrave. It supports searches for blocks, transactions,
accounts, contracts, and names.

- **Ownership:** community-maintained.
- **Source:** [Engrave's Koinosblocks repository](https://gitlab.com/engrave/koinos/koinosblocks).
- **Verified network:** Koinos mainnet.
- **API:** no current maintained public API documentation was verified, so the
  explorer is listed only as a web interface.

### Koinscan

[Koinscan](https://www.koinscan.com/) is a third-party mainnet explorer
operated by Armana. It supports searches for blocks, transactions, accounts,
contracts, and tokens, and includes a network view for block-production data.

- **Ownership:** third-party.
- **Source:** no public source repository was verified.
- **Verified network:** Koinos mainnet.
- **API:** no current public API documentation was verified.
- **Status:** the site identifies itself as an early beta, so independently
  verify information used for an operational or financial decision.

## Current public testnet

No graphical explorer was verified for the current public testnet during this
review. Use the official
[koinos/koinos-testnet](https://github.com/koinos/koinos-testnet) repository for
the current network definition, release information, and connection guidance.
Do not assume that a mainnet explorer supports the testnet.

Avoid copying network identifiers or endpoints into long-lived integrations.
Read them from the current official testnet release, then verify the chain ID
returned by the endpoint before submitting an operation. See
[Mainnet vs Testnet](../getting-started/mainnet-vs-testnet.md) and
[Interacting with the testnet](../interacting/testnet.md).

## Choosing a network tool

- Use an **explorer** to inspect blocks, transactions, accounts, and contracts.
- Use an official **network repository** to identify the current testnet and its
  configuration.
- Use the [Node Operators](../nodes/index.md) documentation if you need to run
  or query your own node.

Third-party sites can be delayed, incomplete, or unavailable. An explorer's
display is not proof that a transaction is final; use the finality guidance
appropriate to your application.
