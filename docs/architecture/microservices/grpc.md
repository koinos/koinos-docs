---
icon: fontawesome/solid/tower-broadcast
---

# gRPC

gRPC is the typed protobuf gateway to selected Koinos RPC services. Clients use
generated protobuf interfaces, while the gateway forwards each request through
RabbitMQ to the microservice that owns the method.

## Dependencies and inputs

The service depends on RabbitMQ, the public gRPC service definitions, and each
internal service required by an exposed method. The public schema contains a
selected API surface; it does not expose every internal RPC used inside the
node.

## Outputs and interfaces

gRPC returns typed protobuf responses and gRPC status errors. Depending on the
enabled services, its methods can query Chain, Block Store, Mempool, P2P,
Transaction Store, Contract Meta Store, and Account History.

The gateway does not originate consensus decisions or maintain a second copy of
chain state.

## State and consistency

gRPC owns protocol and in-flight request state, not blockchain databases. A
reachable gRPC endpoint can still report that its target service is unavailable
or return data from an index that is catching up.

Client and server schemas must be compatible. Retrying a read is different from
retrying a transaction or block submission after an uncertain timeout.

!!! note "Public API operation"
    Transport security, exposure, message limits, and health checks belong in
    the [public API node guide](../../nodes/rpc-node.md).

## Versioned sources

- [`koinos-grpc` v1.1.1](https://github.com/koinos/koinos-grpc/tree/3a94c34fa002552ef586cd1af9bfd34d175430d3)
- [Public gRPC services in `koinos-proto` v2.6.0](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/services.proto)
- [Current official Compose profile](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
