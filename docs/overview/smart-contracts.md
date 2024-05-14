---
icon: fontawesome/solid/code
---
# Smart contracts
A smart contract is a contract encoded in code and deployed on a blockchain. It automatically executes actions when predetermined conditions are met. These contracts run decentralized across the blockchain network, providing transparency, immutability, and automation without the need for intermediaries. Smart contracts are written in various programming languages and can be applied to various use cases, including financial transactions, supply chain management, and decentralized applications. They incur [Mana](mana.md) for execution, which is a regenerative resource tied to primary blockchain cryptocurrency KOIN.

## Koinos Virtual Machine (KVM)
The Koinos Virtual Machine (KVM) is a decentralized runtime environment designed for executing smart contracts on the Koinos blockchain. It's a Turing-complete virtual machine, meaning it can handle complex computations. Smart contracts, written in commonly used languages, are compiled into bytecode and executed by the KVM. Each operation in a smart contract requires [Mana](mana.md), which is a measure of computational effort. The KVM ensures deterministic execution, meaning the outcome is consistent across all nodes in the network, ensuring integrity and consensus.

## Smart contracts on Koinos
Smart contracts on Koinos play several important roles. Smart contracts are not only used to develop dApps (decentralized applications), they are also used to implement core blockchain functionality. KOIN, VHP, Mana, and Proof-of-Burn itself are all critical subsystems that are implemented via smart contracts.

The implementation of core blockchain functionality via smart contracts provides the Koinos blockchain the unique ability of upgrading features without the use of hardforks. Because key subsystems are implemented via smart contracts, new features can propagate through the network in the same manner new dApps can.