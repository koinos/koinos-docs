# Protobuffers

Learn how to use Protocol Buffers for data serialization in Koinos smart contracts.

## Overview

Protocol Buffers (protobuf) is the data serialization format used in Koinos for contract arguments, results, and storage. It provides efficient, cross-platform data serialization.

## Basic Usage

### Define Messages

```protobuf
syntax = "proto3";
package mycontract;

message user_info {
  string name = 1;
  string email = 2;
  uint64 created_at = 3;
  bool active = 4;
}

message transfer_args {
  bytes from = 1;
  bytes to = 2;
  uint64 amount = 3;
  string memo = 4;
}
```

### Generate TypeScript

```bash
koinos-proto-gen --proto mycontract.proto --out ./assembly/proto/
```

### Use in Contracts

```typescript
import { mycontract } from "./proto/mycontract";

export class MyContract {
  create_user(args: mycontract.create_user_args): mycontract.create_user_result {
    const userInfo = new mycontract.user_info();
    userInfo.name = args.name;
    userInfo.email = args.email;
    userInfo.created_at = System.getHeadInfo().head_block_time;
    userInfo.active = true;
    
    // Store user info
    this.users.put(args.address, userInfo);
    
    return new mycontract.create_user_result();
  }
}
```

## Best Practices

1. **Use meaningful field names** and consistent naming conventions
2. **Include field numbers** starting from 1
3. **Reserve field numbers** for future use when needed
4. **Use appropriate data types** for efficiency
5. **Version your schemas** carefully to maintain compatibility

## Next Steps

- [Call other contracts](call-other-contracts.md)
- [Check authorization](check-authorization.md)



