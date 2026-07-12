# Testnet Development

Learn how to use the Koinos testnet for development and testing.

## Overview

The Koinos testnet is a testing environment that mirrors mainnet functionality but uses test tokens with no real value. It's perfect for development, testing, and experimentation.

## Network Configuration

### Testnet Details

| Setting | Value |
|---------|-------|
| Network Name | Koinos Foundation testnet |
| Chain ID | `EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==` |
| API Endpoint | `https://testnet.koinosfoundation.org` |
| RPC Endpoint | `https://testnet.koinosfoundation.org/jsonrpc` |
| Health | `https://testnet.koinosfoundation.org/health` |

### Connecting to Testnet

#### Using Koilib

```javascript
const { Provider } = require('koilib');

// Connect to testnet
const provider = new Provider('https://testnet.koinosfoundation.org');
```

#### Using Kondor Wallet

1. Open Kondor wallet
2. Click on network selector (usually shows "Mainnet")
3. Select the testnet network
4. Confirm network switch

## Getting Test Tokens

### Testnet Faucet

Get free test KOIN from the faucet:

1. **Open the faucet bot**: [https://t.me/KoinosTestnetFaucetBot](https://t.me/KoinosTestnetFaucetBot)
2. **Send** `/faucet YOUR_KOINOS_ADDRESS`
3. **Receive test KOIN** for development and testing

## Development Setup

### Basic Testnet Setup

```javascript
const { Provider, Signer, Contract, utils } = require('koilib');

// Testnet configuration
const TESTNET_CONFIG = {
  endpoint: 'https://testnet.koinosfoundation.org',
  chainId: 'EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ==',
  koinContract: '1FaSvLjQJsCJKq5ybmGsMMQs8RQYyVv8ju'
};

async function setupTestnet() {
  // Create provider
  const provider = new Provider(TESTNET_CONFIG.endpoint);
  
  // Create signer (use test private key)
  const signer = Signer.fromPrivateKey('your-test-private-key');
  signer.provider = provider;
  
  // Create KOIN contract instance
  const koin = new Contract({
    id: TESTNET_CONFIG.koinContract,
    provider: provider,
    signer: signer,
    abi: utils.tokenAbi
  });
  
  return { provider, signer, koin };
}
```

### Environment Configuration

```javascript
// config.js
const config = {
  development: {
    network: 'testnet',
    endpoint: 'https://testnet.koinosfoundation.org',
    chainId: 'EiAIKVvm6-V2qmsmUvPJy09vCCLbtn9lHFpwrJbcTIEWRQ=='
  },
  production: {
    network: 'mainnet',
    endpoint: 'https://api.koinos.io',
    chainId: 'EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA'
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
```

## Testing Strategies

### Unit Testing

```javascript
// test/contract.test.js
const { Provider, Signer, Contract } = require('koilib');

describe('Contract Tests', () => {
  let provider, signer, contract;
  
  beforeAll(async () => {
    // Use testnet for all tests
    provider = new Provider('https://testnet.koinosfoundation.org');
    signer = Signer.fromPrivateKey(process.env.TEST_PRIVATE_KEY);
    signer.provider = provider;
    
    contract = new Contract({
      id: 'your-test-contract-address',
      provider,
      signer,
      abi: contractAbi
    });
  });
  
  test('should read contract data', async () => {
    const { result } = await contract.functions.getData();
    expect(result).toBeDefined();
  });
  
  test('should update contract state', async () => {
    const { transaction, receipt } = await contract.functions.updateData({
      newValue: 'test-value'
    });
    
    expect(receipt.reverted).toBe(false);
    await transaction.wait();
  });
});
```

### Integration Testing

```javascript
// test/integration.test.js
describe('Integration Tests', () => {
  test('complete user flow', async () => {
    // 1. Get test tokens from the faucet bot
    // https://t.me/KoinosTestnetFaucetBot
    
    // 2. Deploy test contract
    const contract = await deployTestContract();
    
    // 3. Interact with contract
    const result = await contract.functions.testFunction();
    
    // 4. Verify results
    expect(result.success).toBe(true);
  });
});
```

## Contract Deployment

### Deploy to Testnet

```javascript
async function deployToTestnet() {
  const provider = new Provider('https://testnet.koinosfoundation.org');
  const signer = Signer.fromPrivateKey(process.env.TESTNET_PRIVATE_KEY);
  signer.provider = provider;
  
  // Deploy contract
  const contract = new Contract({
    signer,
    provider,
    bytecode: contractBytecode,
    abi: contractAbi
  });
  
  const { transaction, receipt } = await contract.deploy();
  
  console.log('Contract deployed to testnet:', contract.getId());
  await transaction.wait();
  
  return contract;
}
```

## Debugging and Monitoring

### Transaction Debugging

```javascript
async function debugTransaction(txId) {
  const provider = new Provider('https://testnet.koinosfoundation.org');
  
  try {
    const transaction = await provider.getTransaction(txId);
    const receipt = await provider.getTransactionReceipt(txId);
    
    console.log('Transaction:', transaction);
    console.log('Receipt:', receipt);
    
    if (receipt.reverted) {
      console.log('Transaction reverted:', receipt.logs);
    }
  } catch (error) {
    console.error('Debug failed:', error);
  }
}
```

### Monitoring Tools

- **Public health endpoint**: [https://testnet.koinosfoundation.org/health](https://testnet.koinosfoundation.org/health)
- **Logs**: Monitor contract logs and events

## Best Practices

1. **Always test on testnet first** before mainnet deployment
2. **Use separate wallets** for testnet and mainnet
3. **Keep testnet private keys separate** from mainnet keys
4. **Test edge cases** and error conditions
5. **Verify contract behavior** thoroughly before mainnet deployment
6. **Use version control** for contract deployments
7. **Document test procedures** for reproducibility

## Common Issues

**Insufficient test tokens**: Use the faucet to get more KOIN
**Network mismatch**: Ensure you're connected to the Koinos Foundation testnet
**Contract not found**: Verify contract address on testnet
**Transaction failures**: Check testnet block explorer for details

## Testnet vs Mainnet Differences

| Aspect | Testnet | Mainnet |
|--------|---------|---------|
| Tokens | No value | Real value |
| Speed | Similar | Similar |
| Fees | Free (test KOIN) | Real KOIN |
| Stability | May reset | Permanent |
| Data | Test data | Production data |

## Next Steps

- [Learn about common tasks](../exchanges/head-block.md)
- [Explore frontend tutorials](tutorials/frontend-guide.md)
