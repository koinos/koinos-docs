# REST

> [!IMPORTANT]
> **Internal draft — not published.** The REST surface, transformations, cache
> behavior, and stability guarantees require dedicated verification.

## Purpose

REST provides HTTP resource-style endpoints, OpenAPI descriptions, and a
browser-accessible API reference for selected Koinos capabilities. At the
inspected Compose revision it is built on top of JSON-RPC rather than connecting
directly to RabbitMQ.

REST is an API presentation layer. It does not own consensus state.

## Dependencies and inputs

- JSON-RPC as the declared upstream service.
- HTTP requests from applications and API explorers.
- Koilib and bundled ABI or application metadata used by the inspected
  implementation to build higher-level responses.
- Optional application dependencies used for name resolution or caching, whose
  exact role requires verification.

REST is absent from the historical Koinos One microservice documents, so this
draft relies on the current official repository and Compose topology.

## Outputs, RPCs, and broadcasts

- REST responses derived from upstream JSON-RPC calls.
- OpenAPI/Swagger descriptions for the implemented HTTP endpoints.
- HTTP status and error translations.

The inspected topology does not show REST publishing internal Koinos
broadcasts.

## Persistent state

REST does not own canonical blockchain state or the authoritative derived
indexes. The inspected repository includes application dependencies that may
support cache or name-resolution behavior. Their persistence, invalidation, and
deployment semantics must be verified before any stronger claim is published.

## Failure and consistency considerations

- REST availability depends on JSON-RPC and the downstream service used by each
  request.
- Higher-level transformation can hide distinctions present in the underlying
  protobuf or JSON-RPC response.
- Generated API descriptions can drift from runtime behavior if they are not
  tested from the same revision.
- Cached or resolved values can have freshness behavior different from the
  Chain head.
- Public HTTP exposure, proxying, TLS, rate limiting, and cache operation belong
  in Node Operators.

## Verification before publication

- Inventory the generated REST/OpenAPI surface at the selected release.
- Map every endpoint to its JSON-RPC and internal-service dependencies.
- Confirm error translation, pagination, response transformation, and versioning
  policy.
- Verify cache, Redis, name-resolution, and invalidation behavior where used.
- Confirm which bundled ABIs are required and how they are updated.
- Test the generated OpenAPI document against the running service.

## Versioned sources

- [`koinos-rest` inspected revision](https://github.com/koinos/koinos-rest/tree/d7f5bc90f11f78af9167e64913a028c00036d134)
- [`koinos-rest` application configuration](https://github.com/koinos/koinos-rest/blob/d7f5bc90f11f78af9167e64913a028c00036d134/app.config.ts)
- [Pinned Compose relationship to JSON-RPC](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/docker-compose.yml)
- [`koinos-jsonrpc` inspected upstream](https://github.com/koinos/koinos-jsonrpc/tree/2c9433c67f2f60c920525a6c4bd3e15b0b51d94a)
