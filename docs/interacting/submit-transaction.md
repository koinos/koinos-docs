# Submit a Transaction

Learn how to create and submit transactions to the Koinos blockchain.

## Overview

Submitting transactions allows you to modify blockchain state, transfer tokens, and interact with smart contracts. Transactions on Koinos use mana instead of gas fees.

## Prerequisites

- Basic understanding of [Quick Start](quick-start.md)
- A wallet with KOIN tokens for mana
- Node.js and Koilib installed

## Basic Transaction

### Setup Signer

```javascript
const { Provider, Signer, Contract, utils } = require('koilib');

// Create provider and signer
const provider = new Provider('https://api.koinos.io');
const signer = Signer.fromPrivateKey('your-private-key');

// Set provider for signer
signer.provider = provider;
```

### Submit Transaction

```javascript
async function submitTransaction() {
  try {
    // Create contract instance
    const koin = new Contract({
      id: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
      provider: provider,
      signer: signer,
      abi: utils.tokenAbi
    });
    
    // Submit transaction
    const { transaction, receipt } = await koin.functions.transfer({
      from: signer.address,
      to: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe',
      value: utils.parseUnits('1', 8) // 1 KOIN
    });
    
    console.log('Transaction ID:', transaction.id);
    console.log('Receipt:', receipt);
    
    // Wait for confirmation
    await transaction.wait();
    console.log('Transaction confirmed!');
    
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}
```

## Transaction Options

### Custom Resource Limits

```javascript
const { transaction, receipt } = await contract.functions.myFunction(
  { /* parameters */ },
  {
    rcLimit: 100000000, // Custom RC limit
    sendTransaction: true
  }
);
```

### Dry Run (Simulation)

```javascript
// Test transaction without submitting
const { transaction, receipt } = await contract.functions.transfer(
  { /* parameters */ },
  {
    sendTransaction: false // Only simulate
  }
);

console.log('Estimated RC usage:', receipt.rc_used);
```

## Error Handling

```javascript
try {
  const { transaction, receipt } = await contract.functions.transfer(params);
  
  if (receipt.reverted) {
    console.error('Transaction reverted:', receipt.logs);
    return;
  }
  
  await transaction.wait();
} catch (error) {
  if (error.message.includes('insufficient mana')) {
    console.error('Not enough mana for transaction');
  } else if (error.message.includes('insufficient balance')) {
    console.error('Not enough tokens for transfer');
  } else {
    console.error('Transaction error:', error);
  }
}
```

## Best Practices

1. **Always handle errors** and check for reverted transactions
2. **Use dry runs** to estimate costs before submitting
3. **Wait for confirmation** for important transactions
4. **Set appropriate RC limits** to avoid failures
5. **Keep private keys secure** and never expose them

## Next Steps

- [Submit multiple operations](multiple-operations.md)
- [Work with Kondor wallet](kondor-wallet.md)

