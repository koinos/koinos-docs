# Account History

> [!IMPORTANT]
> **Internal draft — not published.** History semantics, fork handling, and
> completeness require release-level verification.

## Purpose

Account History builds a per-account activity index from blockchain data. It
supports historical queries that would be expensive or inappropriate for Chain
to maintain as part of consensus state.

It is a derived, fork-aware view rather than the source of account balances,
nonces, or contract state.

## Dependencies and inputs

- RabbitMQ for internal RPC and block broadcasts.
- Chain and Block Store as declared Compose dependencies.
- Accepted-block broadcasts for new history entries.
- Irreversible-block broadcasts for finality-related index maintenance.
- Stored blocks and receipts needed for catch-up or event interpretation.

Account History is absent from the historical Koinos One microservice
documents, so this draft relies on current official sources.

## Outputs, RPCs, and broadcasts

The pinned protocol revision defines `get_account_history`, including pagination
and ordering fields described by its request and response schemas.

The inspected service is primarily a broadcast consumer and RPC provider. No
Account-History-owned architecture broadcast was identified.

## Persistent state

The inspected implementation uses Koinos state-database components backed by
RocksDB. It stores a derived index associated with account activity and chain
position.

The index must track fork movement correctly and distinguish accepted history
from history made irreversible.

## Failure and consistency considerations

- Account History can be behind Chain while otherwise returning valid older
  entries.
- Non-irreversible entries can change after a fork.
- Pagination across a changing head can produce inconsistent client views
  unless the API provides or the client records a stable boundary.
- “No history” can mean no matching activity or an incomplete index unless
  catch-up status is exposed separately.
- The index is not authoritative for current account state.

## Verification before publication

- Define which operations, events, and affected addresses create history
  entries.
- Verify accepted-block, irreversible-block, fork rollback, and catch-up
  behavior.
- Confirm pagination, ordering, deduplication, and stable-boundary semantics.
- Establish how index progress or incompleteness can be observed.
- Confirm what portions of the index can be rebuilt from Block Store.
- Coordinate account-state explanations with Chain and application API pages.

## Versioned sources

- [`koinos-account-history` inspected revision](https://github.com/koinos/koinos-account-history/tree/1d592c40ddd06c022eab3153266bd428752c6ded)
- [`koinos-account-history` service implementation](https://github.com/koinos/koinos-account-history/blob/1d592c40ddd06c022eab3153266bd428752c6ded/src/koinos_account_history.cpp)
- [`koinos-proto` Account History RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/account_history/account_history_rpc.proto)
- [`koinos-proto` accepted and irreversible block broadcasts](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
- [Pinned Compose service](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
