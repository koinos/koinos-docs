# Run an observer node

This guide operates the official
[`koinos/koinos`](https://github.com/koinos/koinos) Docker Compose
deployment directly.

The result is a mainnet observer with the required Koinos services and a
private JSON-RPC endpoint for health checks. It does **not** enable block
production, REST, gRPC, or historical indexes.

The commands below use:

- `/opt/koinos` for the checked-out deployment bundle;
- `/var/lib/koinos` for persistent node data;
- a dedicated Linux user that operates Docker.

Choose different absolute paths before starting if those do not match your
host, then use the same paths throughout the procedure.

## 1. Prepare the host

Review [Node requirements](requirements.md). Install Docker Engine and the
Compose plugin using the
[official Ubuntu instructions](https://docs.docker.com/engine/install/ubuntu/).
Do not substitute Docker Desktop instructions on a production server.

Confirm the installed tools, time synchronization, and available disk space:

```console
docker --version
docker compose version
timedatectl status
df -h /var/lib
```

Create the data directory and make the node operator its owner. Replace
`koinos` with the real operator account:

```console
sudo install -d -m 750 -o koinos -g koinos /var/lib/koinos
```

Do not continue until time synchronization is active and the data filesystem
has the planned capacity.

## 2. Select the deployment version

The documentation was verified against commit
[`8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482).
The latest immutable repository release at verification time was
[`v2.2.1`](https://github.com/koinos/koinos/releases/tag/v2.2.1), while the
newer verified commit referenced more recent microservice image tags.

Clone the official repository and check out the exact release or commit you
have selected:

```console
sudo git clone https://github.com/koinos/koinos.git /opt/koinos
sudo chown -R koinos:koinos /opt/koinos
cd /opt/koinos
git checkout 821674672e699bf56e94d7c0e8bce122e83d1482
```

Record the output of `git rev-parse HEAD`. Do not operate a production node
from an unrecorded moving `master` checkout or floating `latest` images.

## 3. Prepare the official configuration

For a new node, copy the configuration supplied by the selected official
bundle:

```console
cd /opt/koinos
cp env.example .env
cp -R config-example config
```

Open `.env` in your usual text editor and review these values:

| Setting | Observer value | Reason |
| --- | --- | --- |
| `BASEDIR` | `/var/lib/koinos` | persistent node data |
| `P2P_INTERFACE` | `0.0.0.0` | accept peers when `8888/tcp` is allowed |
| `JSONRPC_INTERFACE` | `127.0.0.1` | keep the health API private |
| `JSONRPC_PORT` | `8080` | local health endpoint used below |
| `COMPOSE_PROFILES` | `jsonrpc` | add private JSON-RPC only |

Leave RabbitMQ, its administration port, REST, and gRPC on loopback. Keep the
image tags supplied by the selected revision.

!!! danger "Do not use the `all` profile"
    `all` also starts `block_producer`. Block production has separate key and
    irreversible on-chain prerequisites.

If this is an existing node, do not overwrite `.env` or `config/`. Follow the
[update and rollback](management.md#update-and-rollback) procedure instead.

## 4. Validate and start the node

First ask Compose to render the configuration. Read any error before starting
services:

```console
cd /opt/koinos
docker compose config
```

Start the configured observer and display its state:

```console
docker compose up -d
docker compose ps
```

The expected services are `amqp`, `chain`, `mempool`, `block_store`, `p2p`,
and `jsonrpc`. The `block_producer` container must not be present.

## 5. Follow synchronization

Watch the services responsible for receiving and applying blocks:

```console
docker compose logs --tail 100 --follow chain p2p block_store
```

In another terminal, query the local head:

```console
curl --fail http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}'
```

Also verify that P2P gossip is enabled:

```console
curl --fail http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"p2p.get_gossip_status","params":{},"id":1}'
```

During the first synchronization, an old head time is normal. The node is
ready only when:

- all expected containers remain running without a restart loop;
- the head approaches a trusted mainnet endpoint and keeps advancing;
- the reported head time becomes recent;
- P2P gossip is enabled and peers are active;
- logs do not show recurring database, verification, or connectivity errors;
- the data filesystem retains safe free space.

Check data growth directly:

```console
df -h /var/lib/koinos
du -sh /var/lib/koinos/*
```

## Stop and restart safely

Stop cleanly before host maintenance or a consistent data backup:

```console
cd /opt/koinos
docker compose stop
docker compose ps
```

Wait until no Koinos service is running. Start the same configured services
again with:

```console
docker compose up -d
docker compose ps
```

A plain `restart` does not pull newer images and may not apply every Compose
configuration change.

Next:

- [Networks](networks.md)
- [Docker Compose profiles](docker-profiles.md)
- [Security](security.md)
- [Operations](management.md)
