# Koinos Microservices Architecture — Internal Foundation

> [!IMPORTANT]
> **Internal draft — not published.** These files are technical source material
> for a later Architecture rewrite. They require editorial and maintainer review
> before any content is adapted into `docs/`.

## Purpose

This directory reconstructs a maintainable technical baseline for the original
Koinos microservice architecture. It combines:

- useful structural explanations from the historical Koinos One documents;
- the service topology in a pinned official Koinos Compose revision;
- current service behavior from official service repositories; and
- RPC and broadcast definitions from a pinned `koinos-proto` revision.

The drafts describe architecture, not node operation. They intentionally omit
commands, ports, deployment configuration, key handling, backups, restoration,
and production procedures.

## Draft set

- [Microservices overview](overview.md)
- [Internal messaging](internal-messaging.md)
- [Chain](services/chain.md)
- [Block Store](services/block-store.md)
- [P2P](services/p2p.md)
- [Mempool](services/mempool.md)
- [Transaction Store](services/transaction-store.md)
- [Block Producer](services/block-producer.md)
- [JSON-RPC](services/json-rpc.md)
- [gRPC](services/grpc.md)
- [REST](services/rest.md)
- [Contract Meta Store](services/contract-meta-store.md)
- [Account History](services/account-history.md)

## Common draft template

Every service record uses these sections:

1. Purpose
2. Dependencies and inputs
3. Outputs, RPCs, and broadcasts
4. Persistent state
5. Failure and consistency considerations
6. Verification before publication
7. Versioned sources

The “Verification before publication” section is part of the content, not a
formality. It records claims that still need source, compatibility, or
maintainer confirmation before promotion.

## Source policy

The historical source is
[`koinos-one` commit `e031c91c1525de7683794fcb91d28edeb414a08b`](https://github.com/koinos/koinos-one/tree/e031c91c1525de7683794fcb91d28edeb414a08b/docs/microservices).
It documents AMQP Broker, Block Producer, Block Store, Chain, Contract Meta
Store, JSON-RPC, Mempool, and P2P. It does not document gRPC, Transaction Store,
Account History, or REST.

That material is used only to identify durable concepts and useful explanatory
structure. It is not authoritative for current versions, deployment, topology,
configuration, performance, storage, networking, or operations.

Current facts in this foundation were inspected at these official revisions:

| Repository | Pinned revision | Role in this foundation |
| --- | --- | --- |
| [`koinos/koinos`](https://github.com/koinos/koinos/tree/821674672e699bf56e94d7c0e8bce122e83d1482) | `821674672e699bf56e94d7c0e8bce122e83d1482` | Compose topology and profiles |
| [`koinos/koinos-proto`](https://github.com/koinos/koinos-proto/tree/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80) | `f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80` (`v2.6.0`) | RPC and broadcast contracts |
| [`koinos/koinos-chain`](https://github.com/koinos/koinos-chain/tree/0ae99eced8b585c4145424e9c2a28f667796cc66) | `0ae99eced8b585c4145424e9c2a28f667796cc66` | Chain behavior |
| [`koinos/koinos-block-store`](https://github.com/koinos/koinos-block-store/tree/2bb94558df61c71eb241002635444cdddce0843c) | `2bb94558df61c71eb241002635444cdddce0843c` | Block storage |
| [`koinos/koinos-p2p`](https://github.com/koinos/koinos-p2p/tree/e2267ba230960b5e4100c16ad84c42cfc12eec4b) | `e2267ba230960b5e4100c16ad84c42cfc12eec4b` | Peer networking and synchronization |
| [`koinos/koinos-mempool`](https://github.com/koinos/koinos-mempool/tree/3f2a276e4b3e4fa37c69031b2f6f707915644086) | `3f2a276e4b3e4fa37c69031b2f6f707915644086` | Pending transactions |
| [`koinos/koinos-transaction-store`](https://github.com/koinos/koinos-transaction-store/tree/c8d985ab1b0dd3862fd2d0099f4458ebc6e0920c) | `c8d985ab1b0dd3862fd2d0099f4458ebc6e0920c` | Transaction index |
| [`koinos/koinos-block-producer`](https://github.com/koinos/koinos-block-producer/tree/8896d7aabbe9e0d154a5f7860920e95d17fd8cb4) | `8896d7aabbe9e0d154a5f7860920e95d17fd8cb4` | Block assembly and production |
| [`koinos/koinos-jsonrpc`](https://github.com/koinos/koinos-jsonrpc/tree/2c9433c67f2f60c920525a6c4bd3e15b0b51d94a) | `2c9433c67f2f60c920525a6c4bd3e15b0b51d94a` | JSON-RPC gateway |
| [`koinos/koinos-grpc`](https://github.com/koinos/koinos-grpc/tree/3a94c34fa002552ef586cd1af9bfd34d175430d3) | `3a94c34fa002552ef586cd1af9bfd34d175430d3` | gRPC gateway |
| [`koinos/koinos-rest`](https://github.com/koinos/koinos-rest/tree/d7f5bc90f11f78af9167e64913a028c00036d134) | `d7f5bc90f11f78af9167e64913a028c00036d134` | REST and OpenAPI gateway |
| [`koinos/koinos-contract-meta-store`](https://github.com/koinos/koinos-contract-meta-store/tree/64e803e1db1a9bb2946ae379ddad0e5611442ec5) | `64e803e1db1a9bb2946ae379ddad0e5611442ec5` | Contract metadata index |
| [`koinos/koinos-account-history`](https://github.com/koinos/koinos-account-history/tree/1d592c40ddd06c022eab3153266bd428752c6ded) | `1d592c40ddd06c022eab3153266bd428752c6ded` | Account history index |

These service revisions are the tags selected together by the official
`koinos` bundle's versioned `env.example`. The protobuf descriptions use
`koinos-proto` v2.6.0 and were cross-checked against the descriptor shipped by
that bundle. The [Architecture plan](../ARCHITECTURE_DOCUMENTATION_PLAN.md)
records the verification and publication phases.

## Excluded material

Do not add the following to this foundation:

- Knodel- or Windows-specific setup;
- GarageMQ implementation details;
- image tags, seed addresses, ports, or environment-variable inventories;
- hardware, storage, or performance estimates without current measurements;
- backup, restore, reindex, resync, or recovery procedures;
- block-producer key handling or irreversible transaction examples;
- operator helper scripts or documentation-owned tooling.

Those topics either belong in Node Operators or need their own verified design.
