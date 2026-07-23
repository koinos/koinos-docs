# Mainnet vs Testnet

Mainnet and testnet run the same Koinos protocol concepts, but they are separate
networks with different chain state, contract deployments, and economic
meaning.

## Choose the correct network

| | Mainnet | Public testnet |
| --- | --- | --- |
| Purpose | Production applications and assets | Development and testing |
| Token value | KOIN can have real value | Test tokens have no monetary value |
| State | Intended to persist | Can be reset |
| JSON-RPC | `https://api.koinos.io/` | `https://testnet.koinosfoundation.org/jsonrpc` |
| REST | `https://api.koinos.io/v1/...` | `https://testnet.koinosfoundation.org/v1/...` |
| Health check | Endpoint-specific | `https://testnet.koinosfoundation.org/health` |

!!! warning "Testnet is resettable"

    Do not use the public testnet for production funds, production state, or
    long-term persistence assumptions. A reset can change the state, deployed
    contracts, and chain ID.

## Connect with Koilib

Both examples require Node.js 20+ and Koilib 9.2.0. They make read-only requests
and print the live chain ID and head height.

### Mainnet

<!-- example: getting-started-connect-mainnet -->
```javascript title="index.js"
--8<-- "examples/javascript/getting-started/network-provider/index.js:mainnet"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/javascript/getting-started/network-provider/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/dev/examples/javascript/getting-started/network-provider?startScript=start)

### Public testnet

<!-- example: getting-started-connect-testnet -->
```javascript title="index.js"
--8<-- "examples/javascript/getting-started/network-provider/index.js:testnet"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/javascript/getting-started/network-provider/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/dev/examples/javascript/getting-started/network-provider?startScript=testnet)

Koilib sends JSON-RPC requests directly to the URL supplied to `Provider`.
The testnet root, `https://testnet.koinosfoundation.org/`, is retained as a
JSON-RPC compatibility endpoint, but `/jsonrpc` is the canonical explicit path.

## Confirm the testnet is available

Check the public health endpoint:

```bash
curl -sS https://testnet.koinosfoundation.org/health
```

Expected response:

```text
ok
```

Read the current chain head:

```bash
curl -sS https://testnet.koinosfoundation.org/jsonrpc \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"chain.get_head_info","params":{}}'
```

## Retrieve the current chain ID

Always retrieve the current testnet chain ID before constructing or signing a
transaction:

```bash
curl -sS https://testnet.koinosfoundation.org/jsonrpc \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"chain.get_chain_id","params":{}}'
```

Do not copy an old testnet chain ID into a long-lived configuration. The current
value is returned in `result.chain_id`.

For comparison, Koinos mainnet has a persistent chain ID:

```text
EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==
```

## REST endpoints

The public testnet exposes:

```text
https://testnet.koinosfoundation.org/v1/...
```

The compatibility path below is also available:

```text
https://testnet.koinosfoundation.org/rest/...
```

Use a documented REST route in place of `...`. For raw Koinos service methods,
use JSON-RPC.

## Get test tokens

The current public faucet is the
[Koinos Testnet Faucet Bot](https://t.me/KoinosTestnetFaucetBot) on Telegram.

Send:

```text
/faucet YOUR_KOINOS_ADDRESS
```

Check the faucet's available balance with:

```text
/balance
```

The faucet documentation describes its allocation as **vKOIN**. These are
valueless testnet tokens and must not be confused with wrapped vKOIN assets on
other blockchains.

Faucet limits can change. Follow the bot's response and the
[public testnet repository](https://github.com/koinos/koinos-testnet) for the
current policy.

## Network safety

- Keep mainnet funds and testnet experiments in separate wallets.
- Verify the active network in the wallet before every approval.
- Retrieve the current chain ID instead of trusting a saved testnet value.
- Expect testnet contracts and balances to change after a reset.
- Never send mainnet KOIN to a faucet or to an address supplied by an
  unsolicited support account.

## Source of truth

Current public endpoints, faucet information, chain details, and operational
status are maintained in
[koinos/koinos-testnet](https://github.com/koinos/koinos-testnet).

Continue with the [Tooling Overview](tooling-overview.md).
