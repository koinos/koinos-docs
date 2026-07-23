---
hide:
- toc
---

# Getting Started

Welcome to Koinos! This comprehensive guide will take you from blockchain newcomer to confident Koinos developer. Whether you're exploring your first blockchain or building your next dApp, you're in the right place.

## Why Koinos?

Koinos stands out in the blockchain landscape with groundbreaking features designed specifically for developers:

- **:fontawesome-solid-circle-check: Fee-less Transactions** - Build dApps without worrying about gas fees thanks to the innovative Mana system
- **:fontawesome-solid-code: Familiar Languages** - Write smart contracts in AssemblyScript (TypeScript-like) or C++
- **:fontawesome-solid-cubes: Modular Architecture** - Flexible microservices design for seamless upgrades
- **:fontawesome-solid-fire: Proof of Burn** - Unique consensus mechanism ensuring security and decentralization
- **:fontawesome-solid-bolt: High Performance** - Fast transaction processing with low latency

## Quick Start: Your First 5 Minutes

!!! tip "Ready to jump in?"
    **Goal**: Read your first KOIN balance from the blockchain in under 5 minutes.

    Runtime: Node.js 20+. Network: mainnet. Behavior: read-only. The optional
    input is a public Koinos address; a private key is never required.

    <!-- example: getting-started-read-koin-balance -->
    ```javascript title="index.js"
    --8<-- "examples/javascript/getting-started/read-koin-balance/index.js:program"
    ```

    [View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/getting-started/read-koin-balance/index.js) ·
    [Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/getting-started/read-koin-balance?startScript=start)

    **Next**: Follow the complete [Quick Start Guide](../interacting/quick-start.md) to understand this code.

## What Should I Read First?

<div class="grid cards" markdown>

-   :fontawesome-solid-rocket:{ .lg .middle } __New to Blockchain?__

    ---

    Start here to understand blockchain fundamentals and what makes Koinos special.
    
    **Estimated time**: 15 minutes
    
    **Path**:
    
    1. [What is Koinos?](what-is-koinos.md) ⏱️ 5 min
    2. [Accounts, Keys, and Wallets](accounts-keys-wallets.md) ⏱️ 5 min
    3. [Mainnet vs Testnet](mainnet-vs-testnet.md) ⏱️ 5 min

-   :fontawesome-solid-laptop-code:{ .lg .middle } __Experienced Developer?__

    ---

    Jump straight into building with the tools and APIs.
    
    **Estimated time**: 20 minutes
    
    **Path**:
    
    1. [Tooling Overview](tooling-overview.md) ⏱️ 10 min
    2. [Quick Start: Read Data](../interacting/quick-start.md) ⏱️ 5 min
    3. [Submit Transaction](../interacting/submit-transaction.md) ⏱️ 5 min

-   :fontawesome-solid-pen-nib:{ .lg .middle } __Smart Contract Developer?__

    ---

    Ready to build and deploy your own smart contracts.
    
    **Estimated time**: 30 minutes
    
    **Path**:
    
    1. [What is Koinos?](what-is-koinos.md) ⏱️ 5 min
    2. [Tooling Overview](tooling-overview.md) ⏱️ 10 min
    3. [Contract Quick Start](../contracts/quick-start.md) ⏱️ 15 min

</div>

## Learning Path

### :material-numeric-1-circle:{ .lg } Beginner Level

**Foundation concepts for all users**

<div class="grid cards" markdown>

-   :fontawesome-solid-book-open:{ .lg .middle } __Core Concepts__

    ---

    Understand the essential concepts that power Koinos and make it unique in the blockchain ecosystem.

    - [What is Koinos?](what-is-koinos.md) - Platform overview and key features
    - [Accounts, Keys, and Wallets](accounts-keys-wallets.md) - Identity and security basics
    - [Mainnet vs Testnet](mainnet-vs-testnet.md) - Network environments

-   :fontawesome-solid-screwdriver-wrench:{ .lg .middle } __Essential Tools__

    ---

    Get familiar with the core tools you'll use to interact with and build on Koinos.

    - [Tooling Overview](tooling-overview.md) - Koilib, Kondor, and Arkinos
    - [Kondor Wallet](../interacting/kondor-wallet.md) - Browser wallet setup
    - [REST API](../interacting/rest-api.md) - HTTP blockchain access

</div>

### :material-numeric-2-circle:{ .lg } Intermediate Level

**Building and interacting with the blockchain**

<div class="grid cards" markdown>

-   :fontawesome-solid-arrows-rotate:{ .lg .middle } __Blockchain Interaction__

    ---

    Learn to read data and submit transactions to the Koinos blockchain.

    - [Quick Start](../interacting/quick-start.md) - Read your first balance
    - [Read Contract Data](../interacting/read-contract-data.md) - Query smart contracts
    - [Submit Transaction](../interacting/submit-transaction.md) - Send transactions
    - [Multiple Operations](../interacting/multiple-operations.md) - Batch operations

-   :fontawesome-solid-folder-tree:{ .lg .middle } __Common Tasks__

    ---

    Master the everyday operations you'll need for your applications.

    - [Account Balance](../exchanges/account-balance.md) - Check balances
    - [Transfer Tokens](../exchanges/transfer.md) - Send KOIN
    - [Account History](../exchanges/account-history.md) - Transaction history

</div>

### :material-numeric-3-circle:{ .lg } Advanced Level

**Smart contract development and deployment**

<div class="grid cards" markdown>

-   :fontawesome-solid-file-code:{ .lg .middle } __Contract Development__

    ---

    Create, test, and deploy your own smart contracts on Koinos.

    - [Contract Quick Start](../contracts/quick-start.md) - Launch your first token
    - [Contract Storage](../contracts/storage.md) - Data persistence
    - [Deploy Contract](../contracts/deploy-contract.md) - Production deployment
    - [Contract Examples](../contracts/examples.md) - Sample projects

-   :fontawesome-solid-graduation-cap:{ .lg .middle } __Deep Dive__

    ---

    Master advanced concepts for building sophisticated applications.

    - [Call Other Contracts](../contracts/call-other-contracts.md) - Contract interaction
    - [Authorization](../contracts/check-authorization.md) - Security & permissions
    - [System Events](../contracts/system-events.md) - Event handling

</div>

## Key Resources

### Development Tools

<div class="grid cards" markdown>

-   :fontawesome-brands-js:{ .lg .middle } __Koilib__

    ---

    The official JavaScript/TypeScript SDK for interacting with Koinos from web and Node.js applications.

    [:octicons-arrow-right-24: Learn more](tooling-overview.md#koilib)

-   :fontawesome-brands-chrome:{ .lg .middle } __Kondor Wallet__

    ---

    Browser extension wallet for secure key management and dApp integration.

    [:octicons-arrow-right-24: Get started](accounts-keys-wallets.md#kondor-wallet)

-   :fontawesome-solid-terminal:{ .lg .middle } __Arkinos__

    ---

    Smart contract development framework with project templates, build tools, and deployment scripts.

    [:octicons-arrow-right-24: Start building](tooling-overview.md#arkinos)

-   :fontawesome-solid-code:{ .lg .middle } __Koinos CLI__

    ---

    Command-line interface for advanced blockchain operations and automation.

    [:octicons-arrow-right-24: Explore CLI](../exchanges/cli.md)

</div>

### Community & Support

- **Discord**: Join our active community at [discord.koinos.io](https://discord.koinos.io)
- **GitHub**: Explore open source code at [github.com/koinos](https://github.com/koinos)
- **Telegram**: Connect with developers at [telegram.koinos.io](https://telegram.koinos.io)
- **Documentation**: You're already here! Bookmark this site for reference

## Popular Tutorials

Ready to build something? These step-by-step guides will walk you through complete projects:

- **[Frontend dApp Development](../interacting/tutorials/frontend-guide.md)** - Build a web app that interacts with Koinos
- **[Smart Contract Development](../contracts/tutorials/contract-guide.md)** - Create and deploy a custom token
- **[Running a Node](../nodes/running-node.md)** - Set up your own Koinos node

## Next Steps

Choose your path based on your goals:

!!! success "Just Exploring?"
    Start with [What is Koinos?](what-is-koinos.md) to understand the platform basics.

!!! info "Building a dApp?"
    Head to [Interacting with Koinos](../interacting/index.md) to learn blockchain integration.

!!! example "Developing Smart Contracts?"
    Jump to [Smart Contract Development](../contracts/index.md) to start building.

---

**Need help?** Join our [Discord community](https://discord.koinos.io) where developers are always ready to assist!
