---
icon: fontawesome/solid/gears
---

# Configuration

Koinos configuration is a versioned deployment bundle, not a collection of
interchangeable files. Keep these files from the same upstream revision and
network:

| File | Purpose | Operator rule |
| --- | --- | --- |
| `.env` | Host paths, published bindings, Compose profiles, image tags | Preserve local changes and pin every image tag |
| `docker-compose.yml` | Services, dependencies, volumes, ports, profiles | Do not edit blindly across releases |
| `config/config.yml` | Common and service-specific runtime options | Review dangerous options separately |
| `config/genesis_data.json` | Initial chain state and chain identity | Never edit or mix between networks |
| `config/koinos_descriptors.pb` | Built-in protobuf descriptors | Must match JSON-RPC/gRPC binaries |
| `config/rabbitmq.conf` | Internal message broker configuration | Keep private; change only with a tested reason |

The verified documentation baseline is
[`koinos/koinos@8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482).
See [Run an observer](running-node.md) for why that newer deployment-bundle
revision is not presented as an immutable stable release.

## Precedence

`global` values in `config.yml` apply across services. A value under a service
section overrides its global value for that service. Compose passes the common
file into the relevant containers; host bindings and image tags come from
`.env`.

The following complete mainnet example retains the critical API blacklist,
uses current filenames and ports, and enables block verification. Block
production remains unconfigured.

**Safety: service-changing when installed.**

<!-- node-example: common-config -->
```yaml title="config.yml"
--8<-- "examples/node-operators/configuration/config.yml:common-config"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/node-operators/configuration/config.yml) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/dev/examples/node-operators/configuration)

Do not copy only this file into a checkout for another network. Start from the
official configuration directory of the exact selected deployment bundle,
compare the example, then preserve `genesis_data.json`, descriptors, RabbitMQ
configuration, peer list, and any local key material.

## Common stable options

The useful operator surface is intentionally smaller than every binary flag:

- `global.log-level`, log formatting, and log directory control observability;
- `global.jobs` changes worker concurrency and should follow measurements;
- `global.blacklist` must continue to include `block_store.add_block` and
  `chain.propose_block` on exposed APIs;
- `chain.verify-blocks` validates blocks as they are applied and is especially
  important during a restore;
- `p2p.listen`, `p2p.peer`, checkpoints, and gossip options control network
  connectivity;
- `jsonrpc.listen` is the container listener; `.env` controls the host binding;
- `grpc.endpoint` is the container listener; `.env` controls the host binding;
- `block_producer.pob-production` is a current production percentage option,
  but it belongs only in the explicit [block-production](block-production.md)
  procedure.

REST has no section in this YAML bundle: its image tag and host binding are
configured through `REST_TAG`, `REST_INTERFACE`, and `REST_PORT` in `.env`, and
Compose points it at the JSON-RPC service.

## Dangerous and recovery-only settings

`reset: true` can discard a service database on startup. Never leave it enabled
after a reset, and do not use a global reset as a first response to corruption.
The safe sequence is: identify the absolute basedir and network, stop cleanly,
verify free space, preserve configuration and keys, take a recoverable
snapshot, stage the operation, confirm the target, and run post-operation
health checks. Follow [Operations and recovery](management.md).

Likewise, changing genesis data, fork algorithm, checkpoints, peer identity,
producer address, or private-key filename can change network identity or
security behavior. Review those changes as separate operations.

## Upgrade without configuration drift

For every upgrade:

1. record the old and proposed bundle revision;
2. download the new bundle into a separate directory;
3. compare Compose, `.env`, all four config assets, profiles, ports, and tags;
4. preserve local `.env`, config, peer identity, and producer key;
5. validate YAML and `docker compose config`;
6. pull the exact pinned images before downtime;
7. stop cleanly, apply the reviewed bundle, and start;
8. verify chain ID, head freshness, gossip, containers, disk, and APIs;
9. retain the previous bundle and data snapshot until the new version is
   proven healthy.

For the full rollback sequence, see [Node management](management.md).
