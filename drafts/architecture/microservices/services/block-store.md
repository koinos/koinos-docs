# Block Store

> [!IMPORTANT]
> **Internal draft — not published.** Storage and catch-up behavior must be
> rechecked against the release selected for public documentation.

## Purpose

Block Store keeps durable blocks and receipts and serves historical block
lookups. It separates blockchain-artifact storage from the Chain service's
consensus state.

## Dependencies and inputs

- RabbitMQ for internal RPC and broadcasts.
- Chain as a declared Compose dependency at the inspected revision.
- Accepted-block broadcasts used to persist newly accepted blocks and receipts.
- Direct block-add requests supported by the internal RPC contract.

## Outputs, RPCs, and broadcasts

The pinned protocol revision defines Block Store RPC methods for:

- reading blocks by block ID;
- reading blocks by height;
- adding a block; and
- reading the highest stored block.

The service is primarily a broadcast consumer and RPC provider. No
Block-Store-owned consensus broadcast was identified in the inspected
foundation.

## Persistent state

The inspected implementation uses BadgerDB to store blocks, receipts, and lookup
metadata. This data is durable blockchain history, but the service does not
decide which block passes consensus validation.

The relationship between accepted, forked, and irreversible blocks in storage
needs explicit release-level verification before it is explained publicly.

## Failure and consistency considerations

- P2P synchronization and historical queries can fail or lag when Block Store is
  unavailable.
- The highest stored block and Chain's current head describe different service
  states and can temporarily differ.
- Redelivered accepted-block messages must not corrupt block indexes.
- A successful write to Block Store does not by itself make a block canonical.
- Database compatibility and recovery are operational concerns; procedures
  belong in Node Operators.

## Verification before publication

- Confirm how blocks on competing forks are represented and retrieved.
- Confirm message redelivery and write-idempotency behavior.
- Verify the meaning of “highest block” under forks and partial catch-up.
- Verify which receipts and metadata are persisted in the selected release.
- Confirm whether any current service bypasses accepted-block broadcasts and
  uses the add-block RPC in normal operation.

## Versioned sources

- [`koinos-block-store` inspected revision](https://github.com/koinos/koinos-block-store/tree/2bb94558df61c71eb241002635444cdddce0843c)
- [`koinos-proto` Block Store RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/block_store/block_store_rpc.proto)
- [`koinos-proto` block broadcast definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
- [Pinned Compose service](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
