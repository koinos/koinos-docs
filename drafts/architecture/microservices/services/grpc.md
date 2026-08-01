# gRPC

> [!IMPORTANT]
> **Internal draft — not published.** The generated service surface and public
> exposure model require release-level verification.

## Purpose

gRPC is a typed protobuf gateway to selected Koinos RPC services. It accepts
gRPC calls, forwards corresponding protobuf RPC requests through RabbitMQ, and
returns typed protobuf responses.

It provides a client protocol and schema, not an independent source of chain
truth.

## Dependencies and inputs

- RabbitMQ for internal RPC.
- Chain as a declared Compose dependency.
- The public gRPC service definitions in `koinos-proto`.
- Any target microservice needed by an exposed method.
- gRPC client requests encoded with the compatible protobuf schema.

The pinned public service definition includes selected methods from Account
History, Block Store, Chain, Contract Meta Store, Mempool, P2P, and Transaction
Store. It does not automatically expose every internal RPC method.

## Outputs, RPCs, and broadcasts

- Typed gRPC responses and status errors.
- Internal protobuf RPC requests to the corresponding target services.
- Method allowlist and denylist behavior in the inspected implementation.

The gateway does not originate consensus broadcasts.

## Persistent state

The inspected gRPC service does not own chain or derived-index databases. Its
state is limited to gateway configuration and in-flight protocol handling.

## Failure and consistency considerations

- A reachable gRPC endpoint can still return target-service unavailability.
- Schema incompatibility can break clients even when the transport is healthy.
- Reads across services can reflect different catch-up positions.
- Retrying a submission after a timeout is method-specific and cannot be
  assumed safe from the gateway layer alone.
- Public-interface security and transport configuration must be verified and
  documented in Node Operators, not inferred from source defaults.

## Verification before publication

- Regenerate or inspect the public gRPC surface for the selected proto revision.
- Confirm method filtering and target-service routing.
- Test protobuf compatibility and error/status translation.
- Verify timeout, message-size, streaming, and connection-lifecycle behavior.
- Establish the intended public security and exposure model with maintainers.
- Confirm behavior when optional index services are absent or catching up.

## Versioned sources

- [`koinos-grpc` inspected revision](https://github.com/koinos/koinos-grpc/tree/3a94c34fa002552ef586cd1af9bfd34d175430d3)
- [`koinos-grpc` service implementation](https://github.com/koinos/koinos-grpc/blob/3a94c34fa002552ef586cd1af9bfd34d175430d3/src/koinos_grpc.cpp)
- [`koinos-proto` public gRPC services](https://github.com/koinos/koinos-proto/blob/f3ba7c54d72ddd7b6898a0e2ab7567dcf60ccd80/koinos/rpc/services.proto)
- [Pinned Compose profile](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
