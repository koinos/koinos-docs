# Observer-node examples

These examples target Ubuntu LTS, Bash 4 or newer, Docker Engine, and Docker
Compose v2.

They were verified with the `koinos/koinos` deployment bundle at commit
`821674672e699bf56e94d7c0e8bce122e83d1482`.

## Prepare the official repository

Clone the official repository and pin the recorded revision:

```text
git clone https://github.com/koinos/koinos.git
cd koinos
git checkout 821674672e699bf56e94d7c0e8bce122e83d1482
cp -a config-example config
```

Copy `env.example` from this directory to `.env` in that checkout, then change
`BASEDIR` if `/var/lib/koinos` is not the intended persistent-data location.
The example enables only the private JSON-RPC profile in addition to required
services so that health checks can query the local node. It does not enable
block production, REST, gRPC, or historical indexes.

## Run locally

From this directory:

```text
./preflight.sh /var/lib/koinos
./start-observer.sh /path/to/koinos
./health-check.sh /path/to/koinos /var/lib/koinos
./measure-storage.sh /var/lib/koinos
```

`preflight.sh`, `health-check.sh`, and `measure-storage.sh` are read-only.
`start-observer.sh` changes service state by running `docker compose up -d`, but
it refuses profiles containing `all` or `block_producer`.

The scripts never create keys, broadcast transactions, reset data, or enable
block production.
