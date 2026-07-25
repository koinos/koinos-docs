# Transaction Store

> [!IMPORTANT]
> **Internal draft — not published.** Indexing and fork behavior require
> verification against the release selected for public documentation.

## Purpose

Transaction Store builds a transaction lookup index from accepted blocks. It
allows callers to retrieve transactions and their associated block context by
transaction ID without making Chain own a separate query index.

## Dependencies and inputs

- RabbitMQ for internal RPC and accepted-block broadcasts.
- Chain as a declared Compose dependency.
- Accepted blocks and receipts used to populate transaction records.

The service is absent from the historical Koinos One microservice documents, so
this draft relies on current official sources rather than historical prose.

## Outputs, RPCs, and broadcasts

The pinned protocol revision defines `get_transactions_by_id`. The response can
associate requested transaction IDs with stored transaction and block
information according to the protocol schema.

No Transaction-Store-owned architecture broadcast was identified in the
inspected foundation.

## Persistent state

The inspected implementation uses BadgerDB. Its transaction lookup data is a
derived index built from blockchain artifacts and can, in principle, be
reconstructed from a verified block history.

Rebuildability does not guarantee that a live index is complete or current.

## Failure and consistency considerations

- Transaction lookup can be unavailable or behind even when Chain is healthy.
- Accepted blocks that are later displaced by a fork require correct index
  reconciliation.
- Redelivered broadcasts must not create conflicting transaction records.
- A “not found” response can mean absent, not yet indexed, or no longer part of
  the service's selected fork unless the API contract distinguishes those
  cases.
- The index must not be treated as the source of consensus truth.

## Verification before publication

- Confirm fork rollback and irreversible-block handling.
- Confirm catch-up, replay, and write-idempotency behavior.
- Define the completeness semantics of `get_transactions_by_id`.
- Verify which transaction receipt and block metadata fields are stored.
- Confirm whether the index is expected to be rebuildable in supported
  operational workflows without documenting those workflows here.

## Versioned sources

- [`koinos-transaction-store` inspected revision](https://github.com/koinos/koinos-transaction-store/tree/c8d985ab1b0dd3862fd2d0099f4458ebc6e0920c)
- [`koinos-proto` Transaction Store RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/transaction_store/transaction_store_rpc.proto)
- [`koinos-proto` accepted-block broadcast](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
- [Pinned Compose service](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
