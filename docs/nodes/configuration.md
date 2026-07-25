---
icon: fontawesome/solid/gears
---

# Configuration

Koinos configuration is a versioned deployment bundle, not a collection of
interchangeable files. Operate from the files supplied by the exact selected
[`koinos/koinos`](https://github.com/koinos/koinos) revision instead of
copying a replacement configuration from this documentation.

| File | Purpose | Operator rule |
| --- | --- | --- |
| `.env` | Host paths, published bindings, Compose profiles, image tags | preserve local values and pin image tags |
| `docker-compose.yml` | Services, dependencies, volumes, ports, profiles | review changes between releases |
| `config/config.yml` | Common and service-specific runtime options | change only the setting required by the procedure |
| `config/genesis_data.json` | Initial chain state and chain identity | never edit or mix between networks |
| `config/koinos_descriptors.pb` | Built-in protobuf descriptors | keep matched to JSON-RPC and gRPC binaries |
| `config/rabbitmq.conf` | Internal message broker configuration | keep private and version-compatible |

The documentation baseline is
[`koinos/koinos@8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482).
For a new node, copy `env.example` to `.env` and `config-example` to `config`
from the selected official checkout.

## How settings are applied

`global` values in `config.yml` apply across services. A value under one
service section overrides the global value for that service. Compose mounts
the common files into the containers; `.env` controls host paths, published
bindings, profiles, and image tags.

Review the complete official
[`config-example/config.yml`](https://github.com/koinos/koinos/blob/821674672e699bf56e94d7c0e8bce122e83d1482/config-example/config.yml)
from the same revision as the Compose file.

The most important operator settings are:

| Setting | Operational meaning |
| --- | --- |
| `global.log-level` and `global.log-dir` | log detail and retention location |
| `global.blacklist` | must protect internal write calls such as `block_store.add_block` and `chain.propose_block` |
| `chain.verify-blocks` | verify blocks as they are applied; enable for restored data |
| `p2p.listen` and `p2p.peer` | public listener and seed peers |
| `jsonrpc.listen` | container listener; `.env` controls the host binding |
| `grpc.endpoint` | container listener; `.env` controls the host binding |
| `block_producer.producer` | producer account; configure only in the block-production procedure |
| `block_producer.private-key-file` | hot signing-key filename |

REST has no section in this YAML file. Its image tag and host binding come
from `REST_TAG`, `REST_INTERFACE`, and `REST_PORT` in `.env`.

## Make one reviewed change

Before editing:

```console
cd /opt/koinos
cp .env .env.before-change
cp -R config config.before-change
```

Edit only the intended value, then review and validate:

```console
diff -u .env.before-change .env
diff -ru config.before-change config
docker compose config
```

If validation succeeds, apply the configuration through Compose:

```console
docker compose up -d
docker compose ps
```

Re-run the health checks relevant to the changed service. Keep the preserved
files until the change is proven healthy.

## Dangerous and recovery-only settings

`reset: true` can discard a service database on startup. Never leave it
enabled after a reset and never use a global reset as the first response to
corruption. Follow [Operations and recovery](management.md).

Changing genesis data, fork algorithm, checkpoints, peer identity, producer
address, or private-key filename can change network identity or security
behavior. Review each as a separate operation.

## Upgrade without configuration drift

For every upgrade:

1. record the old and proposed bundle revisions;
2. download the proposed bundle into a separate directory;
3. compare Compose, `.env`, config, genesis, descriptors, profiles, ports, and
   tags;
4. preserve local configuration, peer identity, and producer keys;
5. validate the proposed bundle with `docker compose config`;
6. pull exact pinned images before downtime;
7. stop cleanly and start the reviewed bundle;
8. verify chain ID, head freshness, gossip, containers, disk, and APIs;
9. retain the previous bundle and snapshot until the update is proven healthy.

For the complete sequence, see [Operations and recovery](management.md).
