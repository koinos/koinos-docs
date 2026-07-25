---
icon: fontawesome/solid/receipt
---

# Transaction Store

Transaction Store builds a lookup index for transactions found in accepted
blocks. It lets clients retrieve transaction and block context by transaction
ID without placing that query index in Chain.

## Dependencies and inputs

Transaction Store connects to RabbitMQ, starts after Chain in the official
Compose topology, and consumes accepted-block data.

Its RPC interface provides transaction lookup by ID. API gateways can expose
that method when the service is running.

## State and consistency

The selected release stores the derived index in BadgerDB. It is not the source
of consensus truth and can be behind Chain while it processes blocks.

Because recent accepted blocks can be replaced by a fork, the index must keep
its view consistent with accepted chain history. A transaction lookup that
returns no result should not be interpreted as proof that the transaction never
existed; the service may be disabled, unavailable, or catching up.

If Transaction Store is unavailable, transaction-by-ID queries fail, but Chain
validation does not depend on that derived index.

## Versioned sources

- [`koinos-transaction-store` v1.1.0](https://github.com/koinos/koinos-transaction-store/tree/c8d985ab1b0dd3862fd2d0099f4458ebc6e0920c)
- [Transaction Store RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/transaction_store/transaction_store_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
