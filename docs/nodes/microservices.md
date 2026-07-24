---
icon: fontawesome/solid/circle-nodes
---

# Microservices

The official node is a group of services communicating through RabbitMQ
(AMQP). Docker Compose runs them on one host, persists service data under the
selected `BASEDIR`, and enables optional capabilities through
[profiles](docker-profiles.md).

| Service | Purpose | Required | Profiles | Host port by default |
| --- | --- | :---: | --- | --- |
| [Chain](https://github.com/koinos/koinos-chain) | Validate blocks and maintain chain state | Yes | — | None |
| [Block Store](https://github.com/koinos/koinos-block-store) | Store blocks and receipts | Yes | — | None |
| [P2P](https://github.com/koinos/koinos-p2p) | Peer discovery, synchronization, and gossip | Yes | — | `8888` |
| [Mempool](https://github.com/koinos/koinos-mempool) | Hold pending transactions | Yes | — | None |
| RabbitMQ | Internal message transport | Yes | — | `5672`, management `15672`, both loopback |
| [JSON-RPC](https://github.com/koinos/koinos-jsonrpc) | HTTP JSON-RPC gateway | No | `jsonrpc`, `api`, `all` | `8080`, loopback |
| [gRPC](https://github.com/koinos/koinos-grpc) | Protobuf/gRPC gateway | No | `grpc`, `api`, `all` | `50051`, loopback |
| [REST](https://github.com/koinos/koinos-rest) | REST and Swagger interface backed by JSON-RPC | No | `rest`, `api`, `all` | `3000`, loopback |
| [Transaction Store](https://github.com/koinos/koinos-transaction-store) | Transaction index | No | `transaction_store`, `api`, `all` | None |
| [Contract Meta Store](https://github.com/koinos/koinos-contract-meta-store) | Contract ABI metadata | No | `contract_meta_store`, `api`, `all` | None |
| [Account History](https://github.com/koinos/koinos-account-history) | Per-account history index | No | `account_history`, `api`, `all` | None |
| [Block Producer](https://github.com/koinos/koinos-block-producer) | Build and sign blocks | No | `block_producer`, `all` | None |

## Data and failure boundaries

Core and index services own separate directories below `BASEDIR`. This matters
for capacity planning, backup classes, and deciding whether to restore,
reindex, or resync one service.

Do not expose RabbitMQ to connect services across an untrusted network. The
official single-host deployment expects internal service communication and
loopback host bindings. Multi-host service placement requires a separate
authenticated and encrypted transport design that is outside this quick-start
scope.

For internal architecture details, see
[Microservices architecture](../architecture/microservices.md). For operator
decisions, continue to [Configuration](configuration.md) and
[Security](security.md).
