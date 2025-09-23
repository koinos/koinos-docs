# Authorize Function

Learn how to implement custom authorization logic in your smart contracts.

## Overview

Beyond basic authorization checks, you can implement custom authorization logic to handle complex permission scenarios.

## Basic Implementation

```typescript
export class MyContract {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    const type = args.type;
    const call = args.call;
    
    // Custom authorization logic based on call type
    if (type == authority.authorization_type.contract_call) {
      return this.authorizeContractCall(call);
    }
    
    return new authority.authorize_result(false);
  }
  
  private authorizeContractCall(call: protocol.operation): authority.authorize_result {
    // Implement custom logic
    return new authority.authorize_result(true);
  }
}
```

## Advanced Authorization

### Role-Based Authorization

```typescript
export class RoleBasedContract {
  roles: Storage.Map<Uint8Array, Storage.List<string>>;
  
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    const caller = System.getCaller().caller;
    
    // Check if caller has required role for this operation
    if (this.requiresAdminRole(args.call)) {
      return new authority.authorize_result(
        this.hasRole(caller, "admin")
      );
    }
    
    // Default authorization logic
    return new authority.authorize_result(true);
  }
  
  private requiresAdminRole(call: protocol.operation): bool {
    // Define which operations require admin role
    const adminOperations = ["mint", "burn", "pause"];
    return adminOperations.includes(this.getOperationName(call));
  }
  
  private hasRole(address: Uint8Array, role: string): bool {
    const userRoles = this.roles.get(address);
    if (!userRoles) return false;
    
    for (let i = 0; i < userRoles.length(); i++) {
      if (userRoles.get(i) == role) return true;
    }
    
    return false;
  }
}
```

### Time-Based Authorization

```typescript
export class TimeLockContract {
  lockUntil: Storage.Obj<u64>;
  
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    const currentTime = System.getHeadInfo().head_block_time;
    const lockTime = this.lockUntil.get() || 0;
    
    // Deny all operations if contract is time-locked
    if (currentTime < lockTime) {
      return new authority.authorize_result(false);
    }
    
    // Allow operations after lock expires
    return new authority.authorize_result(true);
  }
}
```

### Multi-Signature Authorization

```typescript
export class MultiSigContract {
  required_signatures: Storage.Obj<u32>;
  signers: Storage.List<Uint8Array>;
  
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    const signatures = this.extractSignatures(args);
    const requiredSigs = this.required_signatures.get() || 2;
    
    if (signatures.length < requiredSigs) {
      return new authority.authorize_result(false);
    }
    
    // Verify all signatures are from valid signers
    let validSigs = 0;
    for (let i = 0; i < signatures.length; i++) {
      if (this.isValidSigner(signatures[i])) {
        validSigs++;
      }
    }
    
    return new authority.authorize_result(validSigs >= requiredSigs);
  }
  
  private isValidSigner(signer: Uint8Array): bool {
    for (let i = 0; i < this.signers.length(); i++) {
      if (Arrays.equal(this.signers.get(i), signer)) {
        return true;
      }
    }
    return false;
  }
}
```

## Best Practices

### 1. Fail Securely

```typescript
authorize(args: authority.authorize_arguments): authority.authorize_result {
  try {
    // Authorization logic
    return this.performAuthCheck(args);
  } catch (error) {
    // Default to deny on error
    return new authority.authorize_result(false);
  }
}
```

### 2. Log Authorization Events

```typescript
authorize(args: authority.authorize_arguments): authority.authorize_result {
  const caller = System.getCaller().caller;
  const authorized = this.checkPermissions(args);
  
  // Log authorization attempt
  System.event(
    "authorization_check",
    this.encodeAuthEvent(caller, args, authorized),
    [caller]
  );
  
  return new authority.authorize_result(authorized);
}
```

### 3. Use Consistent Error Handling

```typescript
authorize(args: authority.authorize_arguments): authority.authorize_result {
  // Validate inputs
  System.require(args.type != null, "authorization type required");
  System.require(args.call != null, "call data required");
  
  // Perform authorization
  const result = this.performAuthCheck(args);
  
  return new authority.authorize_result(result);
}
```

## Integration with System

### Contract Registration

```typescript
export class MyContract {
  constructor() {
    // Register authorization function with system
    System.setContractAuthority(System.getContractId());
  }
  
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // Custom authorization logic
    return new authority.authorize_result(this.isAuthorized(args));
  }
}
```

## Testing Authorization

### Unit Tests

```typescript
// test/authorization.spec.ts
describe("Authorization", () => {
  test("should authorize admin operations", () => {
    const contract = new MyContract();
    const args = new authority.authorize_arguments();
    args.type = authority.authorization_type.contract_call;
    
    const result = contract.authorize(args);
    expect(result.authorized).toBe(true);
  });
  
  test("should deny unauthorized operations", () => {
    const contract = new MyContract();
    const args = new authority.authorize_arguments();
    args.type = authority.authorization_type.contract_call;
    
    // Set up unauthorized scenario
    const result = contract.authorize(args);
    expect(result.authorized).toBe(false);
  });
});
```

## Common Patterns

### Owner-Only Authorization

```typescript
authorize(args: authority.authorize_arguments): authority.authorize_result {
  const caller = System.getCaller().caller;
  const owner = this.owner.get();
  
  return new authority.authorize_result(
    Arrays.equal(caller, owner)
  );
}
```

### Whitelist Authorization

```typescript
authorize(args: authority.authorize_arguments): authority.authorize_result {
  const caller = System.getCaller().caller;
  const whitelist = this.whitelist.get() || [];
  
  for (let i = 0; i < whitelist.length; i++) {
    if (Arrays.equal(caller, whitelist[i])) {
      return new authority.authorize_result(true);
    }
  }
  
  return new authority.authorize_result(false);
}
```

## Next Steps

- [Verify signatures](verify-signatures.md)
- [System events](system-events.md)
- [Deploy contract](deploy-contract.md)