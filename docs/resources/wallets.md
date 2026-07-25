# Wallets

Wallets manage the keys used to authorize Koinos operations. The entries below
were verified through their current canonical sources, but their inclusion is
not an endorsement or security audit.

## Comparison

<div class="grid cards" markdown>

-   __[Kondor](https://kondorwallet.com/)__

    ---

    - **Platform:** Chromium browser extension.
    - **Key model:** self-custody; keys are managed by the extension.
    - **dApp support:** compatible web applications can request signatures.
    - **Networks:** Koinos; confirm the selected provider and network before
      signing.
    - **Maintainer:** [Julián González](https://github.com/joticajulian).
    - **Ownership:** community-maintained.
    - **Source:** [joticajulian/kondor](https://github.com/joticajulian/kondor).

    Use the install link from the canonical website and verify the extension
    publisher before installing.

-   __[Tangem](https://tangem.com/en/cryptocurrencies/koinos/)__

    ---

    - **Platform:** Tangem cards and mobile application.
    - **Key model:** keys are managed through the Tangem hardware-wallet
      system.
    - **dApp support:** no Koinos dApp-browser support was verified for this
      review.
    - **Networks:** Tangem's current asset page lists the Koinos network.
    - **Maintainer:** Tangem.
    - **Ownership:** third-party.
    - **Source availability:** no open-source repository for the Koinos
      integration was verified during this review.

</div>

## Command-line wallets

Command-line wallets are intended for users who can inspect source,
dependencies, terminal history, file permissions, networks, and transaction
details. Test a tool with a separate low-value testnet account before deciding
whether it is appropriate for other keys.

### kcli

[kcli](https://github.com/pgarciagon/kcli) is a community-maintained Node.js
command-line wallet and blockchain interaction tool built with Koilib.

- **Platform:** terminal application built from source with Node.js.
- **Key model:** self-custody; an imported WIF is password-encrypted in a local
  wallet file.
- **dApp support:** no browser dApp connection; it reads chain data and submits
  supported transactions directly.
- **Networks:** mainnet and the current public testnet are implemented. In the
  reviewed version, a saved RPC can override the selected network, so verify
  both the displayed RPC and its chain ID before signing.
- **Maintainer:** [Pablo García](https://github.com/pgarciagon).
- **Ownership:** community-maintained.
- **Source:** [pgarciagon/kcli](https://github.com/pgarciagon/kcli).
- **Reviewed version:** `1.4.0` at commit
  [`c263df6`](https://github.com/pgarciagon/kcli/commit/c263df637eb632e275e77f807777aa64c3fd54ed).

!!! warning "Review kcli before using a funded account"

    The reviewed version has no published release or package; install it from
    source. Some commands accept a WIF or recovery phrase as a command-line
    argument, and wallet generation prints the WIF in the terminal. Those
    values can be exposed through terminal history, process inspection,
    recordings, or logs.

    A production-dependency audit of the reviewed commit also reported known
    advisories, including
    [a critical advisory in a transitive dependency](https://github.com/advisories/GHSA-xq3m-2v4x-88gg).
    Review and update the dependency tree before relying on it, and prefer a
    low-value testnet account while evaluating the tool.

    During verification, a saved mainnet RPC overrode `--network testnet` for
    a read command, which then displayed mainnet data under a testnet label.
    Use the current endpoint from
    [koinos/koinos-testnet](https://github.com/koinos/koinos-testnet)
    explicitly and verify the returned chain ID. Do not rely on the network
    label alone.

### Koinos CLI

The official [Koinos CLI](https://github.com/koinos/koinos-cli) can manage
accounts and submit transactions from a terminal. It is listed primarily under
[SDKs, libraries, and developer tools](software-libraries.md), rather than as a
consumer wallet. See the [CLI wallet guide](../getting-started/cli-wallet.md)
before using it.

## Protect keys and recovery material

!!! danger "Never share wallet secrets"

    A recovery phrase, WIF, or private key gives control of the associated
    account. Never paste one into documentation, chat, an issue, a website, or a
    command you have not independently verified. Koinos contributors and wallet
    maintainers should not ask for it.

- Back up recovery material offline before funding an account.
- Verify the wallet URL, extension publisher, network, recipient, and operation
  before approving a signature.
- Test recovery with the wallet's current instructions before relying on a
  backup.
- Use a separate low-value account when evaluating an unfamiliar application.

For the account, key, and wallet concepts behind these precautions, read
[Accounts, Keys, and Wallets](../getting-started/accounts-keys-wallets.md).
