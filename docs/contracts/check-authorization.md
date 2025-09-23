# Check Authorization

Learn how to verify caller permissions and implement access control in your smart contracts.

## Overview

Authorization is crucial for smart contract security. Koinos provides built-in mechanisms to check if a caller has the required permissions to execute specific functions.

## Basic Authorization

### Require Authority

```typescript
import { System } from "@koinos/sdk-as";

export class MyContract {
  transfer(args: token.transfer_arguments): token.transfer_result {
    // Require authorization from the 'from' address
    System.requireAuthority(args.from);
    
    // Proceed with transfer logic
    // ...
    
    return new token.transfer_result();
  }
  
  mint(args: token.mint_arguments): token.mint_result {
    // Only contract owner can mint
    const owner = this.owner.get();
    System.requireAuthority(owner);
    
    // Mint tokens
    // ...
    
    return new token.mint_result();
  }
}
```

### Get Caller Information

```typescript
function restrictedFunction(): void {
  const caller = System.getCaller();
  
  // Check if called by another contract
  if (caller.caller_privilege == authority.authorization_type.contract_call) {
    System.require(
      Arrays.equal(caller.caller, TRUSTED_CONTRACT_ADDRESS),
      "unauthorized contract caller"
    );
  }
  
  // Function logic
}
```

## Authorization Patterns

### Owner-Only Functions

```typescript
export class OwnableContract {
  owner: Storage.Obj<Uint8Array>;
  
  constructor() {
    this.owner = new Storage.Obj(
      System.getContractId(),
      0,
      Storage.Serializer.bytes
    );
  }
  
  set_owner(args: contract.set_owner_arguments): contract.set_owner_result {
    // Only current owner can change owner
    System.requireAuthority(this.owner.get());
    
    this.owner.put(args.new_owner);
    
    return new contract.set_owner_result();
  }
  
  admin_function(args: contract.admin_arguments): contract.admin_result {
    System.requireAuthority(this.owner.get());
    
    // Admin logic
    
    return new contract.admin_result();
  }
}
```

### Multi-Signature Authorization

```typescript
export class MultiSigContract {
  signers: Storage.List<Uint8Array>;
  required_signatures: Storage.Obj<u32>;
  
  execute_transaction(args: multisig.execute_arguments): multisig.execute_result {
    const signers = args.signers;
    const requiredSigs = this.required_signatures.get() || 2;
    
    System.require(signers.length >= requiredSigs, "insufficient signatures");
    
    // Verify each signer is authorized
    for (let i = 0; i < signers.length; i++) {
      System.requireAuthority(signers[i]);
    }
    
    // Execute transaction
    // ...
    
    return new multisig.execute_result();
  }
}
```

### Role-Based Access Control

```typescript
export class RoleBasedContract {
  roles: Storage.Map<Uint8Array, Storage.List<string>>;
  
  has_role(address: Uint8Array, role: string): bool {
    const userRoles = this.roles.get(address);
    if (!userRoles) return false;
    
    for (let i = 0; i < userRoles.length(); i++) {
      if (userRoles.get(i) == role) return true;
    }
    
    return false;
  }
  
  require_role(address: Uint8Array, role: string): void {
    System.require(this.has_role(address, role), `missing role: ${role}`);
  }
  
  admin_function(args: contract.admin_arguments): contract.admin_result {
    const caller = System.getCaller().caller;
    
    this.require_role(caller, "admin");
    System.requireAuthority(caller);
    
    // Admin function logic
    
    return new contract.admin_result();
  }
}
```

## Best Practices

1. **Always validate authorization** before state changes
2. **Use specific error messages** for different authorization failures
3. **Implement role-based access** for complex permission systems
4. **Check both authorization and authentication** where needed
5. **Be consistent** with authorization patterns across your contract

## Next Steps

- [Authorize function](authorize-function.md)
- [Verify signatures](verify-signatures.md)



