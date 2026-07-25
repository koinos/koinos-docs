---
icon: fontawesome/brands/docker
---

# Docker Compose profiles

Required services run without a profile. Optional services are enabled through
the upstream Compose profiles below.

Verified against `koinos/koinos` commit
[`8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482)
on 2026-07-25.

| Profile | Services enabled |
| --- | --- |
| `block_producer` | `block_producer` |
| `jsonrpc` | `jsonrpc` |
| `grpc` | `grpc` |
| `rest` | `rest` and its `jsonrpc` dependency |
| `transaction_store` | `transaction_store` |
| `contract_meta_store` | `contract_meta_store` |
| `account_history` | `account_history` |
| `api` | `jsonrpc`, `grpc`, `rest`, `transaction_store`, `contract_meta_store`, `account_history` |
| `all` | Every optional service, including `block_producer` |

Required services:

- `amqp`
- `chain`
- `mempool`
- `block_store`
- `p2p`

## Select the least profile

- Core observer: leave `COMPOSE_PROFILES` empty.
- Observer with private health API: `COMPOSE_PROFILES=jsonrpc`.
- Full API/index node: `COMPOSE_PROFILES=api`.
- Individual APIs: use `jsonrpc`, `grpc`, or `rest`.
- Producer: follow [Block production](block-production.md) and enable
  `block_producer` intentionally.

Profiles can be set in `.env` or passed with `docker compose --profile`.
Commands that omit `--profile` still honor `COMPOSE_PROFILES` from `.env`.
Inspect `.env` before assuming a command starts only required services.

!!! danger "`all` is not an observer shortcut"
    `all` starts the producer service. It can initialize producer-key state and
    materially changes the threat model, even when producer configuration is
    incomplete.

The recorded profile map is validated automatically against the Compose
fixture under `examples/node-operators/upstream/`.
