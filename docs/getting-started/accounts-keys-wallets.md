# Accounts, Keys, and Wallets

Koinos accounts are controlled through cryptographic authorization. Before
using a wallet, it helps to distinguish an account, an address, a key, and the
software that manages them.

## The basic terms

| Term | Meaning | Safe to share? |
| --- | --- | --- |
| Private key | Secret value used to authorize actions | **No** |
| Public key | Value derived from a private key and used to verify signatures | Usually |
| Address | Public identifier derived from a public key | Yes |
| Account | On-chain identity and state associated with an address | Yes |
| Wallet | Software that manages keys and requests signatures | Not applicable |
| Recovery phrase | Words from which wallet keys can be restored | **No** |

Koinos tools use the `secp256k1` elliptic curve for account signatures. Common
tools encode private keys in Wallet Import Format (WIF) and addresses with a
Base58Check-style encoding. These encodings improve interoperability and error
detection; they do **not** encrypt the underlying secret.

!!! warning "An address is not a private key"

    Share an address when someone needs to send you tokens or inspect public
    activity. Never share a private key, recovery phrase, wallet backup
    password, or wallet PIN.

## Account authority

For a conventional account, a valid signature from its private key proves
authority. Koinos also allows smart-contract logic to participate in
authorization. This makes designs such as multisignature approval, recovery
rules, and application-sponsored transactions possible.

Programmable authority is an advanced feature. It does not make key handling
optional: the account's configured rules determine which signatures or contract
conditions are required.

## Protect your keys

- Generate keys only with trusted wallet or cryptographic software.
- Keep recovery phrases offline and away from screenshots, chat, email, and
  cloud notes.
- Verify the application and network before approving a transaction.
- Keep a tested backup before moving funds to a new wallet.
- Use separate wallets for production funds and testnet experiments.
- Treat testnet keys as secrets too; reusing them on mainnet creates avoidable
  risk.

No Koinos maintainer, wallet developer, faucet operator, or community moderator
needs your private key or recovery phrase.

## Wallet options

### Kondor

[Kondor](kondor-wallet.md) is a self-custody Chrome extension for Koinos. The
current Kondor 2 documentation covers creating and importing wallets,
transaction approval, encrypted backups, network selection, and dApp
connections.

**Use it when:** you want a graphical wallet in Chrome or need to approve
transactions from a dApp.

### Koinos CLI

The [Koinos CLI](cli-wallet.md) is an interactive command-line application for
key management and blockchain operations.

**Use it when:** you need a terminal workflow, contract registration, or
scripted command execution and understand command-line security.

## Choose a network before using a wallet

Koinos mainnet and the public testnet use different chain IDs and contract
deployments. A familiar address format does not prove that the selected network
is correct.

Before approving a transaction:

1. confirm whether you are using mainnet or testnet;
2. verify the destination address and token;
3. review every operation the wallet displays; and
4. reject the request if the network or operation is unexpected.

Continue with [Mainnet vs Testnet](mainnet-vs-testnet.md) for current connection
details.
