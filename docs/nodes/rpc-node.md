# Configure Node as RPC Node

Configure your Koinos node to serve as an RPC endpoint for applications and services.

## What is an RPC Node?

An RPC node provides API access to the Koinos blockchain for external applications. It serves JSON-RPC and gRPC requests, allowing developers to:

- Query blockchain data
- Submit transactions
- Read smart contract state
- Access account information
- Retrieve block and transaction history

## Prerequisites

- A running Koinos node (see [Running a Node](running-node.md))
- Understanding of [Docker Compose profiles](docker-profiles.md)

## Configuration

### 1. Enable API Services

Edit your `.env` file to enable the API profile:

```bash
# Enable API services for RPC functionality
COMPOSE_PROFILES=api
```

The `api` profile includes:
- `jsonrpc` - JSON-RPC API endpoint
- `grpc` - gRPC API endpoint  
- `transaction_store` - Transaction history
- `contract_meta_store` - Contract ABI data
- `account_history` - Account transaction history

### 2. Configure Network Binding

By default, API services bind to localhost only. For a public RPC node, you may need to expose ports:

```bash
# JSON-RPC configuration
JSONRPC_INTERFACE=0.0.0.0  # Bind to all interfaces (use with caution)
JSONRPC_PORT=8080

# gRPC configuration  
GRPC_INTERFACE=0.0.0.0     # Bind to all interfaces (use with caution)
GRPC_PORT=8090
```

!!! warning "Security Warning"
    Only bind to `0.0.0.0` if you intend to run a public RPC node. For private use, keep the default `127.0.0.1` binding and use a reverse proxy or VPN for external access.

### 3. Resource Configuration

RPC nodes require additional resources for API services:

```yaml
# In config/config.yml
global:
  jobs: 8  # Increase worker threads for API load
  
chain:
  read-compute-bandwidth-limit: 100000000  # Increase read limits for API calls
```

### 4. API Blacklist (Security)

Ensure critical APIs remain blacklisted in your configuration:

```yaml
# In config/config.yml
jsonrpc:
  blacklist:
    - block_store.add_block
    - chain.propose_block
```

## Starting the RPC Node

1. **Restart with API profile:**
```bash
docker compose --profile api up -d
```

2. **Verify services are running:**
```bash
docker compose ps
```

You should see additional services running:
- `jsonrpc`
- `grpc` 
- `transaction_store`
- `contract_meta_store`
- `account_history`

## Testing Your RPC Node

### JSON-RPC Test

Test the JSON-RPC endpoint:

```bash
curl -X POST http://localhost:8080 \
  -H "Content-Type: application/json" \
  -d '{
    "method": "chain.get_head_info",
    "params": {},
    "id": 1
  }'
```

Expected response:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "head_topology": {
      "id": "0x1220...",
      "height": "8062397",
      "previous": "0x1220..."
    }
  },
  "id": 1
}
```

### gRPC Test

Test gRPC endpoint (requires grpcurl):

```bash
grpcurl -plaintext localhost:8090 koinos.rpc.chain.chain_rpc/get_head_info
```

## Performance Considerations

### Hardware Requirements

RPC nodes require additional resources:
- **CPU**: 8+ cores recommended
- **RAM**: 16+ GB for API services
- **Storage**: Additional space for transaction/account history
- **Network**: Higher bandwidth for serving requests

### Monitoring

Monitor your RPC node performance:

```bash
# Check API response times
docker compose logs jsonrpc | grep "response time"

# Monitor resource usage
docker stats

# Check request volume
docker compose logs jsonrpc | grep "requests per second"
```

## Public RPC Node Setup

If running a public RPC node:

### 1. Reverse Proxy

Use nginx or similar for SSL and rate limiting:

```nginx
server {
    listen 443 ssl;
    server_name your-rpc-domain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Rate limiting
        limit_req zone=api burst=100 nodelay;
    }
}
```

### 2. Firewall Configuration

```bash
# Allow only necessary ports
ufw allow 443/tcp  # HTTPS
ufw allow 22/tcp   # SSH
ufw deny 8080/tcp  # Block direct RPC access
```

### 3. Monitoring and Alerting

Set up monitoring for:
- API response times
- Request volume
- Error rates
- Resource utilization

## Troubleshooting

**High Memory Usage**: Increase swap or RAM for API services
**Slow Responses**: Check if node is fully synced
**Connection Refused**: Verify ports and firewall settings
**Missing Data**: Ensure all API profile services are running

## Next Steps

- [Node Security](security.md) - Secure your RPC node
- [Node Management](management.md) - Ongoing maintenance
- [Configuration](configuration.md) - Advanced configuration options
