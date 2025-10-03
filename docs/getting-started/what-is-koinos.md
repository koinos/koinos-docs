# What is Koinos?

Koinos is a next-generation blockchain platform that has been designed from the ground up to be accessible to developers, frictionless for users, and resilient against the common weaknesses of earlier blockchains. It introduces several innovations—most notably the Mana system, Proof-of-Burn consensus, and a modular architecture—that together create a blockchain capable of delivering truly free-to-use applications while remaining flexible and upgradeable over time.

!!! info "Quick Summary"
    Koinos is a blockchain that aims to deliver a Web2-like user experience on a fully decentralized Web3 platform, making it the first truly accessible, fee-less, and upgradeable blockchain.

## The Mana System: Fee-less Transactions

At the heart of Koinos is the **Mana system**, which replaces transaction fees with a regenerating resource tied to the KOIN token. Each token contains Mana, and whenever a user sends a transaction, runs a smart contract, or otherwise consumes network resources, some of that Mana is temporarily consumed. Rather than permanently losing tokens, the user simply waits for their Mana to regenerate over time.

This mechanism introduces the idea of **opportunity cost instead of direct fees**. Because Mana regenerates, users are not punished financially for using the network; instead, they are limited only by how often they can use it within a given period. To ensure accessibility, Mana can also be delegated from token holders to others, meaning that people can begin using applications on Koinos without ever needing to buy tokens themselves.

**This makes Koinos the first blockchain that is truly free to use**, removing one of the greatest barriers to mainstream adoption.

## Smart Contracts in Familiar Languages

Another major step toward accessibility is Koinos's support for smart contracts in familiar programming languages. While Ethereum popularized the use of smart contracts, it required developers to learn Solidity, a custom language created specifically for that ecosystem.

**Koinos instead leverages WebAssembly (WASM)**, which allows developers to write contracts in widely used languages such as:

- **AssemblyScript** (TypeScript)
- **C++**
- **Many more languages** (with potential for expansion)

This approach dramatically lowers the barrier to entry for developers, since they can write blockchain applications using the same tools and languages they already know, rather than having to adopt new and highly specialized ones. It opens the door for mainstream programmers to contribute to the blockchain space without needing to re-train.

## Modular and Upgradeable Architecture

Koinos is built around a **microservices architecture** that makes it highly modular and flexible. Traditional blockchains often require disruptive "hard forks" whenever the system needs to be upgraded, which can split communities and stall adoption. Koinos avoids this problem by allowing upgrades to be introduced through smart contracts that can override or extend existing system logic.

This means the blockchain can **evolve continuously**, much like updating an operating system, without requiring users and developers to endure the disruptions of forks. Key benefits include:

- **No disruptive hard forks**
- **Continuous evolution** and improvement
- **On-chain governance** through decentralized proposals
- **Self-upgrading system** that can evolve its own rules

## Proof-of-Burn: A Novel Consensus Mechanism

Koinos introduces **Proof-of-Burn (PoB)** as its consensus algorithm, which combines the strengths of both Proof-of-Work (PoW) and Proof-of-Stake (PoS) while minimizing their weaknesses. In Proof-of-Burn, block producers must "burn" KOIN tokens—that is, permanently destroy them—to gain Virtual Hash Power (VHP), which they then use to compete for the right to produce blocks.

### Key Advantages:

- **Egalitarian**: Cost is paid upfront, like PoW mining, but without energy waste
- **No specialized hardware** required
- **Attack-resistant**: Malicious actors must destroy user funds before attempting attacks
- **Economically rational**: Combines PoW decentralization with PoS efficiency

This model delivers the decentralization of PoW with the efficiency of PoS, making it both fair and sustainable.

## Why Koinos Matters

### For Users
- **No transaction fees** - use dApps without paying gas
- **No tokens required** - get started through Mana delegation
- **Smooth user experience** - Web2-like usability on Web3

### For Developers  
- **Familiar languages** - write contracts in AssemblyScript, C++, and more
- **No disruptive upgrades** - platform evolves without hard forks
- **Powerful onboarding** - Mana delegation removes user friction

### For the Ecosystem
- **True decentralization** - combines best of PoW and PoS
- **Continuous innovation** - upgradeable without community splits
- **Mainstream accessibility** - removes barriers to adoption

By removing fees, supporting familiar tools, enabling continuous upgrades, and introducing Proof-of-Burn, Koinos sets itself apart as not just another Ethereum competitor but a genuine alternative—one designed to make blockchain technology usable and beneficial to the widest possible audience.

---

## Ready to Start?

Now that you understand what makes Koinos unique, let's get you set up:

**Next:** [Accounts, Keys, and Wallets](accounts-keys-wallets.md) - Learn how to create and manage your Koinos identity

You can also explore:

- **[Tooling Overview](tooling-overview.md)** - Essential development tools
- **[Mainnet vs Testnet](mainnet-vs-testnet.md)** - Understanding different networks
- **[Smart Contract Development](../contracts/index.md)** - Start building dApps
