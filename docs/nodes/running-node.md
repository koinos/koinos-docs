# Run a Koinos node: Quick Start

This page starts a basic Koinos mainnet node with the default configuration
from the official [`koinos/koinos`](https://github.com/koinos/koinos)
Docker Compose orchestrator.

It starts the required services: `amqp`, `chain`, `mempool`,
`block_store`, and `p2p`. It does not enable block production or the
optional API and index services.

Before starting, install Docker Engine and the Compose plugin using the
[official Ubuntu instructions](https://docs.docker.com/engine/install/ubuntu/).

## 1. Download the current orchestrator

Run these commands as the dedicated operator account. Replace `koinos` in
the ownership command if that account has a different name.

The official repository uses `master` as its default branch:

```console
sudo git clone --branch master --single-branch \
  https://github.com/koinos/koinos.git /opt/koinos
sudo chown -R koinos:koinos /opt/koinos
cd /opt/koinos
git checkout master
git pull --ff-only origin master
```

## 2. Activate the default configuration

Copy the supplied examples without changing their default values:

```console
cd /opt/koinos
test ! -e .env
test ! -e config
cp env.example .env
cp -R config-example config
```

Do not run this new-node shortcut over an existing `.env` or `config/`.
Follow [Update and rollback](management.md#update-and-rollback) instead.

## 3. Start the node

Required services do not need a Compose profile:

```console
cd /opt/koinos
docker compose up -d
docker compose ps
docker compose logs --tail 50 chain p2p block_store
```

The first synchronization can take time. The logs should begin showing block
requests and synchronization progress.

!!! danger "The all profile is not a basic node"

    `docker compose --profile all up -d` also starts `block_producer` plus
    every API and index service. Use `api` only when you intentionally need
    all API services without block production, or follow
    [Block production](block-production.md) before enabling the producer.

## Stop the node

```console
cd /opt/koinos
docker compose stop
docker compose ps
```

The default `BASEDIR` is `~/.koinos`. For a production installation with a
dedicated data path, private health API, configuration validation,
synchronization checks, and operational hardening, continue with
[Advanced setup and verification](running-node-advanced.md).
