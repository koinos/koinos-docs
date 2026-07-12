# Mainnet vs Testnet

Understanding the different Koinos networks and how to connect to them.

## Networks Overview

### Mainnet
- **Purpose**: Production network with real value
- **KOIN**: Real cryptocurrency with market value
- **Use for**: Live applications and real transactions

### Testnet
- **Purpose**: Testing and development
- **KOIN**: Test tokens with no real value
- **Use for**: Development, testing, and experimentation

## Connecting to Networks

### Mainnet Connection
```javascript
import { Provider } from 'koilib';

const provider = new Provider('https://api.koinos.io');
```

### Testnet Connection
```javascript
import { Provider } from 'koilib';

const provider = new Provider('https://testnet.koinosfoundation.org');
```

### Network Configuration

| Setting | Mainnet | Testnet |
|---------|---------|---------|
| Chain ID | `EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA` | `EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==` |
| API Endpoint | `https://api.koinos.io` | `https://testnet.koinosfoundation.org` |
| RPC Endpoint | `https://api.koinos.io/jsonrpc` | `https://testnet.koinosfoundation.org/jsonrpc` |

## Getting Test Tokens

For testnet development, you can get free test KOIN from the faucet:

1. Open the [Koinos Testnet Faucet bot](https://t.me/KoinosTestnetFaucetBot) on Telegram.
2. Send `/faucet YOUR_KOINOS_ADDRESS`.
3. Receive test KOIN for development and testing.

## Best Practices

1. **Always test on testnet first**
2. **Use different wallets for mainnet and testnet**
3. **Verify network before transactions**
4. **Keep testnet and mainnet private keys separate**

## Next Steps

Learn about the [Tooling Overview](tooling-overview.md) to understand the development ecosystem.
