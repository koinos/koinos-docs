---
icon: fontawesome/solid/cube
---

# Block Producer

Block Producer is an optional service that assembles, signs, and submits blocks
when block production is enabled. A standard Koinos node can validate,
synchronize, and relay the chain without running this service.

## Dependencies and inputs

Block Producer connects to RabbitMQ and depends on:

- Chain for head state, proposal validation, and block submission;
- Mempool for pending transactions and accepted-block processing; and
- P2P gossip status as a network-readiness input when that check is enabled.

It also needs block-signing authority. Signing-key storage and producer
configuration are security-sensitive operator concerns, not Architecture
instructions.

## Outputs and interfaces

The service selects pending transactions, constructs a candidate block, asks
Chain to evaluate the proposal, signs a valid candidate, and submits it back to
Chain. The normal accepted-block path then notifies the rest of the node and
allows P2P to propagate the block.

Block Producer does not make its own block canonical. The proposal still passes
through Chain validation and network fork choice.

## State and consistency

Block Producer does not own chain history. Its decisions depend on a current
Chain head, a compatible Mempool view, and adequate network information. A
running process therefore does not establish that it is eligible to produce or
that its blocks are being accepted.

!!! warning "Production operations"
    Do not use this page to configure production or signing keys. Follow the
    reviewed [block production guide](../../nodes/block-production.md).

## Versioned sources

- [`koinos-block-producer` v1.3.1](https://github.com/koinos/koinos-block-producer/tree/8896d7aabbe9e0d154a5f7860920e95d17fd8cb4)
- [Chain proposal and submission schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/chain/chain_rpc.proto)
- [Current official Compose profile](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
