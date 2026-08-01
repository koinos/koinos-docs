---
icon: fontawesome/solid/file-code
---

# Contract Meta Store

Contract Meta Store builds a query index for metadata associated with deployed
smart contracts, including their Application Binary Interface (ABI). This lets
tools discover contract methods and types without making Chain maintain a
metadata-oriented index.

## Dependencies and inputs

The service connects to RabbitMQ, starts after Chain in the official Compose
topology, and consumes accepted-block information. It extracts relevant
contract metadata from the accepted chain data it processes.

Its RPC interface provides contract metadata lookup by contract ID.

## State and consistency

The selected release stores its derived index in BadgerDB. The index can lag
Chain while catching up, and metadata observed on a recent accepted fork can
change if that fork is replaced.

An ABI describes how tools can encode and decode a contract interface. Its
presence does not validate the contract or give the metadata independent
consensus authority.

If Contract Meta Store is unavailable, contract metadata lookup fails, but
contract execution and Chain validation continue.

See [Contract ABI](../contract-abi.md) for the format and its architectural
role.

## Versioned sources

- [`koinos-contract-meta-store` v1.1.0](https://github.com/koinos/koinos-contract-meta-store/tree/64e803e1db1a9bb2946ae379ddad0e5611442ec5)
- [Contract Meta Store RPC schema in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/contract_meta_store/contract_meta_store_rpc.proto)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
