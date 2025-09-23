# Verify Signatures

Learn how to verify cryptographic signatures in smart contracts.

## Overview

Signature verification allows contracts to validate that data was signed by a specific private key, enabling secure off-chain authorization patterns.

## Basic Usage

```	ypescript
import { System, Crypto } from \
@koinos/sdk-as\;

export class MyContract {
  verify_signature(args: contract.verify_args): contract.verify_result {
    const message = args.message;
    const signature = args.signature;
    const public_key = args.public_key;
    
    const isValid = Crypto.verifySignature(message, signature, public_key);
    
    const result = new contract.verify_result();
    result.valid = isValid;
    return result;
  }
}
```

## Next Steps

- [System events](system-events.md)
- [Logs](logs.md)
