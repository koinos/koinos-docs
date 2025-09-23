# Logs

Learn how to implement logging and debugging in smart contracts.

## Overview

Logging helps with debugging and monitoring contract execution during development and production.

## Basic Logging

```	ypescript
import { System } from \
@koinos/sdk-as\;

export class MyContract {
  debug_function(): void {
    // Log messages for debugging
    System.log(\Debug:
Function
called\);
    System.log(\User balance: \\);
  }
}
```

## Next Steps

- [Build for testnet](build-testnet.md)
- [Deploy contract](deploy-contract.md)
