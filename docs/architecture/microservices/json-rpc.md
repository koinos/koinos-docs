---
icon: fontawesome/solid/code
---

# JSON-RPC

JSON-RPC is an HTTP gateway to Koinos microservices. It converts JSON-RPC
method names and JSON values into protobuf RPC messages, routes them through
RabbitMQ, and converts the response back to JSON.

## Dependencies and inputs

The gateway depends on RabbitMQ and on whichever internal service implements a
requested method. Chain is a declared startup dependency, while methods that
query blocks, pending transactions, account history, contract metadata, or
stored transactions require the corresponding optional service.

The selected release loads protobuf descriptors and supports method allowlist
and denylist configuration.

## Outputs and interfaces

JSON-RPC exposes HTTP request and response semantics. It does not validate
blocks or transactions independently; submission methods are forwarded to
Chain, and read methods reflect the state of their target service.

## State and consistency

The gateway does not own chain or index databases. A reachable HTTP endpoint
can still return an internal-service error, and two read methods backed by
different services can reflect different catch-up positions.

After a submission timeout, the gateway cannot by itself establish whether the
target completed the request. Clients should use method-specific retry and
lookup behavior.

!!! note "Public API operation"
    Network exposure, TLS, proxies, request limits, and health checks belong in
    the [public API node guide](../../nodes/rpc-node.md).

## Versioned sources

- [`koinos-jsonrpc` v1.2.0](https://github.com/koinos/koinos-jsonrpc/tree/2c9433c67f2f60c920525a6c4bd3e15b0b51d94a)
- [Public RPC descriptors shipped by the official bundle](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/config-example/koinos_descriptors.pb)
- [Current official Compose profile](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
