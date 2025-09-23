# Testnet Development

Learn how to use the Koinos testnet (Harbinger) for development and testing.

## Overview

The Koinos testnet, called "Harbinger," is a testing environment that mirrors mainnet functionality but uses test tokens with no real value. It's perfect for development, testing, and experimentation.

## Network Configuration

### Testnet Details

| Setting | Value |
|---------|-------|
| Network Name | Harbinger (Testnet) |
| Chain ID | `EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ` |
| API Endpoint | `https://harbinger-api.koinos.io` |
| RPC Endpoint | `https://harbinger-api.koinos.io` |
| Explorer | [Harbinger Explorer](https://harbinger.koinosblocks.com) |

### Connecting to Testnet

#### Using Koilib

```javascript
const { Provider } = require('koilib');

// Connect to testnet
const provider = new Provider('https://harbinger-api.koinos.io');
```

#### Using Kondor Wallet

1. Open Kondor wallet
2. Click on network selector (usually shows "Mainnet")
3. Select "Harbinger" or "Testnet"
4. Confirm network switch

## Getting Test Tokens

### Testnet Faucet

Get free test KOIN from the faucet:

1. **Visit the faucet**: [https://faucet.koinos.io](https://faucet.koinos.io)
2. **Enter your testnet address**
3. **Complete the captcha**
4. **Receive test KOIN** (usually 100 KOIN)

### Using the Faucet Programmatically

```javascript
const axios = require('axios');

async function requestTestTokens(address) {
  try {
    const response = await axios.post('https://faucet.koinos.io/api/faucet', {
      address: address,
      captcha_token: 'your-captcha-token' // If required
    });
    
    console.log('Faucet response:', response.data);
  } catch (error) {
    console.error('Faucet request failed:', error);
  }
}
```

## Development Setup

### Basic Testnet Setup

```javascript
const { Provider, Signer, Contract, utils } = require('koilib');

// Testnet configuration
const TESTNET_CONFIG = {
  endpoint: 'https://harbinger-api.koinos.io',
  chainId: 'EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ',
  koinContract: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL'
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
    endpoint: 'https://harbinger-api.koinos.io',
    chainId: 'EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ'
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
    provider = new Provider('https://harbinger-api.koinos.io');
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
    // 1. Get test tokens from faucet
    await requestTestTokens(testAddress);
    
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
  const provider = new Provider('https://harbinger-api.koinos.io');
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
  const provider = new Provider('https://harbinger-api.koinos.io');
  
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

- **[Harbinger Explorer](https://harbinger.koinosblocks.com)**: View transactions and blocks
- **[Koiner Testnet](https://harbinger.koiner.app)**: Advanced blockchain explorer
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
**Network mismatch**: Ensure you're connected to Harbinger testnet
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

