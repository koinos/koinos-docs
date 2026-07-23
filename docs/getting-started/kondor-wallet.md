# Kondor Wallet

Kondor 2 is a self-custody wallet for Koinos distributed as a Chrome extension.
It can create or import wallets, display Koinos assets and Mana, request
transaction approval, connect selected accounts to dApps, and create encrypted
backups.

Use the [official Kondor documentation](https://kondorwallet.com/docs/) as the
source of truth for the current interface.

## Install Kondor

1. Open the
   [Kondor Wallet listing](https://chromewebstore.google.com/detail/kondor-wallet/hfcdnighclikmdfkdcecohgnfdglpdmp)
   in the Chrome Web Store.
2. Check that the extension ID is
   `hfcdnighclikmdfkdcecohgnfdglpdmp`.
3. Install the extension and optionally pin it to the Chrome toolbar.
4. Open Kondor from the toolbar or Chrome side panel.

!!! warning "Avoid outdated listings"

    Older documentation pointed to the original Kondor extension and to a
    Firefox add-on. The current Kondor 2 documentation describes a Chrome
    extension. Install only from the current official site or the listing above.

## Create a new wallet

On first run, choose the option to create a new wallet:

1. let Kondor generate a recovery phrase;
2. write the phrase down and store it offline;
3. complete Kondor's recovery-phrase confirmation; and
4. create a PIN for this installation.

The PIN protects and confirms actions on the current device. It is not a
replacement for the recovery phrase.

## Import or restore

Kondor documents three import paths:

- a recovery phrase;
- an encrypted Kondor JSON backup; or
- a private key for an individual account.

Enter secret material only in the verified Kondor extension. A website or dApp
does not need your recovery phrase or private key to connect to the wallet.

## Send and receive

To receive assets, share the address or QR code shown by Kondor. Send only
Koinos-network assets to a Koinos address.

Before sending:

1. choose the intended network;
2. select the token and enter the recipient;
3. review the amount, recipient, network, and displayed operations; and
4. approve with the PIN only when every detail is correct.

Kondor can display Koinos Mana. Mana regenerates, but a transaction can still
fail if the account or payer lacks sufficient resources or if a contract
rejects the operation.

## Mainnet and testnet

Kondor displays the active network. Mainnet operations can affect assets with
real value; testnet operations use resettable state and valueless test tokens.

Use the current [public testnet details](mainnet-vs-testnet.md) when checking a
testnet endpoint or faucet. Never assume that a saved testnet chain ID is still
current after a reset.

## Connect to a dApp

Connecting a dApp and signing a transaction are separate approvals:

- share only the accounts you intend to expose to the site;
- confirm the requesting origin;
- inspect each signing or transaction request; and
- revoke remembered connections that you no longer use.

For application integration, follow the current
[Kondor documentation](https://kondorwallet.com/docs/#connecting-to-dapps) and
the maintained [Kondor source repository](https://github.com/joticajulian/kondor)
instead of copying legacy `window.kondor` examples without verification.

## Backup and recovery

Kondor can export an encrypted JSON backup. Keep the backup and its PIN in
appropriately protected locations. Also keep the recovery phrase offline.

Kondor is non-custodial and does not provide server-side recovery. If every
usable recovery method is lost, the wallet developer cannot restore the funds.

## Troubleshooting

- **The extension looks different from this page:** consult the official
  documentation, which is updated independently of this site.
- **The dApp does not connect:** confirm that Kondor is unlocked, review the
  site's connection request, and reload the dApp after approval.
- **A transaction fails:** verify the network, recipient, contract, balance, and
  available Mana. A wallet cannot guarantee contract execution.
- **The displayed network is unexpected:** reject the request and switch to the
  intended network before trying again.

## Next steps

- [Accounts, Keys, and Wallets](accounts-keys-wallets.md)
- [Mainnet vs Testnet](mainnet-vs-testnet.md)
- [Tooling Overview](tooling-overview.md)
