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

## Command-line alternative

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
