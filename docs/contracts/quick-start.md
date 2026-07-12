# Quick Start: Launch a Token with Arkinos

Create and deploy your first token contract using the Arkinos framework.

## Prerequisites

- Node.js 16+ installed
- Basic TypeScript/AssemblyScript knowledge
- Testnet KOIN for deployment (get from the [Telegram faucet bot](https://t.me/KoinosTestnetFaucetBot))

## Installation

Install Arkinos CLI globally:

```bash
npm install -g @arkinos/cli
```

## Create a Token Project

1. **Initialize a new token project:**
```bash
arkinos init my-token --template token
cd my-token
```

2. **Install dependencies:**
```bash
npm install
```

## Project Structure

```
my-token/
├── assembly/
│   ├── MyToken.ts      # Main contract
│   └── proto/          # Protocol buffers
├── tests/
│   └── MyToken.spec.ts # Contract tests
├── arkinos.config.js   # Configuration
└── package.json
```

## Customize Your Token

Edit `assembly/MyToken.ts`:

```typescript
import { System, Protobuf, authority } from "@koinos/sdk-as";
import { mytoken } from "./proto/mytoken";

export class MyToken {
  callArgs: System.getArgumentsReturn | null;

  constructor() {
    this.callArgs = System.getArguments();
  }

  /**
   * Get token name
   */
  name(args: mytoken.name_arguments): mytoken.name_result {
    return new mytoken.name_result("My Awesome Token");
  }

  /**
   * Get token symbol
   */
  symbol(args: mytoken.symbol_arguments): mytoken.symbol_result {
    return new mytoken.symbol_result("MAT");
  }

  /**
   * Get token decimals
   */
  decimals(args: mytoken.decimals_arguments): mytoken.decimals_result {
    return new mytoken.decimals_result(8);
  }

  // ... more token functions
}
```

## Build and Test

1. **Build the contract:**
```bash
arkinos build
```

2. **Run tests:**
```bash
arkinos test
```

3. **Generate TypeScript bindings:**
```bash
arkinos generate
```

## Deploy to Testnet

1. **Configure deployment in `arkinos.config.js`:**
```javascript
module.exports = {
  networks: {
    harbinger: {
      rpcUrl: "https://testnet.koinosfoundation.org",
      accounts: {
        manaSharer: {
          privateKey: "YOUR_PRIVATE_KEY" // Use environment variable
        }
      }
    }
  }
};
```

2. **Deploy:**
```bash
arkinos deploy --network harbinger
```

## Interact with Your Token

After deployment, you'll get a contract address. Test it:

```javascript
const { Provider, Contract } = require('koilib');
const abi = require('./abi/mytoken-abi.json');

const provider = new Provider('https://testnet.koinosfoundation.org');
const contract = new Contract({
  id: 'YOUR_CONTRACT_ADDRESS',
  provider,
  abi
});

// Get token name
const { result } = await contract.functions.name();
console.log('Token name:', result.value);
```

## What's Next?

- [Learn about storage](storage.md) to understand contract data
- [Explore external functions](external-functions.md) for contract interfaces
- [Call other contracts](call-other-contracts.md) for advanced interactions

## Troubleshooting

**Build Errors**: Check TypeScript syntax and imports
**Test Failures**: Verify test logic and contract functions
**Deployment Issues**: Ensure sufficient testnet KOIN and correct network configuration
