---
icon: fontawesome/solid/clock-rotate-left
---

# Account History

Account History builds a per-account activity index from accepted blocks,
transactions, receipts, and events. It provides historical queries that do not
belong in Chain's consensus state.

## Dependencies and inputs

The service connects to RabbitMQ and consumes accepted-block and
irreversible-block broadcasts. In the official Compose topology it also depends
on Chain and Block Store, which it uses to determine progress and retrieve
stored blocks while catching up.

Its RPC interface provides paginated account-history lookup.

## State and consistency

The selected release uses a fork-aware Koinos state database backed by RocksDB.
The index can contain recent accepted history that is not yet irreversible and
must follow the selected fork when Chain changes heads.

Account History is a derived view. It can be behind Chain, and it is not
authoritative for a current balance, nonce, or contract state. Pagination over
a moving head can also observe new history between requests.

If the service is unavailable, account-history queries fail while Chain and
block validation can continue.

## Versioned sources

- [`koinos-account-history` v1.1.0](https://github.com/koinos/koinos-account-history/tree/1d592c40ddd06c022eab3153266bd428752c6ded)
- [Account History RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/account_history/account_history_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
