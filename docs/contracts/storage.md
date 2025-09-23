# Storage of Data

Learn how smart contracts store and retrieve data on the Koinos blockchain.

## Overview

Smart contracts on Koinos use a key-value storage system where data is stored persistently on the blockchain. Understanding how to efficiently manage contract storage is crucial for building performant and cost-effective contracts.

## Storage Basics

### Key-Value Storage

Koinos contracts store data as key-value pairs where:
- **Keys** are byte arrays that identify the data
- **Values** are byte arrays containing the actual data
- Both keys and values are serialized using Protocol Buffers

### Storage Space

Each contract has its own isolated storage space identified by the contract address. Contracts cannot directly access other contracts' storage.

## Storage Classes

### Using Storage Classes

```typescript
import { Storage } from "@koinos/sdk-as";

export class MyContract {
  // Storage spaces
  balances: Storage.Map<string, u64>;
  metadata: Storage.Obj<ContractMetadata>;
  
  constructor() {
    this.balances = new Storage.Map(
      this.contractId, // contract address
      0, // storage space ID
      Storage.Serializer.string, // key serializer
      Storage.Serializer.uint64   // value serializer
    );
    
    this.metadata = new Storage.Obj(
      this.contractId,
      1, // different storage space
      Storage.Serializer.proto<ContractMetadata>()
    );
  }
}
```

### Available Storage Types

#### Storage.Map
For key-value mappings:

```typescript
// String to number mapping
balances: Storage.Map<string, u64> = new Storage.Map(
  this.contractId,
  BALANCES_SPACE_ID,
  Storage.Serializer.string,
  Storage.Serializer.uint64
);

// Usage
this.balances.put(address, balance);
const balance = this.balances.get(address);
```

#### Storage.Obj
For single objects:

```typescript
// Single object storage
config: Storage.Obj<Config> = new Storage.Obj(
  this.contractId,
  CONFIG_SPACE_ID,
  Storage.Serializer.proto<Config>()
);

// Usage
this.config.put(configData);
const config = this.config.get();
```

#### Storage.List
For arrays/lists:

```typescript
// List storage
events: Storage.List<Event> = new Storage.List(
  this.contractId,
  EVENTS_SPACE_ID,
  Storage.Serializer.proto<Event>()
);

// Usage
this.events.push(newEvent);
const event = this.events.get(index);
const length = this.events.length();
```

## Storage Spaces

### Organizing Storage

Use different storage space IDs to organize related data:

```typescript
// Storage space constants
const BALANCES_SPACE_ID = 0;
const ALLOWANCES_SPACE_ID = 1;
const METADATA_SPACE_ID = 2;
const EVENTS_SPACE_ID = 3;

export class TokenContract {
  balances: Storage.Map<string, u64>;
  allowances: Storage.Map<string, Storage.Map<string, u64>>;
  metadata: Storage.Obj<TokenMetadata>;
  
  constructor() {
    this.balances = new Storage.Map(
      this.contractId,
      BALANCES_SPACE_ID,
      Storage.Serializer.string,
      Storage.Serializer.uint64
    );
    
    // Nested mapping for allowances
    this.allowances = new Storage.Map(
      this.contractId,
      ALLOWANCES_SPACE_ID,
      Storage.Serializer.string,
      Storage.Serializer.proto<Storage.Map<string, u64>>()
    );
    
    this.metadata = new Storage.Obj(
      this.contractId,
      METADATA_SPACE_ID,
      Storage.Serializer.proto<TokenMetadata>()
    );
  }
}
```

## Serialization

### Built-in Serializers

```typescript
// Primitive types
Storage.Serializer.string     // for strings
Storage.Serializer.uint64     // for numbers
Storage.Serializer.bool       // for booleans
Storage.Serializer.bytes      // for byte arrays

// Protocol Buffer types
Storage.Serializer.proto<MyMessage>()
```

### Custom Serializers

```typescript
class CustomSerializer {
  static serialize(obj: MyObject): Uint8Array {
    // Custom serialization logic
    return Protobuf.encode(obj, MyObject.encode);
  }
  
  static deserialize(data: Uint8Array): MyObject {
    // Custom deserialization logic
    return Protobuf.decode<MyObject>(data, MyObject.decode);
  }
}
```

## Best Practices

### Efficient Key Design

```typescript
// Good: Use meaningful, consistent key patterns
const userBalanceKey = `balance:${userAddress}`;
const allowanceKey = `allowance:${owner}:${spender}`;

// Bad: Inconsistent or unclear keys
const key1 = userAddress; // unclear what this stores
const key2 = `${owner}${spender}`; // no separator, could conflict
```

### Minimize Storage Operations

```typescript
// Good: Batch operations
function updateMultipleBalances(updates: BalanceUpdate[]): void {
  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    this.balances.put(update.address, update.balance);
  }
}

// Bad: Unnecessary reads
function transfer(from: string, to: string, amount: u64): void {
  const fromBalance = this.balances.get(from); // Read 1
  const toBalance = this.balances.get(to);     // Read 2
  
  // ... validation ...
  
  this.balances.put(from, fromBalance - amount); // Write 1
  this.balances.put(to, toBalance + amount);     // Write 2
}
```

### Handle Missing Data

```typescript
function getBalance(address: string): u64 {
  const balance = this.balances.get(address);
  
  // Handle case where address has no balance yet
  return balance ? balance : 0;
}

function safeGet<T>(storage: Storage.Obj<T>, defaultValue: T): T {
  const value = storage.get();
  return value ? value : defaultValue;
}
```

## Storage Costs

### Understanding Costs

Storage operations consume resources:
- **Writing data** costs more than reading
- **Larger data** costs more to store
- **Frequent updates** can be expensive

### Optimization Strategies

```typescript
// Pack data efficiently
class PackedData {
  // Use smaller integer types when possible
  count: u32;        // instead of u64 if range is sufficient
  flags: u8;         // pack boolean flags into single byte
  timestamp: u32;    // Unix timestamp fits in u32 until 2106
}

// Use storage spaces efficiently
const GLOBAL_CONFIG = 0;
const USER_DATA_BASE = 1000; // Leave room for global spaces

function getUserStorageSpace(address: string): u32 {
  // Create unique storage space for each user
  return USER_DATA_BASE + hash(address) % 1000;
}
```

## Examples

### Token Balance Storage

```typescript
export class Token {
  balances: Storage.Map<string, u64>;
  totalSupply: Storage.Obj<u64>;
  
  constructor() {
    this.balances = new Storage.Map(
      this.contractId,
      0,
      Storage.Serializer.string,
      Storage.Serializer.uint64
    );
    
    this.totalSupply = new Storage.Obj(
      this.contractId,
      1,
      Storage.Serializer.uint64
    );
  }
  
  transfer(from: string, to: string, amount: u64): void {
    const fromBalance = this.balances.get(from) || 0;
    const toBalance = this.balances.get(to) || 0;
    
    System.require(fromBalance >= amount, "insufficient balance");
    
    this.balances.put(from, fromBalance - amount);
    this.balances.put(to, toBalance + amount);
  }
  
  balanceOf(owner: string): u64 {
    return this.balances.get(owner) || 0;
  }
}
```

### User Profile Storage

```typescript
@proto
class UserProfile {
  name: string = "";
  email: string = "";
  created: u64 = 0;
  active: bool = true;
}

export class UserRegistry {
  profiles: Storage.Map<string, UserProfile>;
  
  constructor() {
    this.profiles = new Storage.Map(
      this.contractId,
      0,
      Storage.Serializer.string,
      Storage.Serializer.proto<UserProfile>()
    );
  }
  
  registerUser(address: string, profile: UserProfile): void {
    System.require(!this.profiles.has(address), "user already registered");
    
    profile.created = System.getHeadInfo().head_block_time;
    this.profiles.put(address, profile);
  }
  
  getProfile(address: string): UserProfile | null {
    return this.profiles.get(address);
  }
}
```

## Troubleshooting

### Common Issues

**Storage not persisting**: Ensure you're using the correct contract ID and storage space
**Serialization errors**: Verify your Protocol Buffer definitions match your data
**Key conflicts**: Use consistent key naming conventions and separators
**High storage costs**: Optimize data structures and minimize unnecessary writes

## Next Steps

- [Learn about external functions](external-functions.md)
- [Understand protobuffers](protobuffers.md)
- [Call other contracts](call-other-contracts.md)

