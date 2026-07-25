---
icon: fontawesome/solid/globe
---

# REST

REST provides resource-oriented HTTP endpoints, an OpenAPI description, and a
browser-accessible API reference for selected Koinos capabilities.

In the selected official Compose release, REST calls JSON-RPC rather than
connecting directly to RabbitMQ.

## Dependencies and inputs

The service accepts HTTP requests and uses JSON-RPC as its upstream Koinos
provider. Each endpoint therefore also depends on the internal service used by
the underlying JSON-RPC method.

The implementation includes application-level response transformation,
contract ABI data, and optional cache-related components. None of those layers
replaces Chain or an authoritative service.

## Outputs and interfaces

REST returns HTTP responses and publishes an OpenAPI/Swagger description of its
endpoints. It translates higher-level endpoint behavior into one or more
JSON-RPC calls.

## State and consistency

REST does not own canonical blockchain state. Its availability and freshness
depend on JSON-RPC and the downstream services reached by each endpoint.
Application-level transformation or caching can have different freshness
semantics from the Chain head.

The OpenAPI document and runtime must come from the same release so client
expectations do not drift from implemented behavior.

!!! note "Using and operating REST"
    Application examples belong in [Interacting with Koinos](../../interacting/rest-api.md).
    Public exposure and health checks belong in
    [Node Operators](../../nodes/rpc-node.md).

## Versioned sources

- [`koinos-rest` v1.1.1](https://github.com/koinos/koinos-rest/tree/d7f5bc90f11f78af9167e64913a028c00036d134)
- [`koinos-jsonrpc` v1.2.0 upstream](https://github.com/koinos/koinos-jsonrpc/tree/2c9433c67f2f60c920525a6c4bd3e15b0b51d94a)
- [Current official Compose relationship](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
