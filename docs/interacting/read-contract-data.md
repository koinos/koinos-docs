# Read Data from a Contract

Learn how to query smart contract state and read data from contracts on the Koinos blockchain.

## Overview

Reading contract data is a fundamental operation when building applications on Koinos. Unlike transactions that modify state, reading data is free and doesn't require mana.

## Prerequisites

- Basic understanding of [Quick Start](quick-start.md)
- Node.js and Koilib installed

## Reading Contract State

### Basic Contract Read

```javascript
const { Provider, Contract } = require('koilib');

async function readContractData() {
  // Connect to Koinos
  const provider = new Provider('https://api.koinos.io');
  
  // Contract address and ABI
  const contractAddress = '1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS';
  
  // Create contract instance
  const contract = new Contract({
    id: contractAddress,
    provider: provider,
    abi: contractAbi // Your contract's ABI
  });
  
  try {
    // Call a read function
    const { result } = await contract.functions.getData({
      // function parameters
    });
    
    console.log('Contract data:', result);
  } catch (error) {
    console.error('Error reading contract:', error);
  }
}
```

## Common Read Operations

### Token Balance
```javascript
// Read token balance
const { result } = await tokenContract.functions.balanceOf({
  owner: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'
});
```

### Contract Metadata
```javascript
// Read contract metadata
const { result } = await contract.functions.name();
const name = result.value;
```

## Best Practices

1. **Cache results** when appropriate to reduce API calls
2. **Handle errors** gracefully for network issues
3. **Use appropriate data types** for contract parameters
4. **Validate results** before using in your application

## Next Steps

- [Submit a transaction](submit-transaction.md)
- [Work with multiple operations](multiple-operations.md)

