---
icon: fontawesome/solid/server
hide:
  - toc
---

# REST API

The Koinos REST API exposes HTTP endpoints for reading blockchain data,
interacting with contracts, preparing transactions, and submitting signed
transactions.

## Public endpoints

| Network | REST base | Interactive reference |
| --- | --- | --- |
| Mainnet | `https://api.koinos.io/v1/...` | [Mainnet Swagger UI](https://api.koinos.io/swagger) |
| Public testnet | `https://testnet.koinosfoundation.org/v1/...` | Use the same route structure |

Use JSON-RPC for raw Koinos service methods:

- mainnet: `https://api.koinos.io/jsonrpc`
- public testnet: `https://testnet.koinosfoundation.org/jsonrpc`

## Read chain data

Read the current mainnet head:

```bash
curl -sS https://api.koinos.io/v1/chain/head_info
```

The equivalent public-testnet route is:

```text
https://testnet.koinosfoundation.org/v1/chain/head_info
```

## Prepare and submit transactions

The prepare endpoint can populate transaction header fields. This request
prepares an empty example transaction but does not sign or broadcast it:

```bash
curl -sS https://api.koinos.io/v1/transaction/prepare \
  -H 'content-type: application/json' \
  --data '{
    "header": {
      "rc_limit": "200000000",
      "payer": "17CmTGbriMyCypF6WdTRJGhzur3SoJXAG5"
    },
    "operations": []
  }'
```

Submitting to `/v1/transaction/submit` requires a prepared transaction with the
necessary signatures. Applications remain responsible for protecting keys,
reviewing operations, and signing with a Koinos-compatible wallet, SDK, or
signing service.

See the [REST interaction guide](../interacting/rest-api.md) for executable
examples, error handling, and retry guidance.

---

<swagger-ui src="./swagger.json">
