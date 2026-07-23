---
hide:
  - toc
---

# Getting Started

This section introduces Koinos, the networks and accounts you will use, and the
main tools available to users and developers.

## Choose a starting point

<div class="grid cards" markdown>

-   :fontawesome-solid-book-open:{ .lg .middle } __Learn the basics__

    ---

    1. [What is Koinos?](what-is-koinos.md)
    2. [Accounts, keys, and wallets](accounts-keys-wallets.md)
    3. [Mainnet vs testnet](mainnet-vs-testnet.md)

-   :fontawesome-solid-wallet:{ .lg .middle } __Set up a wallet__

    ---

    1. Review the [key-safety guidance](accounts-keys-wallets.md#protect-your-keys)
    2. Set up [Kondor](kondor-wallet.md) or the [Koinos CLI](cli-wallet.md)
    3. Confirm the selected network before signing

-   :fontawesome-solid-code:{ .lg .middle } __Start developing__

    ---

    1. Review the [tooling overview](tooling-overview.md)
    2. Connect to [mainnet or testnet](mainnet-vs-testnet.md)
    3. Continue to [Interacting with Koinos](../interacting/index.md) or
       [Smart Contract Development](../contracts/index.md)

</div>

## Read a KOIN balance

The following Node.js 18+ example reads a balance from the Koinos mainnet REST
API. It does not create a wallet, request a private key, or submit a
transaction.

Create `index.js`:

```javascript
const address = process.argv[2];
const koinContract = "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK";

if (!address) {
  throw new Error("Usage: node index.js YOUR_KOINOS_ADDRESS");
}

async function main() {
  const url =
    `https://api.koinos.io/v1/account/${encodeURIComponent(address)}` +
    `/balance/${koinContract}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Koinos REST API returned HTTP ${response.status}`);
  }

  const { value } = await response.json();
  console.log(`${value} KOIN`);
}

main().catch(console.error);
```

Run it with a valid **public address**:

```bash
node index.js YOUR_KOINOS_ADDRESS
```

!!! warning "Never paste a private key into this example"

    Reading a balance requires only a public address. A private key or recovery
    phrase is not needed and must never be shared with a website, tutorial, or
    support account.

### What the example does

- Node's `fetch` function calls the Koinos REST API.
- The URL identifies both the public account and the mainnet KOIN contract.
- The REST response returns the balance as a decimal string, so the example
  does not introduce floating-point rounding.

The current mainnet KOIN contract can also be checked through the
[Koinos REST API](https://api.koinos.io/v1/token/19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK/info).

## Core concepts

| Concept | What it means |
| --- | --- |
| KOIN | The native token of Koinos |
| Mana | A regenerating resource used instead of a per-transaction fee |
| Account | An on-chain identity identified by a Koinos address |
| Wallet | Software that stores or accesses keys and requests signatures |
| Mainnet | The production network where assets can have real value |
| Testnet | A resettable network for development and testing |
| Smart contract | WebAssembly code executed by the Koinos virtual machine |

## Official entry points

- [Koinos website](https://koinos.io/)
- [Koinos repositories](https://github.com/koinos)
- [Public testnet operations](https://github.com/koinos/koinos-testnet)
- [Koinos community Telegram](https://telegram.koinos.io/)
- [Koinos community Discord](https://discord.koinos.io/)

## Next step

If Koinos is new to you, continue with [What is Koinos?](what-is-koinos.md).
If you are ready to configure a development environment, open the
[Tooling Overview](tooling-overview.md).
