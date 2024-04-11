# Exchange Integration Guide

This guide is intended for use by exchanges when integrating Koinos. It is subject to change as some of the technologies used in this guide are community developed and maintained. There will be a best effort to keep this guide updated and maintained. If you have any additional questions, please do not hesitate to reach out in our [Telegram](https://telegram.koinos.io), [Discord](https://discord.koinos.io), or to an existing contact.

Most of this information may also be useful to dApp developers, but because the target audience are exchanges, there may be large gaps.

---
## Technologies

This guide will use three technologies for interacting with Koinos. They are not equal. Some perform certain jobs better than others, or not at all. What technologies you choose to use are going to be dependent upon your existing application stack and how best to integrate Koinos in to it. If this guide is lacking a feature or some critical component to your integration, please contact us. It may be that we didn't think to document that particular requirement, or we could add it as a feature (depending upon complexity).

---
### Koinos CLI

The [Koinos CLI](./cli.md) is a feature rich command line wallet. It can perform basic and advanced operations on Koinos with ease.

---
### Koilib

[Koilib](./koilib.md) is a Javascript client library for Koinos. It is available via npm for Node projects or can be directly embedded in the browser. It provides full access to the Koinos API as well as transaction creation, signing, and submission.

---
### JSON-RPC

The primary way to access the Koinos API is via [JSON-RPC](./jsonrpc.md). The API grants you full access to all read-only data about Koinos as well as providing mechanism for submitting transfers. The primary drawback of the API is that you must still sign transactions locally using another technology such as the CLI or Koilib.

---
## Common Tasks

Additionally, this guide will provide examples on how to execute tasks on Koinos commonly used by exchanges. Each task will contain a short guide with examples for each technology that can complete the task. If your required task is not covered here or you cannot figure out how to do what you need using these guides, please reach out in Telegram or Discord and we will be happy to assist you.

---
### Retrieve Head Block

It is important to quickly check the state and health of the blockchain. Getting the head block is one of the easiest ways to check this. Learn how to call the API and check the head block.

[Get head block »](head-block.md)

---
### Wallet Creation

Koinos uses the Bitcoin non-compressed address standard. Learn how to create a wallet to interact with Koinos.

[Create a wallet »](create-wallet.md)

---
### Account Balance

Look up the balance of any account and token on Koinos.

[Check balance »](account-balance.md)

---
### Mana (Fees)

Koinos does not have fees, instead it has a regenerative resource called Mana. Learn how to use Mana to transact on Koinos.

[Understand Mana »](mana.md)

---
### Token Transfer

Koinos has an ERC-20 like token standard. Learn how to use it to interact with KOIN and other tokens on Koinos.

[Transfer KOIN »](transfer.md)

---
### Offline Signing

Securing your wallets is important. Learn how to sign transactions offline and submit them on a hot machine.

[Sign offline »](offline-signing.md)

---
### Multisig

As an advanced security feature, some transactions may require multiple signatures. Learn how to sign transactions with multiple signatures for increased security and function.

[Create a multisig transaction »](multisig.md)

---
### Transaction Finality

It is important to know if your transaction is final or not. Learn how to query this information to ensure your transactions cannot be reverted.

[Check transaction finality »](finality.md)

---
### Account History

Need to know what an account has done? Not a problem. Learn how to query an account's history.

[Lookup an account's history »](account-history.md)
