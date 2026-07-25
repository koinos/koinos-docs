---
icon: fontawesome/solid/gears
---

# Configuration

Koinos configuration must stay matched to the checked-out orchestrator.
Operate from the files supplied by the current
[`koinos/koinos`](https://github.com/koinos/koinos) `master` branch instead of
copying replacement files from this documentation.

| File | Purpose | Operator rule |
| --- | --- | --- |
| `.env` | Host paths, published bindings, Compose profiles, image tags | preserve local values and pin image tags |
| `docker-compose.yml` | Services, dependencies, volumes, ports, profiles | review changes between releases |
| `config/config.yml` | Common and service-specific runtime options | change only the setting required by the procedure |
| `config/genesis_data.json` | Initial chain state and chain identity | never edit or mix between networks |
| `config/koinos_descriptors.pb` | Built-in protobuf descriptors | keep matched to JSON-RPC and gRPC binaries |
| `config/rabbitmq.conf` | Internal message broker configuration | keep private and version-compatible |

For a new node, copy `env.example` to `.env` and `config-example` to `config`
from the current official checkout.

## How settings are applied

`global` values in `config.yml` apply across services. A value under one
service section overrides the global value for that service. Compose mounts
the common files into the containers; `.env` controls host paths, published
bindings, profiles, and image tags.

Review the complete official
[`config-example/config.yml`](https://github.com/koinos/koinos/blob/master/config-example/config.yml)
from the same checkout as the Compose file.

## Find current options

Use versioned sources instead of copying a large option table into the
documentation:

| Information | Current source |
| --- | --- |
| host paths, ports, profiles, and image tags | current [`env.example`](https://github.com/koinos/koinos/blob/master/env.example) |
| services, dependencies, mounts, and profile membership | current [`docker-compose.yml`](https://github.com/koinos/koinos/blob/master/docker-compose.yml) |
| shared and service-specific values | current [`config.yml`](https://github.com/koinos/koinos/blob/master/config-example/config.yml) |
| every option accepted by one service image | that selected image's `--help` output |

Inspect what Compose will use without starting the node:

```console
cd /opt/koinos
docker compose config --environment
docker compose config --profiles
docker compose config --services
```

On a test server, inspect the option list supplied by a selected service image:

```console
cd /opt/koinos
docker compose run --rm --no-deps chain --help
docker compose run --rm --no-deps p2p --help
```

`p2p.listen` and `p2p.peer` use
[multiaddr](https://multiformats.io/multiaddr/) strings, which encode the
protocol, address, port, and optionally peer ID in one value. Copy peer
addresses only from the selected network configuration and validate the
complete configuration before starting services.

An advertised [public Seed Node](seed-node.md) also needs a stable P2P identity
and a publishable DNS or IPv4 multiaddr. Its secret `p2p.seed` value must not be
committed or included in copied configuration output.

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

## Make one confirmed change

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
files until the change is verified healthy.

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
2. download the proposed release or commit into a separate directory;
3. compare Compose, `.env`, config, genesis, descriptors, profiles, ports, and
   tags;
4. preserve local configuration, peer identity, and producer keys;
5. validate the proposed checkout with `docker compose config`;
6. pull exact pinned images before downtime;
7. stop cleanly and start the confirmed checkout;
8. verify chain ID, head freshness, gossip, containers, disk, and APIs;
9. retain the previous checkout and snapshot until the update is verified.

For the complete sequence, see [Operations and recovery](management.md).
