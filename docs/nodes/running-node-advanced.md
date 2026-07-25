# Advanced node setup and verification

This procedure expands the [Quick Start](running-node.md) into a production
setup for the official
[`koinos/koinos`](https://github.com/koinos/koinos) Docker Compose
orchestrator.

The result is a standard mainnet node with the required Koinos services and a
private JSON-RPC endpoint for health checks. It does **not** enable block
production, REST, gRPC, or historical indexes.

The commands use:

- `/opt/koinos` for the current official Docker Compose orchestrator and its
  configuration files;
- `/var/lib/koinos` for persistent node data;
- a dedicated Linux user that operates Docker.

Choose different absolute paths before starting if those do not match your
host, then use the same paths throughout the procedure.

## 1. Prepare the host

Review [Node requirements](requirements.md). Install Docker Engine and the
Compose plugin using the
[official Ubuntu instructions](https://docs.docker.com/engine/install/ubuntu/).
Do not substitute Docker Desktop instructions on a production server.

Ubuntu 22.04 LTS and 24.04 LTS are the verified production path in this guide.
The upstream project also supports Docker Compose v2 through Docker Desktop on
macOS and Windows. Those platforms are useful for local evaluation, but the
Linux users, paths, firewall, service management, and recovery commands below
do not apply to them unchanged. Follow the
[official Docker Desktop installation](https://docs.docker.com/desktop/) and
keep platform-specific data separate from a production node.

Confirm the installed tools, time synchronization, and available disk space:

```console
docker --version
docker compose version
curl --version
jq --version
timedatectl status
df -h /var/lib
```

Install `curl` and `jq` from the Ubuntu repositories if either command is
missing:

```console
sudo apt-get update
sudo apt-get install -y curl jq
```

Create the data directory and make the node operator its owner. Replace
`koinos` with the real operator account:

```console
sudo install -d -m 750 -o koinos -g koinos /var/lib/koinos
```

Do not continue until time synchronization is active and the data filesystem
has the planned capacity.

## 2. Download the current orchestrator

The [`koinos/koinos`](https://github.com/koinos/koinos) repository is the
official Docker Compose orchestrator. Its default branch is currently
`master`, not `main`. Clone that branch, check it out explicitly, and update it
with a fast-forward-only pull:

```console
sudo git clone --branch master --single-branch \
  https://github.com/koinos/koinos.git /opt/koinos
sudo chown -R koinos:koinos /opt/koinos
cd /opt/koinos
git checkout master
git pull --ff-only origin master
git status --short --branch
```

`git status` must show `master` synchronized with `origin/master` and no local
changes. Stop if the pull cannot fast-forward or the checkout contains
unexpected modifications; review those differences before starting the node.

## 3. Prepare the official configuration

For a new node, copy the configuration supplied by the selected official
bundle:

```console
cd /opt/koinos
cp env.example .env
cp -R config-example config
```

Open `.env` in your usual text editor and review these values:

| Setting | Standard node value | Reason |
| --- | --- | --- |
| `BASEDIR` | `/var/lib/koinos` | persistent node data |
| `P2P_INTERFACE` | `0.0.0.0` | accept peers when `8888/tcp` is allowed |
| `JSONRPC_INTERFACE` | `127.0.0.1` | keep the health API private |
| `JSONRPC_PORT` | `8080` | local health endpoint used below |
| `COMPOSE_PROFILES` | `jsonrpc` | add private JSON-RPC only |

Leave RabbitMQ, its administration port, REST, and gRPC on loopback. Keep the
image tags supplied by the checked-out orchestrator.

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

Start the configured standard node and display its state:

```console
docker compose up -d
docker compose ps
```

The expected services are `amqp`, `chain`, `mempool`, `block_store`, `p2p`,
and `jsonrpc`. The `block_producer` container must not be present.

## 5. Verify synchronization and health

Watch the services responsible for receiving and applying blocks:

```console
docker compose logs --tail 100 --follow chain p2p block_store
```

During the initial synchronization, these messages are expected:

| Message | Meaning |
| --- | --- |
| `Requesting blocks ... from peer ...` | P2P is downloading historical blocks |
| `Sync block progress - Height: ...` | Block Store is saving synchronized blocks |
| `Sync progress - Height: ...` | Chain is replaying blocks to rebuild current state |
| `Block applied - Height: ...` | Chain is applying blocks near the current head |

The “block time remaining” displayed with `Sync progress` is the difference
between the historical block timestamp and the current chain head. It is not a
wall-clock completion estimate.

In another terminal, verify that every expected service is running, the
producer is absent, and no container restarts or is recreated during a
30-second interval:

```console
(
set -euo pipefail
required_services=(amqp chain mempool block_store p2p jsonrpc)
running_services="$(docker compose ps --status running --services)"
for service in "${required_services[@]}"; do
  printf '%s\n' "$running_services" | grep -qx "$service"
done
! printf '%s\n' "$running_services" | grep -qx block_producer

snapshot_containers() {
  for service in "${required_services[@]}"; do
    container_id="$(docker compose ps --all -q "$service")"
    if [[ -z "$container_id" ]]; then
      printf 'ERROR: missing container for %s\n' "$service" >&2
      return 1
    fi
    status="$(docker inspect --format '{{.State.Status}}' "$container_id")"
    if [[ "$status" != running ]]; then
      printf 'ERROR: %s status is %s\n' "$service" "$status" >&2
      return 1
    fi
    restart_count="$(
      docker inspect --format '{{.RestartCount}}' "$container_id"
    )"
    printf '%s %s %s\n' "$service" "$container_id" "$restart_count"
  done
}

containers_before="$(snapshot_containers)"
sleep 30
containers_after="$(snapshot_containers)"
printf '%s\n' "$containers_after"
test "$containers_before" = "$containers_after"
)
```

The final lines record service, container ID, and restart count. If the command
fails, a required service is missing, is not running, restarted, or was
recreated during the interval. Inspect `docker compose ps --all` and the last
100 service log lines before continuing. A historical non-zero restart count
is acceptable when it remains stable and the service is healthy.

Fetch the local and independently operated mainnet heads, calculate their ages,
and display their heights:

```console
local_head="$(curl --fail --silent --show-error http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}')"
public_head="$(curl --fail --silent --show-error \
  https://api.koinos.io/jsonrpc \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}')"

now_ms="$(($(date +%s) * 1000))"
local_height="$(printf '%s' "$local_head" |
  jq -er '.result.head_topology.height | tonumber')"
public_height="$(printf '%s' "$public_head" |
  jq -er '.result.head_topology.height | tonumber')"
local_time="$(printf '%s' "$local_head" |
  jq -er '.result.head_block_time | tonumber')"
public_time="$(printf '%s' "$public_head" |
  jq -er '.result.head_block_time | tonumber')"
local_age="$(((now_ms - local_time) / 1000))"
public_age="$(((now_ms - public_time) / 1000))"

printf 'local height=%s age=%ss\n' "$local_height" "$local_age"
printf 'public height=%s age=%ss\n' "$public_height" "$public_age"
test "$local_height" -gt 0
test "$local_age" -ge -30
test "$local_age" -le 300
```

During initial synchronization the local age can exceed 300 seconds and the
local height can lag substantially. Repeat the check until the local head is
fresh and close to the public height. Do not use a public height alone as
proof: the local values must come from `127.0.0.1`. The small negative
tolerance permits ordinary clock and block-timestamp skew; a larger negative
age requires a time-synchronization investigation.

Verify that the local height continues to advance:

```console
height_before="$(curl --fail --silent --show-error \
  http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}' |
  jq -er '.result.head_topology.height | tonumber')"
sleep 30
height_after="$(curl --fail --silent --show-error \
  http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}' |
  jq -er '.result.head_topology.height | tonumber')"
printf 'height before=%s after=%s\n' "$height_before" "$height_after"
test "$height_after" -gt "$height_before"
```

Finally, verify gossip and peer activity separately. The public P2P RPC only
reports whether gossip is enabled; it does not return a peer count:

```console
curl --fail --silent --show-error http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"p2p.get_gossip_status","params":{},"id":1}' |
  jq -e '.result.enabled == true'

peer_lines="$(docker compose logs --since 2m --no-color p2p |
  awk '
    /Connected peers:/ { in_peers=1; next }
    in_peers && / - \/.*\/p2p\// { print; next }
    in_peers { in_peers=0 }
  ')"
test -n "$peer_lines"
printf '%s\n' "$peer_lines"
```

The `p2p` service emits its “Connected peers” list once per minute in the
selected version. Only addresses after the `Connected peers` marker count; the
node's own `My address` entry does not. Wait two minutes and investigate P2P
configuration, firewall, DNS, and seed reachability if no peer line appears.

The node is ready only when:

- all expected containers remain running without a restart loop;
- the local head is no more than five minutes old, approaches a trusted
  mainnet height, and advances across the 30-second observation;
- P2P gossip is enabled and the P2P logs show at least one connected peer;
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
