# System Events

Learn how to emit and handle system events in smart contracts.

## Overview

System events allow contracts to emit structured data that can be monitored by external applications and other contracts.

## Emitting Events

```	ypescript
import { System, Protobuf } from \
@koinos/sdk-as\;

export class MyContract {
  transfer(args: token.transfer_args): token.transfer_result {
    // ... transfer logic ...
    
    // Emit transfer event
    System.event(
      \token.transfer\,
      Protobuf.encode(args, token.transfer_args.encode),
      [args.from, args.to]
    );
    
    return new token.transfer_result();
  }
}
```

## Next Steps

- [Logs](logs.md)
- [Build for testnet](build-testnet.md)
