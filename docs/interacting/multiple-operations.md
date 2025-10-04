# Submit Multiple Operations in a Single Transaction

Learn how to batch multiple operations into a single transaction for efficiency and atomicity using the koilib Transaction class.

## Overview

Koinos allows you to include multiple operations in a single transaction, which can be more efficient and ensures all operations succeed or fail together (atomicity). The koilib `Transaction` class provides a powerful API for building and managing multi-operation transactions.

## Prerequisites

- Understanding of [Submit a Transaction](submit-transaction.md)
- Node.js and Koilib installed
- Basic knowledge of koilib Contract and Provider classes

## Transaction Class Overview

The `Transaction` class in koilib provides several key methods for multi-operation transactions:

- `pushOperation()` - Add operations to the transaction
- `prepare()` - Prepare the transaction (set headers, merkle root, etc.)
- `sign()` - Sign the transaction
- `send()` - Broadcast the transaction
- `wait()` - Wait for transaction confirmation

## Creating Multi-Operation Transactions

### Multi-Operation Example

The `pushOperation` method is the primary way to add operations to a transaction. It takes a contract function and its arguments. Here's a complete example with multiple operations from different contracts:

```javascript
const { Provider, Signer, Transaction, Contract, utils } = require('koilib');

async function multiOperationExample() {
  const provider = new Provider(['https://api.koinos.io']);
  const signer = Signer.fromWif('your-wif-key');
  signer.provider = provider;
  
  // Setup contracts
  const koin = new Contract({
    id: '19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK',
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
  
  // Create transaction
  const transaction = new Transaction({ signer, provider });
  
  // Add multiple operations using pushOperation
  // First KOIN transfer
  await transaction.pushOperation(koin.functions.transfer, {
    from: signer.address,
    to: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe',
    value: utils.parseUnits('1', 8)
  });
  
  // Second KOIN transfer
  await transaction.pushOperation(koin.functions.transfer, {
    from: signer.address,
    to: '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q',
    value: utils.parseUnits('0.5', 8)
  });
  
  // Operation from custom contract
  await transaction.pushOperation(myContract.functions.updateData, {
    newValue: 'some data'
  });
  
  // Prepare, sign and send transaction
  await transaction.prepare();
  await transaction.sign();
  const { receipt } = await transaction.send();
  
  console.log('Multi-operation transaction sent');
  console.log('RC used:', receipt.rc_used);
  
  await transaction.wait();
  console.log('All operations confirmed!');
}
```

## Use Cases

### Atomic Swaps
```javascript
async function atomicSwap() {
  const provider = new Provider(['https://api.koinos.io']);
  const signer = Signer.fromWif('your-wif-key');
  signer.provider = provider;
  
  const transaction = new Transaction({ signer, provider });
  
  // Both transfers must succeed or both fail
  await transaction.pushOperation(tokenA.functions.transfer, {
    from: signer.address,
    to: swapPartner,
    value: utils.parseUnits('100', 8)
  });
  
  await transaction.pushOperation(tokenB.functions.transfer, {
    from: swapPartner,
    to: signer.address,
    value: utils.parseUnits('50', 8)
  });
  
  await transaction.prepare();
  await transaction.sign();
  const { receipt } = await transaction.send();
  await transaction.wait();
}
```

### Complex State Updates
```javascript
async function complexStateUpdate() {
  const provider = new Provider(['https://api.koinos.io']);
  const signer = Signer.fromWif('your-wif-key');
  signer.provider = provider;
  
  const transaction = new Transaction({ signer, provider });
  
  // Update multiple related contract states atomically
  await transaction.pushOperation(contractA.functions.updateUserData, {
    userId: '123',
    data: userData
  });
  
  await transaction.pushOperation(contractB.functions.updateGlobalStats, {
    stats: statsData
  });
  
  await transaction.pushOperation(contractC.functions.logAction, {
    action: 'update',
    data: logData
  });
  
  await transaction.prepare();
  await transaction.sign();
  const { receipt } = await transaction.send();
  await transaction.wait();
}
```

### Batch Token Operations
```javascript
async function batchTokenTransfers() {
  const provider = new Provider(['https://api.koinos.io']);
  const signer = Signer.fromWif('your-wif-key');
  signer.provider = provider;
  
  const koin = new Contract({
    id: '19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK',
    provider,
    signer,
    abi: utils.tokenAbi
  });
  
  const transaction = new Transaction({ signer, provider });
  
  const recipients = [
    { address: '1A...', amount: '1.0' },
    { address: '1B...', amount: '2.0' },
    { address: '1C...', amount: '0.5' }
  ];

  // Send tokens to multiple recipients in one transaction
  for (const recipient of recipients) {
    await transaction.pushOperation(koin.functions.transfer, {
      from: signer.address,
      to: recipient.address,
      value: utils.parseUnits(recipient.amount, 8)
    });
  }
  
  await transaction.prepare();
  await transaction.sign();
  const { receipt } = await transaction.send();
  await transaction.wait();
}
```

## Advanced Transaction Features

### Transaction Options
```javascript
async function transactionWithOptions() {
  const provider = new Provider(['https://api.koinos.io']);
  const signer = Signer.fromWif('your-wif-key');
  signer.provider = provider;
  
  const koin = new Contract({
    id: '19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK',
    provider,
    signer,
    abi: utils.tokenAbi
  });
  
  const transaction = new Transaction({ 
    signer, 
    provider,
    options: {
      rcLimit: '5000000000', // 50 mana
      payer: '1LAmZF1iDUAGkQJL4Y6KM4wKkFEmw8Pokd', // free mana sharer
    }
  });
  
  // Add operations
  await transaction.pushOperation(koin.functions.transfer, {
    from: signer.address,
    to: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe',
    value: utils.parseUnits('1', 8)
  });
  
  await transaction.prepare();
  await transaction.sign();
  const { receipt } = await transaction.send();
  await transaction.wait();
}
```

## Benefits

1. **Atomicity**: All operations succeed or fail together
2. **Efficiency**: Single transaction fee instead of multiple
3. **Consistency**: Ensures related operations happen together
4. **Lower RC Cost**: Often cheaper than separate transactions
5. **Flexibility**: Multiple ways to add operations using `pushOperation`
6. **Control**: Fine-grained control over transaction preparation and signing

## Limitations

1. **Size Limits**: Transactions have size limits
2. **RC Limits**: Total RC usage must be within limits

## Best Practices

1. **Use proper transaction flow**: Always call `prepare()`, `sign()`, and `send()` in sequence
2. **Use the simple pushOperation pattern**: `await tx.pushOperation(contract.function, args)`
3. **Group related operations**: Keep operations that should succeed/fail together
4. **Test with dry runs**: Use `{ sendTransaction: false }` for testing
5. **Handle errors gracefully**: All operations will fail together, so plan accordingly
6. **Use transaction options**: Set appropriate `rcLimit`, `payer`, and `nonce` values
7. **Monitor transaction size**: Keep transactions reasonable to avoid limits
8. **Validate operations**: Ensure all operations are valid before sending

## Next Steps

- [Work with REST API](rest-api.md)
- [Integrate with Kondor wallet](kondor-wallet.md)
- [Read Contract Data](read-contract-data.md)

