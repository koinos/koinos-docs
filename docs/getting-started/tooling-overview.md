# Tooling Overview

An overview of the essential tools in the Koinos ecosystem: Koilib, Kondor, and Arkinos.

## Core Development Tools

### Koilib
**JavaScript/TypeScript SDK for Koinos**

#### What it does:
- Interact with the Koinos blockchain from web applications
- Submit transactions and read blockchain data
- Manage accounts and sign transactions
- Work with smart contracts

#### Key features:
- Provider for blockchain connection
- Contract abstraction
- Transaction building
- Serialization utilities

#### Installation:
```bash
npm install koilib
```

#### Basic usage:
<!-- example: tooling-koilib-client -->
```javascript
--8<-- "examples/javascript/references/koilib-api-tour/index.js:tooling"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/references/koilib-api-tour/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/references/koilib-api-tour)

This Node.js example creates a mainnet provider and a disposable local signer.
It does not broadcast a transaction.

### Kondor Wallet
**Browser Extension Wallet**

#### What it does:
- Secure key management
- Transaction signing for dApps
- Account management
- Network switching

#### Key features:
- Browser extension (Chrome, Firefox)
- Hardware wallet-like security
- dApp integration
- Multi-account support

#### Integration:
```javascript
// Check if Kondor is available
if (window.kondor) {
  const signer = window.kondor.getSigner();
}
```

### Arkinos
**Smart Contract Development Framework**

#### What it does:
- Bootstrap smart contract projects
- Compile AssemblyScript contracts
- Deploy contracts to testnet/mainnet
- Generate TypeScript bindings

#### Key features:
- Project templates
- Built-in testing framework
- Deployment scripts
- ABI generation

#### Installation:
```bash
npm install -g @arkinos/cli
```

#### Usage:
```bash
# Create new project
arkinos init my-contract

# Build contract
arkinos build

# Deploy contract
arkinos deploy
```

## Additional Tools

### Koinos CLI
Command-line interface for blockchain interaction

### Block Explorers
- **Koinosblocks**: Primary block explorer
- **Koiner**: Alternative explorer with advanced features

### Development Networks
- **Local testnet**: For private development
- **Harbinger testnet**: Public testing network

## Choosing the Right Tool

| Task | Recommended Tool |
|------|------------------|
| Web dApp development | Koilib + Kondor |
| Smart contract development | Arkinos |
| Blockchain queries | Koilib or CLI |
| Wallet management | Kondor |
| Testing | Arkinos + Local testnet |

## Next Steps

You're now ready to start [Interacting with Koinos](../interacting/index.md)!
