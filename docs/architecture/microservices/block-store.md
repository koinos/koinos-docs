---
icon: fontawesome/solid/database
---

# Block Store

Block Store keeps durable copies of blocks and their receipts. It provides
historical block lookup without making the consensus state database serve as a
block archive.

## Dependencies and inputs

Block Store connects to RabbitMQ and consumes accepted-block information. In the
official Compose topology it starts after RabbitMQ and Chain.

Its RPC interface supports reading blocks by ID or height, reading the highest
stored block, and adding a block to storage.

## Outputs and interfaces

P2P uses Block Store when serving blocks to peers and while coordinating block
synchronization. Account History can also read stored blocks while catching up.
API gateways can expose the lookup methods when Block Store is enabled.

## State and consistency

The selected release stores blocks, receipts, and lookup metadata in BadgerDB.
This is durable blockchain history, but storage does not make a block
canonical. Chain performs consensus validation and fork choice.

The highest block in Block Store and the current Chain head can differ while a
service is starting or catching up. A historical query can therefore be behind
even when Chain itself is healthy.

If Block Store is unavailable, the node can lose historical-query and
peer-serving capabilities, and services that rely on stored blocks may be
unable to catch up.

!!! note "Operating the service"
    Backup, restoration, reindexing, and storage checks are documented under
    [Node Operators](../../nodes/index.md).

## Versioned sources

- [`koinos-block-store` v1.1.0](https://github.com/koinos/koinos-block-store/tree/2bb94558df61c71eb241002635444cdddce0843c)
- [Block Store RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/block_store/block_store_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
