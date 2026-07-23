---
icon: fontawesome/solid/network-wired
---

# Public Testnet

The Koinos Foundation maintains a public testnet for application and contract
development. Its tokens have no monetary value, and its chain state, deployed
contracts, and chain ID can change after a reset.

!!! warning "Do not treat testnet state as permanent"

    Keep mainnet funds and production state away from the public testnet.
    Retrieve the current chain ID before constructing or signing a transaction.

## Current connection details

| Service | URL |
| --- | --- |
| JSON-RPC | `https://testnet.koinosfoundation.org/jsonrpc` |
| JSON-RPC compatibility root | `https://testnet.koinosfoundation.org/` |
| REST | `https://testnet.koinosfoundation.org/v1/...` |
| REST compatibility path | `https://testnet.koinosfoundation.org/rest/...` |
| Health | `https://testnet.koinosfoundation.org/health` |
| Faucet | [KoinosTestnetFaucetBot](https://t.me/KoinosTestnetFaucetBot) |

The operational source of truth is
[koinos/koinos-testnet](https://github.com/koinos/koinos-testnet).

## Check availability

```bash
curl -sS https://testnet.koinosfoundation.org/health
```

The expected healthy response is:

```text
ok
```

## Retrieve the current chain ID

```bash
curl -sS https://testnet.koinosfoundation.org/jsonrpc \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"chain.get_chain_id","params":{}}'
```

Use the value returned in `result.chain_id`. Do not copy a testnet chain ID into
a long-lived configuration because it can change after a reset.

## Get test tokens

Open the [Telegram faucet](https://t.me/KoinosTestnetFaucetBot) and send:

```text
/faucet YOUR_KOINOS_ADDRESS
```

Check the faucet's available balance with:

```text
/balance
```

The faucet currently distributes valueless **vKOIN**. Allocation sizes,
cooldowns, and daily limits can change, so follow the bot response and the
public testnet repository instead of relying on values copied into an
application.

## Recommended development workflow

1. Use a wallet reserved for testnet development.
2. Confirm the health endpoint responds.
3. Retrieve the current chain ID.
4. Request vKOIN for the wallet's public address.
5. Connect clients to the explicit `/jsonrpc` endpoint.
6. Expect balances and contracts to change after a reset.

For runnable examples, continue with
[Testnet Development](../interacting/testnet.md). For the network comparison
and safety checklist, see
[Mainnet vs Testnet](../getting-started/mainnet-vs-testnet.md).
