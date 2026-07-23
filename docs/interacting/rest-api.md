# REST API

Learn how to interact with Koinos using the REST API for HTTP-based blockchain access.

## Overview

The Koinos REST API provides HTTP endpoints for blockchain interaction, making it easy to integrate with web applications and services that prefer REST over JSON-RPC.

## Base URL

```
Mainnet: https://api.koinos.io
Testnet: https://testnet.koinosfoundation.org/jsonrpc
```

The mainnet host exposes both REST routes and JSON-RPC. The current public
testnet endpoint is JSON-RPC.

## Common Endpoints

### Chain Information

```bash
# Get head block info
GET /v1/chain/head_info

# Get block by height
GET /v1/chain/get_block?height=12345

# Get block by ID
GET /v1/chain/get_block?id=0x1220...
```

### Account Information

```bash
# Get account balance
GET /v1/chain/get_account_nonce?account=1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe

# Get account RC (mana)
GET /v1/chain/get_account_rc?account=1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe
```

### Contract Calls

```bash
# Read contract (GET)
POST /v1/chain/read_contract
Content-Type: application/json

{
  "contract_id": "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK",
  "entry_point": 0x82a3537ff,
  "args": "base64-encoded-args"
}
```

## Example Usage

### JavaScript/Node.js

<!-- example: interacting-rest-head-info -->
```javascript
--8<-- "examples/javascript/interacting/read-only-queries/index.js:head-info"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/interacting/read-only-queries/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/interacting/read-only-queries)

### Python

```python
import requests
import base64

API_BASE = 'https://api.koinos.io'

def get_head_info():
    response = requests.get(f'{API_BASE}/v1/chain/head_info')
    return response.json()

def get_account_rc(account):
    response = requests.get(
        f'{API_BASE}/v1/chain/get_account_rc',
        params={'account': account}
    )
    return response.json()
```

### cURL

```bash
# Get head block
curl -X GET "https://api.koinos.io/v1/chain/head_info"

# Get account RC
curl -X GET "https://api.koinos.io/v1/chain/get_account_rc?account=1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe"

# Read contract
curl -X POST "https://api.koinos.io/v1/chain/read_contract" \
  -H "Content-Type: application/json" \
  -d '{
    "contract_id": "19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK",
    "entry_point": 2186741247,
    "args": "base64-encoded-arguments"
  }'
```

## Error Handling

<!-- example: interacting-rest-retry -->
```javascript
--8<-- "examples/javascript/interacting/read-only-queries/index.js:error-handling"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/interacting/read-only-queries/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/interacting/read-only-queries)

The bounded retry handles short network interruptions. Persistent API errors
still fail with their original message.

## Rate Limiting

Most public endpoints have rate limits:
- Respect rate limit headers in responses
- Implement exponential backoff for retries
- Consider caching responses when appropriate

## Best Practices

1. **Use appropriate HTTP methods** (GET for reads, POST for writes)
2. **Handle errors gracefully** with proper error codes
3. **Implement retries** with exponential backoff
4. **Cache responses** when data doesn't change frequently
5. **Use testnet** for development and testing

## Limitations

- REST API may not support all JSON-RPC methods
- Some operations may require JSON-RPC for full functionality
- Transaction submission typically requires JSON-RPC

## Next Steps

- [Work with Kondor wallet](kondor-wallet.md)
- [Explore testnet](testnet.md)
