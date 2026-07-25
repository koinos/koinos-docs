# Mempool

> [!IMPORTANT]
> **Internal draft — not published.** Pending-transaction and fork behavior are
> release-sensitive and require maintainer review before publication.

## Purpose

Mempool maintains the node's working set of pending transactions. It tracks
account nonces and reserved resource credits, filters transactions as chain
state changes, and supplies valid pending transactions to Block Producer.

Mempool state is not canonical chain history. It is a fork-aware view of
transactions that might be included in a future block.

## Dependencies and inputs

- RabbitMQ for internal RPC and broadcasts.
- Chain for transaction validation and the current state context.
- Accepted and failed transaction broadcasts.
- Accepted and irreversible block broadcasts that change pending-transaction
  validity or confirm inclusion.
- Pending transactions submitted through Chain and propagated from peers or
  external API callers.

## Outputs, RPCs, and broadcasts

The pinned protocol revision defines methods for:

- checking pending account resources;
- reading pending transactions, including lookup by transaction ID;
- checking an account nonce and reading a pending nonce;
- reading reserved account resource credits; and
- reading the pending transaction count.

The inspected implementation announces mempool acceptance and emits a
Mempool-specific accepted-block routing event used by Block Producer. The exact
payload and ordering relationships need release-level verification.

## Persistent state

The inspected implementation uses Koinos state-database components for
fork-aware working state. Pending transactions are transient relative to
canonical chain state and may be reconstructed or discarded as blocks and forks
change.

Public documentation must not imply that persistence guarantees transaction
inclusion.

## Failure and consistency considerations

- A transaction can leave the Mempool because it was included, became invalid,
  conflicted with account state, expired under policy, or was evicted.
- A successful pending lookup does not guarantee future block inclusion.
- Mempool and Chain must evaluate nonces and resources against compatible state
  contexts.
- Fork changes can make a previously rejected transaction valid again or a
  pending transaction invalid.
- Block Producer can remain running but be unable to assemble an expected
  candidate set when Mempool is unavailable or behind.

## Verification before publication

- Confirm admission, eviction, ordering, expiration, and capacity policy.
- Map each transaction and block broadcast to the state transition it causes.
- Confirm the role and payload of the Mempool-specific accepted-block event.
- Verify restart and reconstruction behavior.
- Confirm which Mempool RPCs are intentionally exposed through each public API.
- Obtain maintainer review for nonce and resource-reservation explanations.

## Versioned sources

- [`koinos-mempool` inspected revision](https://github.com/koinos/koinos-mempool/tree/3f2a276e4b3e4fa37c69031b2f6f707915644086)
- [`koinos-mempool` service implementation](https://github.com/koinos/koinos-mempool/blob/3f2a276e4b3e4fa37c69031b2f6f707915644086/src/koinos_mempool.cpp)
- [`koinos-proto` Mempool RPC definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/mempool/mempool_rpc.proto)
- [`koinos-proto` transaction and block broadcasts](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/broadcast/broadcast.proto)
