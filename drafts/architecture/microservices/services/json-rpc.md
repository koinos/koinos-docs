# JSON-RPC

> [!IMPORTANT]
> **Internal draft — not published.** Public method exposure, filtering, and
> error behavior must be verified against the selected release.

## Purpose

JSON-RPC is an HTTP gateway between JSON-RPC clients and Koinos microservices.
It translates JSON requests into protobuf RPC messages, routes them to the
target internal service through RabbitMQ, and translates responses back to
JSON.

The gateway exposes service capabilities; it does not own or validate canonical
blockchain state.

## Dependencies and inputs

- RabbitMQ for internal RPC.
- Chain as a declared Compose dependency.
- Protobuf service descriptors used to map JSON method names and payloads.
- Any additional target service required by an enabled method, such as Mempool,
  Block Store, Transaction Store, Contract Meta Store, Account History, or P2P.
- HTTP JSON-RPC requests from clients.

A Compose startup dependency does not guarantee that every optional target
service is available.

## Outputs, RPCs, and broadcasts

- HTTP JSON-RPC responses and protocol-level errors.
- Internal protobuf RPC requests addressed to the service named by the JSON-RPC
  method.
- Mapping of protobuf responses and service errors back to JSON.
- Method allowlist and denylist behavior in the inspected implementation.

JSON-RPC is not expected to originate consensus broadcasts.

## Persistent state

The inspected gateway does not own chain or index databases. It maintains
gateway-level configuration and runtime request state. Any cache, descriptor,
or request-lifecycle state must not be presented as authoritative blockchain
state.

## Failure and consistency considerations

- HTTP availability does not establish that the requested internal service is
  available or caught up.
- A timeout can occur between forwarding a request and receiving its response;
  retry safety depends on the target method.
- Read responses from different services can reflect different catch-up
  positions.
- Method filtering affects the exposed API surface and should be intentional.
- Malformed JSON, protobuf conversion failures, internal RPC errors, and service
  errors need stable error mapping for clients.
- Public exposure, authentication, TLS, rate limiting, and proxy configuration
  are operational topics for Node Operators.

## Verification before publication

- Generate the actually exposed method set from the selected release and its
  configuration.
- Confirm method naming, protobuf-to-JSON conversion, and error mapping.
- Confirm retry semantics for read and submit methods.
- Verify allowlist, denylist, request-size, and timeout behavior.
- Test behavior when an optional target service is absent or behind.
- Coordinate public API examples with the Getting Started chapter rather than
  duplicating them here.

## Versioned sources

- [`koinos-jsonrpc` inspected revision](https://github.com/koinos/koinos-jsonrpc/tree/2c9433c67f2f60c920525a6c4bd3e15b0b51d94a)
- [`koinos-jsonrpc` request mapping](https://github.com/koinos/koinos-jsonrpc/blob/2c9433c67f2f60c920525a6c4bd3e15b0b51d94a/internal/jsonrpc.go)
- [`koinos-proto` public service definitions](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/services.proto)
- [Pinned Compose profile](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
