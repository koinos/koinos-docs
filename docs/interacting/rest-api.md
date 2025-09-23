# REST API

Learn how to interact with Koinos using the REST API for HTTP-based blockchain access.

## Overview

The Koinos REST API provides HTTP endpoints for blockchain interaction, making it easy to integrate with web applications and services that prefer REST over JSON-RPC.

## Base URL

```
Mainnet: https://api.koinos.io
Testnet: https://harbinger-api.koinos.io
```

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
  "contract_id": "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
  "entry_point": 0x82a3537ff,
  "args": "base64-encoded-args"
}
```

## Example Usage

### JavaScript/Node.js

```javascript
const axios = require('axios');

const API_BASE = 'https://api.koinos.io';

async function getHeadInfo() {
  try {
    const response = await axios.get(`${API_BASE}/v1/chain/head_info`);
    console.log('Head block:', response.data);
  } catch (error) {
    console.error('API Error:', error.response.data);
  }
}

async function getAccountBalance(address) {
  try {
    const response = await axios.post(`${API_BASE}/v1/chain/read_contract`, {
      contract_id: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
      entry_point: 0x82a3537ff, // balanceOf function
      args: btoa(address) // base64 encode address
    });
    
    console.log('Balance:', response.data);
  } catch (error) {
    console.error('Balance query failed:', error);
  }
}
```

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
    "contract_id": "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
    "entry_point": 2186741247,
    "args": "base64-encoded-arguments"
  }'
```

## Error Handling

```javascript
async function handleAPICall() {
  try {
    const response = await axios.get(`${API_BASE}/v1/chain/head_info`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    throw error;
  }
}
```

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

