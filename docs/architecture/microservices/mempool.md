---
icon: fontawesome/solid/layer-group
---

# Mempool

Mempool maintains the node's working set of pending transactions. It tracks the
nonces and resource credits reserved by those transactions and supplies
candidate transactions to Block Producer.

A transaction in Mempool has not been included in the canonical chain.

## Dependencies and inputs

Mempool connects to RabbitMQ and coordinates with Chain. It observes:

- transactions accepted or rejected during validation;
- accepted blocks that may include pending transactions or change their
  validity; and
- irreversible blocks that allow old fork state to be discarded.

## Outputs and interfaces

Its RPC interface provides pending-transaction lookup, pending counts, account
nonce checks, and reserved resource-credit information. After accepting a
pending transaction, Mempool broadcasts that updated view. It also forwards a
processed accepted-block event used by Block Producer.

## State and consistency

The selected release uses a fork-aware Koinos state database for working state.
Mempool state is transient relative to the blockchain: transactions can be
included, invalidated by a state change, displaced by a fork, expire, or be
removed under service policy.

Consequently, finding a transaction in Mempool does not guarantee inclusion in
a block. If Mempool is unavailable, transaction queries and block assembly are
affected even though Chain can continue validating blocks received from peers.

## Versioned sources

- [`koinos-mempool` v1.5.0](https://github.com/koinos/koinos-mempool/tree/3f2a276e4b3e4fa37c69031b2f6f707915644086)
- [Mempool RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/mempool/mempool_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
