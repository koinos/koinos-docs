# REST API

Learn how to interact with Koinos using standard HTTP requests.

## Overview

The Koinos REST API provides HTTP endpoints for querying blockchain data, preparing transactions, submitting signed transactions, and interacting with smart contracts. It is useful for web applications, services, exchanges, and backends that prefer REST over direct JSON-RPC calls.

## Base URL

```text
Mainnet: https://api.koinos.io
Testnet: https://harbinger-api.koinos.io
```

The live Swagger documentation is available at:

```text
https://api.koinos.io/swagger
```

## Common Endpoints

### Chain Information

```bash
# Get current head block information
curl https://api.koinos.io/v1/chain/head_info
```

### Transactions

The REST API can help prepare and submit transactions, but applications are still responsible for safely managing accounts and signatures.

```bash
# Prepare a transaction
curl -X POST https://api.koinos.io/v1/transaction/prepare \
  -H "Content-Type: application/json" \
  -d '{
    "header": {
      "rc_limit": "200000000",
      "payer": "17CmTGbriMyCypF6WdTRJGhzur3SoJXAG5"
    },
    "operations": []
  }'
```

If the transaction is already built and signed, it can be submitted over HTTP to `/v1/transaction/submit`. If an application needs to create and sign Koinos transactions itself, it should use a Koinos-compatible signing library or service before calling the submit endpoint.

### JSON-RPC Access

For lower-level access, the public API also exposes JSON-RPC:

```bash
curl -X POST https://api.koinos.io/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "chain.get_head_info",
    "params": {},
    "id": 1
  }'
```

## Example Usage

### JavaScript / Node.js

```javascript
const API_BASE = "https://api.koinos.io";

async function getHeadInfo() {
  const response = await fetch(`${API_BASE}/v1/chain/head_info`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
```

### Python

```python
import requests

API_BASE = "https://api.koinos.io"

def get_head_info():
    response = requests.get(f"{API_BASE}/v1/chain/head_info")
    response.raise_for_status()
    return response.json()
```

PHP backends can call the same HTTP endpoints with their preferred HTTP client. They can submit signed transactions with normal HTTP requests, but building and signing transactions requires Koinos-compatible transaction serialization and signing before submission.

## Error Handling

REST endpoints return JSON responses for validation and execution errors. For example, submitting an empty transaction body to `/v1/transaction/submit` returns a validation error because the endpoint expects a prepared transaction object.

Applications should:

1. Check HTTP status codes.
2. Parse JSON error bodies.
3. Retry transient network errors with backoff.
4. Use testnet for development before submitting transactions on mainnet.

## Best Practices

1. Use `GET` for read endpoints and `POST` for transaction, contract, and decode endpoints.
2. Keep private keys out of public clients and logs.
3. Sign transactions with a Koinos-compatible wallet, SDK, or signing service.
4. Use the Swagger documentation to confirm request and response shapes.
5. Cache responses when data does not need to be live.

## Next Steps

- [Work with Kondor wallet](kondor-wallet.md)
- [Explore testnet](testnet.md)
