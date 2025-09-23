# Submit Multiple Operations in a Single Transaction

Learn how to batch multiple operations into a single transaction for efficiency and atomicity.

## Overview

Koinos allows you to include multiple operations in a single transaction, which can be more efficient and ensures all operations succeed or fail together (atomicity).

## Prerequisites

- Understanding of [Submit a Transaction](submit-transaction.md)
- Node.js and Koilib installed

## Creating Multi-Operation Transactions

### Basic Multi-Operation

```javascript
const { Provider, Signer, Transaction, utils } = require('koilib');

async function multipleOperations() {
  const provider = new Provider('https://api.koinos.io');
  const signer = Signer.fromPrivateKey('your-private-key');
  signer.provider = provider;
  
  // Create transaction
  const transaction = new Transaction({
    signer,
    provider
  });
  
  // Add multiple operations
  transaction.pushOperation('token.transfer', {
    from: signer.address,
    to: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe',
    value: utils.parseUnits('1', 8)
  }, '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL'); // KOIN contract
  
  transaction.pushOperation('token.transfer', {
    from: signer.address,
    to: '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q',
    value: utils.parseUnits('0.5', 8)
  }, '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL'); // KOIN contract
  
  // Submit transaction
  const { receipt } = await transaction.send();
  
  console.log('Multi-operation transaction sent');
  console.log('RC used:', receipt.rc_used);
  
  await transaction.wait();
  console.log('All operations confirmed!');
}
```

### Using Contract Instances

```javascript
async function multiOperationWithContracts() {
  // Setup contracts
  const koin = new Contract({
    id: '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
    provider,
    signer,
    abi: utils.tokenAbi
  });
  
  const myContract = new Contract({
    id: 'your-contract-address',
    provider,
    signer,
    abi: yourContractAbi
  });
  
  // Create transaction with multiple operations
  const transaction = new Transaction({ signer, provider });
  
  // Add operations from different contracts
  await koin.functions.transfer(
    {
      from: signer.address,
      to: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe',
      value: utils.parseUnits('1', 8)
    },
    { sendTransaction: false, transaction }
  );
  
  await myContract.functions.updateData(
    { newValue: 'some data' },
    { sendTransaction: false, transaction }
  );
  
  // Submit all operations together
  const { receipt } = await transaction.send();
  await transaction.wait();
}
```

## Use Cases

### Atomic Swaps
```javascript
// Both transfers must succeed or both fail
transaction.pushOperation('token.transfer', transferA, tokenContractA);
transaction.pushOperation('token.transfer', transferB, tokenContractB);
```

### Complex State Updates
```javascript
// Update multiple related contract states atomically
transaction.pushOperation('contract.updateUserData', userData, contractA);
transaction.pushOperation('contract.updateGlobalStats', statsData, contractB);
transaction.pushOperation('contract.logAction', logData, contractC);
```

### Batch Token Operations
```javascript
// Send tokens to multiple recipients in one transaction
const recipients = [
  { address: '1A...', amount: '1.0' },
  { address: '1B...', amount: '2.0' },
  { address: '1C...', amount: '0.5' }
];

recipients.forEach(recipient => {
  transaction.pushOperation('token.transfer', {
    from: signer.address,
    to: recipient.address,
    value: utils.parseUnits(recipient.amount, 8)
  }, koinContract);
});
```

## Benefits

1. **Atomicity**: All operations succeed or fail together
2. **Efficiency**: Single transaction fee instead of multiple
3. **Consistency**: Ensures related operations happen together
4. **Lower RC Cost**: Often cheaper than separate transactions

## Limitations

1. **Size Limits**: Transactions have size limits
2. **RC Limits**: Total RC usage must be within limits
3. **Complexity**: Harder to debug when operations fail

## Error Handling

```javascript
try {
  const { receipt } = await transaction.send();
  
  if (receipt.reverted) {
    console.error('Transaction reverted, all operations failed');
    console.error('Logs:', receipt.logs);
    return;
  }
  
  console.log('All operations successful');
  await transaction.wait();
} catch (error) {
  console.error('Transaction failed:', error);
}
```

## Best Practices

1. **Keep transactions reasonable size** to avoid limits
2. **Test with dry runs** before submitting
3. **Handle failures gracefully** - all operations will fail together
4. **Group related operations** for better atomicity
5. **Monitor RC usage** to stay within limits

## Next Steps

- [Work with REST API](rest-api.md)
- [Integrate with Kondor wallet](kondor-wallet.md)

