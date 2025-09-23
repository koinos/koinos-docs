# System Contracts

Understanding Koinos system contracts that power the blockchain's core functionality.

## Overview

System contracts are special smart contracts that implement core blockchain functionality like tokenomics, governance, and resource management. Unlike regular contracts, they have special privileges and are integral to the blockchain's operation.

## Core System Contracts

### Economic System
- **[Tokenomics](tokenomics.md)**: Overall economic model
- **[KOIN and VHP](koin-vhp.md)**: Native tokens and their roles
- **[Proof of Burn](proof-of-burn.md)**: Consensus mechanism
- **[Mana](mana.md)**: Fee-less transaction system

### Governance
- **[Governance](governance.md)**: On-chain governance system
- **[Koinos Fund](koinos-fund.md)**: Community development fund

### Infrastructure
- **[Name Service](name-service.md)**: Human-readable addresses
- **[Resources](resources.md)**: Resource management system

## Key Concepts

### Immutable vs Upgradeable
- Some system contracts are immutable for security
- Others can be upgraded through governance
- All changes require community consensus

### Special Privileges
System contracts can:
- Access privileged system calls
- Modify blockchain state directly
- Interact with consensus mechanisms

### Integration Points
System contracts interact with:
- User transactions
- Block production
- Fee calculation
- Resource allocation

## For Developers

Understanding system contracts helps you:
- Build better applications
- Optimize resource usage
- Integrate with governance
- Understand blockchain behavior

## For Users

System contracts affect:
- Transaction costs (through Mana)
- Governance participation
- Token economics
- Network security
