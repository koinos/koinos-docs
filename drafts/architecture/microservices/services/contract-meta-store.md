# Contract Meta Store

> [!IMPORTANT]
> **Internal draft — not published.** Contract metadata extraction and fork
> behavior must be verified against a coherent release.

## Purpose

Contract Meta Store builds a query index for deployed contract metadata,
including ABI information. It lets API consumers discover contract interfaces
without making Chain maintain a separate metadata-oriented index.

The service indexes on-chain observations; it does not make an ABI correct,
safe, or canonical independently of the block and contract state from which it
was derived.

## Dependencies and inputs

- RabbitMQ for internal RPC and accepted-block broadcasts.
- Chain as a declared Compose dependency.
- Accepted blocks, receipts, and contract events or operations needed to
  recognize metadata changes.

## Outputs, RPCs, and broadcasts

The pinned protocol revision defines `get_contract_meta`, which returns metadata
for a requested contract ID according to the RPC schema.

No Contract-Meta-Store-owned architecture broadcast was identified in the
inspected foundation.

## Persistent state

The inspected implementation uses BadgerDB for its derived metadata index. The
index can lag Chain and may require rebuild or reconciliation after changes in
the selected fork.

ABI meaning and serialization belong in the ABI and Serialization architecture
pages; this service page should focus on how the metadata becomes queryable.

## Failure and consistency considerations

- A missing ABI can mean no metadata was published, the contract is not on the
  selected fork, or the index has not caught up.
- Metadata observed before irreversibility can be affected by a fork.
- Redelivery and replay must not produce conflicting versions.
- Contract updates need a clearly defined “current metadata” rule.
- Consumers should not use metadata presence as a substitute for contract or
  transaction validation.

## Verification before publication

- Confirm exactly which operations or events create and update metadata.
- Verify fork rollback, catch-up, replay, and write-idempotency behavior.
- Define the response semantics for missing, malformed, and superseded ABI data.
- Confirm whether historical metadata versions are retained.
- Coordinate terminology with the future ABI and Smart Contracts pages.

## Versioned sources

- [`koinos-contract-meta-store` inspected revision](https://github.com/koinos/koinos-contract-meta-store/tree/64e803e1db1a9bb2946ae379ddad0e5611442ec5)
- [`koinos-proto` Contract Meta Store RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/contract_meta_store/contract_meta_store_rpc.proto)
- [`koinos-proto` accepted-block and contract-event broadcasts](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
- [Pinned Compose service](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
