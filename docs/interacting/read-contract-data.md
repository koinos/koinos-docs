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
async function readContractData() {
  // Connect to Koinos
  const provider = new Provider('https://api.koinos.io');
  
  // Contract address and ABI
  const contractAddress = '1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz';
  
  // Create contract instance
  const contract = new Contract({
    id: contractAddress,
    provider,
    abi: utils.nicknamesAbi // contract's ABI
  });
  
  try {
    // Call a read function
    const { result } = await contract.functions.get_address({
      // function parameters
      value: "jgapool"
    });
    
    console.log('Contract data:', result);
  } catch (error) {
    console.error('Error reading contract:', error);
  }
}
```

## Working Without a Local ABI

### Fetching ABI from the Blockchain

If you don't have the ABI of the contract locally, you can fetch it dynamically from the blockchain:

```javascript
const { Provider, Contract } = require('koilib');

async function readContractWithoutLocalAbi() {
  // Connect to Koinos
  const provider = new Provider('https://api.koinos.io');
  
  // Contract address (no ABI needed initially)
  const contractAddress = '1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz';
  
  // Create contract instance without ABI
  const contract = new Contract({
    id: contractAddress,
    provider
    // Note: no abi parameter here
  });
  
  try {
    // Fetch ABI from the blockchain
    await contract.fetchAbi();
    
    // Now you can call contract functions
    const { result } = await contract.functions.get_address({
      // function parameters
      value: "jgapool"
    });
    
    console.log('Contract data:', result);
  } catch (error) {
    console.error('Error reading contract:', error);
  }
}
```

### ABI Fetching Explained

The `fetchAbi()` function:

- **Retrieves the ABI** directly from the blockchain where it's stored
- **Links it to the contract interface** so you can call functions
- **Works with any contract** as long as you have the contract address and the ABI was deployed by the creator

### When to Use Each Approach

**Local ABI (Recommended):**

- Better performance (no network call)
- Works offline during development
- More predictable for production applications

**Dynamic ABI Fetching:**

- When you don't have the ABI available locally
- For exploring unknown contracts
- When building tools that work with arbitrary contracts

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

