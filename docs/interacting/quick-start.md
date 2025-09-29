# Quick Start

Learn how to read a KOIN balance from the Koinos blockchain in just a few lines of code.

## Prerequisites

- Node.js installed
- Basic JavaScript/TypeScript knowledge

## Setup

1. **Create a new project:**
```bash
mkdir koinos-quickstart
cd koinos-quickstart
npm init -y
```

2. **Install Koilib:**
```bash
npm install koilib
```

## Read a Balance

Create `index.js`:

```javascript
const { Provider, Contract, utils } = require('koilib');

async function readBalance() {
  // Connect to Koinos mainnet
  const provider = new Provider('https://api.koinos.io');
  
  // KOIN contract address
  const koinAddress = '19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK';
  
  // Create contract instance
  const koin = new Contract({
    id: koinAddress,
    provider,
    abi: utils.tokenAbi, // Built-in token ABI
  });
  
  try {
    // Read the balance
    const { result } = await koin.functions.balanceOf({
      // Address to check (replace with any Koinos address)
      owner: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'
    });
    
    // Convert from smallest unit to KOIN
    const balance = utils.formatUnits(result.value, 8);
    
    console.log(`Balance: ${balance} KOIN`);
  } catch (error) {
    console.error('Error:', error);
  }
}

readBalance();
```

3. **Run the script:**
```bash
node index.js
```

## Expected Output

```
Balance: 1234.56789012 KOIN
```

## What's Happening?

1. **Provider**: Connects to the Koinos blockchain API
2. **Contract**: Creates an interface to the KOIN token contract
3. **balanceOf**: Calls the contract's balance function
4. **formatUnits**: Converts from the smallest unit (8 decimals) to human-readable KOIN

## Next Steps

- [Read data from other contracts](read-contract-data.md)
- [Submit your first transaction](submit-transaction.md)
- [Work with multiple operations](multiple-operations.md)
