# Run an observer node

This production path targets Ubuntu LTS, Docker Engine, and Docker Compose v2.
It starts the required Koinos services plus private JSON-RPC for health checks.
It does **not** enable block production, REST, gRPC, or historical indexes.

## 1. Check requirements

Review [Node requirements](requirements.md), then run the complete preflight
script.

**Safety: read-only.** It checks the host, Docker, storage, time status, and
current listeners without installing packages or starting services.

<!-- node-example: observer-preflight -->
```bash title="preflight.sh"
--8<-- "examples/node-operators/observer/preflight.sh:observer-preflight"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer/preflight.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer#run-locally)

Install Docker Engine and the Compose plugin using the
[official Ubuntu instructions](https://docs.docker.com/engine/install/ubuntu/).
Do not replace the server path with Docker Desktop instructions.

## 2. Select an immutable deployment bundle

The examples were verified against commit
[`8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482).
The latest immutable repository release at verification time was
[`v2.2.1`](https://github.com/koinos/koinos/releases/tag/v2.2.1), but `master`
already referenced newer microservice patch tags.

Clone `https://github.com/koinos/koinos.git`, then check out the exact tag or
commit selected for the deployment. Never rely on an unrecorded moving
`master` checkout or floating `latest` images in production.

Copy `config-example` to `config` only in a new checkout. If the node already
exists, follow the [update and rollback](management.md)
procedure instead of overwriting `.env` or `config/`.

## 3. Prepare the basedir and environment

Create an absolute persistent directory such as `/var/lib/koinos`, owned by the
dedicated operator account. Do not reuse a basedir from another network.

Copy the complete environment example below to `.env` in the official Koinos
checkout. Review every value before use.

**Safety: service-changing when installed.** The file pins the image tags from
the verified deployment-bundle revision and keeps every API on loopback.

<!-- node-example: observer-env -->
```dotenv title=".env"
--8<-- "examples/node-operators/observer/env.example:observer-env"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer/env.example) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer#prepare-the-official-repository)

`COMPOSE_PROFILES=jsonrpc` enables only private JSON-RPC in addition to the
required services. Remove the value for a core-only node, but then RPC-based
health checks will be unavailable.

!!! warning "Do not substitute `all`"
    The `all` profile includes `block_producer`. Use the dedicated
    [block-production procedure](block-production.md) when that role is
    intentional.

## 4. Start the observer

The start helper validates the project, reads `COMPOSE_PROFILES`, and refuses
`all` or `block_producer`.

**Safety: service-changing.** It runs `docker compose up -d`.

<!-- node-example: start-observer -->
```bash title="start-observer.sh"
--8<-- "examples/node-operators/observer/start-observer.sh:start-observer"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer/start-observer.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer#run-locally)

Required services are `amqp`, `chain`, `mempool`, `block_store`, and `p2p`.
This path additionally expects `jsonrpc`.

## 5. Verify synchronization and health

A running container is not sufficient evidence of a healthy node. Check:

- expected services are running and not restarting;
- the chain head is recent;
- P2P gossip is enabled;
- the basedir filesystem is below the warning threshold;
- logs show peers and continuing blocks.

**Safety: read-only.**

<!-- node-example: observer-health -->
```bash title="health-check.sh"
--8<-- "examples/node-operators/observer/health-check.sh:observer-health"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer/health-check.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/observer#run-locally)

During initial synchronization, older head time is expected and the health
check can fail until the node catches up. Follow focused logs with
`docker compose logs --tail 100 --follow chain p2p block_store`. The head height
must eventually approach a trusted public endpoint and continue advancing.

## Safe stop and restart

Use `docker compose stop` for a clean stop and wait for the containers to exit
before host maintenance or a consistent data backup. Use
`docker compose up -d` to recreate the selected services after configuration
changes. A plain restart does not pull newer images or apply every Compose
change.

Next:

- [Networks](networks.md)
- [Docker Compose profiles](docker-profiles.md)
- [Security](security.md)
- [Operations](management.md)
