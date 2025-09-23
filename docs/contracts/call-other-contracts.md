# Call Other Contracts

Learn how to interact with other smart contracts from within your contract.

## Overview

Koinos smart contracts can call functions on other contracts, enabling composability and complex interactions between different protocols.

## Basic Contract Calls

### Call External Contract

```typescript
import { System, Protobuf } from "@koinos/sdk-as";
import { token } from "./proto/token";

export class MyContract {
  transfer_tokens(args: mycontract.transfer_args): mycontract.transfer_result {
    // Prepare arguments for token contract
    const transferArgs = new token.transfer_arguments();
    transferArgs.from = args.from;
    transferArgs.to = args.to;
    transferArgs.value = args.amount;
    
    // Call token contract
    const tokenContract = new Uint8Array(25); // Token contract address
    const result = System.call(
      tokenContract,
      0x27f576ca, // transfer function entry point
      Protobuf.encode(transferArgs, token.transfer_arguments.encode)
    );
    
    // Handle result
    System.require(result.code == 0, "token transfer failed");
    
    return new mycontract.transfer_result();
  }
}
```

### Using Contract Interfaces

```typescript
// Define interface for external contract
class TokenContract {
  contractId: Uint8Array;
  
  constructor(contractId: Uint8Array) {
    this.contractId = contractId;
  }
  
  transfer(from: Uint8Array, to: Uint8Array, value: u64): void {
    const args = new token.transfer_arguments();
    args.from = from;
    args.to = to;
    args.value = value;
    
    const result = System.call(
      this.contractId,
      0x27f576ca,
      Protobuf.encode(args, token.transfer_arguments.encode)
    );
    
    System.require(result.code == 0, "transfer failed");
  }
  
  balanceOf(owner: Uint8Array): u64 {
    const args = new token.balance_of_arguments();
    args.owner = owner;
    
    const result = System.call(
      this.contractId,
      0x5c721497,
      Protobuf.encode(args, token.balance_of_arguments.encode)
    );
    
    System.require(result.code == 0, "balance query failed");
    
    const balanceResult = Protobuf.decode<token.balance_of_result>(
      result.res.object,
      token.balance_of_result.decode
    );
    
    return balanceResult.value;
  }
}
```

## Advanced Patterns

### Multi-Contract Operations

```typescript
export class DeFiContract {
  swap_tokens(args: defi.swap_args): defi.swap_result {
    const tokenA = new TokenContract(args.token_a_address);
    const tokenB = new TokenContract(args.token_b_address);
    
    // Check user's balance
    const balance = tokenA.balanceOf(args.user);
    System.require(balance >= args.amount_in, "insufficient balance");
    
    // Transfer tokens from user to this contract
    tokenA.transfer(args.user, System.getContractId(), args.amount_in);
    
    // Calculate swap amount (simplified)
    const amountOut = this.calculateSwapAmount(args.amount_in);
    
    // Transfer output tokens to user
    tokenB.transfer(System.getContractId(), args.user, amountOut);
    
    return new defi.swap_result();
  }
}
```

## Best Practices

1. **Always check return codes** from contract calls
2. **Handle failures gracefully** with meaningful error messages
3. **Use interfaces** to organize contract interactions
4. **Validate external contract addresses** before calling
5. **Be aware of reentrancy** risks in complex interactions

## Next Steps

- [Check authorization](check-authorization.md)
- [Authorize function](authorize-function.md)



