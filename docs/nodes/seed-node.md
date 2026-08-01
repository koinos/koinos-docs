---
icon: fontawesome/solid/share-nodes
---

# Run a public Seed Node

A Koinos Seed Node is a standard Koinos node that provides a stable,
publicly reachable P2P entry point for other nodes. New or disconnected nodes
can use its published multiaddr to join the network and discover additional
peers.

A Seed Node is an operating role, not a separate Docker Compose service or
profile. It does not need to produce blocks or publish JSON-RPC, REST, or gRPC.
Normal nodes can also accept inbound peers without being advertised as Seed
Nodes.

Several independently operated seeds improve the number of available entry
points, but one seed cannot guarantee network availability or
decentralization.

## Compare operator roles

Roles are capabilities built on a standard node and are not mutually
exclusive. Combining roles also combines their capacity, exposure, and
security requirements.

| Role | Public interface | Special identity or key | Primary responsibility |
| --- | --- | --- | --- |
| Standard node | P2P may accept inbound peers | P2P identity | Validate and synchronize the chain |
| Public Seed Node | Stable P2P multiaddr, normally `8888/tcp` | Stable P2P seed secret and Peer ID | Provide a reliable bootstrap peer |
| Public API node | HTTPS for selected APIs | TLS and proxy credentials | Serve application traffic safely |
| Block producer | P2P; APIs need not be public | Hot producer key and registered producer authority | Produce and submit blocks |

Do not describe a community-operated seed as an **official seed** merely
because it is reachable. Official or default bootstrap status requires review
and inclusion by the maintainers of the canonical network configuration.

## Prerequisites

Use [Ubuntu on the verified production path](requirements.md) with Docker
Engine and the Compose plugin. Start with the [Quick Start](running-node.md),
then follow [Advanced setup and verification](running-node-advanced.md) for a
dedicated data path, private health API, and production checks.

A public Seed Node also needs:

- a stable public IPv4 address, DNS name, or both;
- inbound TCP forwarding when the server is behind a router;
- no carrier-grade NAT unless the provider supplies working inbound
  forwarding;
- continuous availability and external monitoring;
- sufficient SSD capacity, bandwidth, memory, and file descriptors for the
  expected peer load;
- synchronized system time;
- SSH restricted to known administration sources where possible;
- a second network or server from which to test P2P reachability.

Do not continue until the standard node has the correct chain ID, a fresh and
advancing head, active gossip, and healthy storage.

## Start from a standard node

The required services—`amqp`, `chain`, `mempool`, `block_store`, and `p2p`—are
enough for the Seed Node role. Do not use `--profile all`; it also enables
`block_producer` and every optional API and index service.

A private loopback JSON-RPC service is useful for the health checks below, but
it is not a public Seed Node interface. Configure it as described in the
[advanced standard-node procedure](running-node-advanced.md#3-prepare-the-official-configuration).

## Configure a stable P2P identity

The current
[Koinos P2P implementation](https://github.com/koinos/koinos-p2p/blob/master/internal/node/node.go#L415-L445)
derives its Peer ID deterministically from `p2p.seed`. When the setting is
empty, the service creates a randomized seed. That behavior is sufficient for
an ordinary node but not for a published Seed Node: a restart with a different
Peer ID invalidates the advertised multiaddr.

Generate the secret in an owner-only file without putting it in shell history:

```console
cd /opt/koinos
install -d -m 700 /var/lib/koinos/secrets
umask 077
openssl rand -hex 32 > /var/lib/koinos/secrets/p2p-seed
chmod 600 /var/lib/koinos/secrets/p2p-seed config/config.yml
test "$(stat -c '%a' /var/lib/koinos/secrets/p2p-seed)" = 600
test "$(stat -c '%a' config/config.yml)" = 600
```

Open `/var/lib/koinos/secrets/p2p-seed` and `config/config.yml` in a trusted
local editor. Copy the value into the existing `p2p` section without pasting
the value into a shell command or replacing the canonical `peer` list:

```yaml
p2p:
  listen: /ip4/0.0.0.0/tcp/8888
  seed: REPLACE_IN_EDITOR_FROM_SECURE_FILE
```

Replace the placeholder before continuing. Do not publish the seed string or
include it in Git, screenshots, monitoring output, support messages, or copied
Compose output.

Validate without printing the rendered configuration, then recreate only P2P:

```console
cd /opt/koinos
grep -Eq '^[[:space:]]+seed:[[:space:]]+[^[:space:]]+' config/config.yml
if grep -q 'REPLACE_IN_EDITOR_FROM_SECURE_FILE' config/config.yml; then
  printf 'ERROR: replace the P2P seed placeholder before starting\n' >&2
  exit 1
fi
docker compose config >/dev/null
docker compose up -d --no-deps --force-recreate p2p
docker compose ps p2p
```

Store an encrypted backup of `/var/lib/koinos/secrets/p2p-seed` separately
from the server. Losing the secret changes the Peer ID. Restoring the same
identity on two running hosts can create identity conflicts; stop the old host
before activating a replacement.

For a planned rotation, create a new secret, stop the old identity, update the
published multiaddr and every approved bootstrap list, start P2P, and repeat
all external checks.

## Configure the public listener

In `.env`, publish only the P2P listener required for this role:

```dotenv
P2P_INTERFACE=0.0.0.0
P2P_PORT=8888
```

Keep the matching service setting in `config/config.yml`:

```yaml
p2p:
  listen: /ip4/0.0.0.0/tcp/8888
```

The current official
[`env.example`](https://github.com/koinos/koinos/blob/master/env.example) and
[`docker-compose.yml`](https://github.com/koinos/koinos/blob/master/docker-compose.yml)
map the selected host interface and port to container port `8888`. Confirm the
effective service and host listener:

```console
cd /opt/koinos
docker compose config >/dev/null
docker compose up -d p2p
docker compose ps p2p
p2p_listener="$(sudo ss -lntp | awk '$4 ~ /:8888$/ { print }')"
test -n "$p2p_listener"
printf '%s\n' "$p2p_listener"
```

RabbitMQ `5672`, RabbitMQ administration `15672`, JSON-RPC, REST, and gRPC
must remain closed or bound to loopback unless the host separately implements
the [public API node](rpc-node.md) role.

## Configure firewall, router, and DNS

Keep a second recovery SSH session open and verify that it works before
enabling or changing UFW. Then require an explicit confirmation:

```console
read -r -p 'Type ENABLE after recovery SSH works: ' firewall_confirmation
test "$firewall_confirmation" = ENABLE
sudo ufw allow OpenSSH
sudo ufw allow 8888/tcp comment 'Koinos P2P'
sudo ufw --force enable
sudo ufw status verbose
sudo ss -lntp
```

Also allow `8888/tcp` in any provider or cloud firewall. If the server is
behind a router, forward the chosen external TCP port to the node's internal
P2P port. UFW cannot configure a cloud firewall or router, and a Docker port
mapping does not prove that traffic crosses those layers.

Create an `A` record for the stable public address. DNS does not make a closed
port reachable, and P2P does not require HTTPS or a TLS certificate.

## Build the public multiaddr

A DNS multiaddr has this form:

```text
/dns4/SEED_HOST/tcp/8888/p2p/PEER_ID
```

Without DNS, use `/ip4/PUBLIC_IPV4/tcp/8888/p2p/PEER_ID`.

The P2P log labels the local identity under `My address`. Extract only its
Peer ID, then combine it with the public DNS name or IP. A listen address that
contains `0.0.0.0` is a local wildcard, not a publishable address.

Set `SEED_HOST` to the public DNS name or IPv4 address before running:

```console
: "${SEED_HOST:?Set SEED_HOST to the public DNS name or IPv4 address}"
SEED_PORT="${SEED_PORT:-8888}"
case "$SEED_HOST" in
  0.0.0.0|localhost|127.*)
    printf 'ERROR: %s is not a public Seed Node address\n' "$SEED_HOST" >&2
    exit 1
    ;;
esac

peer_id="$(
  docker compose logs --since 10m --no-color p2p |
    awk '
      /My address:/ { in_address=1; next }
      in_address && match($0, /\/p2p\/[^[:space:]]+/) {
        print substr($0, RSTART + 5, RLENGTH - 5)
        in_address=0
      }
    ' | tail -n 1
)"
test -n "$peer_id"

if [[ "$SEED_HOST" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
  address_protocol=ip4
else
  address_protocol=dns4
fi
public_multiaddr="/${address_protocol}/${SEED_HOST}/tcp/${SEED_PORT}/p2p/${peer_id}"
case "$public_multiaddr" in
  *'/0.0.0.0/'*)
    printf 'ERROR: refusing wildcard multiaddr\n' >&2
    exit 1
    ;;
esac
getent ahostsv4 "$SEED_HOST" >/dev/null
printf '%s\n' "$public_multiaddr"
```

The `My address` value supplies the local Peer ID. Do not mistake an entry
under `Connected peers` for the Seed Node's own identity, and do not copy a
local or wildcard IP from the log into the public multiaddr.

## Verify the Seed Node

### Verify stable identity across a restart

Perform this controlled restart before publishing the multiaddr:

```console
cd /opt/koinos
peer_id_from_logs() {
  docker compose logs --since 15m --no-color p2p |
    awk '
      /My address:/ { in_address=1; next }
      in_address && match($0, /\/p2p\/[^[:space:]]+/) {
        print substr($0, RSTART + 5, RLENGTH - 5)
        in_address=0
      }
    ' | tail -n 1
}
address_count_before="$(
  docker compose logs --since 15m --no-color p2p |
    grep -c 'My address:'
)"
peer_id_before="$(peer_id_from_logs)"
test -n "$peer_id_before"

docker compose restart p2p
for attempt in {1..12}; do
  sleep 10
  address_count_after="$(
    docker compose logs --since 15m --no-color p2p |
      grep -c 'My address:'
  )"
  if (( address_count_after > address_count_before )); then
    break
  fi
done
peer_id_after="$(peer_id_from_logs)"
test "$address_count_after" -gt "$address_count_before"
test "$peer_id_after" = "$peer_id_before"
printf 'stable Peer ID: %s\n' "$peer_id_after"
```

Stop if no new `My address` entry appears or the Peer ID changes.

### Verify public exposure from another network

On a second server or connection, set `SEED_HOST` and run this seed-only
exposure check:

```console
: "${SEED_HOST:?Set SEED_HOST to the public Seed Node DNS name or IPv4 address}"
getent ahostsv4 "$SEED_HOST"
nc -z -w 5 "$SEED_HOST" 8888

for private_port in 5672 15672 8080 3000 50051; do
  if nc -z -w 3 "$SEED_HOST" "$private_port"; then
    printf 'ERROR: unexpected public port %s\n' "$private_port" >&2
    exit 1
  fi
done
printf 'P2P is reachable and private service ports are closed\n'
```

If the same host intentionally has the public API role, verify its HTTPS
proxy separately; do not expose the container API ports directly.

### Verify chain and gossip locally

With private loopback JSON-RPC enabled, run the complete
[synchronization and health procedure](running-node-advanced.md#5-verify-synchronization-and-health).
It must confirm:

- the intended chain ID;
- a fresh head that advances during observation;
- P2P gossip enabled;
- at least one connected peer;
- no container restart loop;
- safe disk headroom.

### Verify a real Koinos peer connection

A successful TCP probe does not prove that the Koinos P2P handshake works.
On a second standard Koinos node:

1. add the new public multiaddr temporarily to that node's `p2p.peer` list;
2. validate its configuration without printing secrets;
3. recreate only its P2P service;
4. verify that the Seed Node's Peer ID appears under `Connected peers`.

After adding the multiaddr with a trusted editor, apply it on the second node:

```console
cd /opt/koinos
docker compose config >/dev/null
docker compose config --services | grep -qx p2p
docker compose up -d --no-deps --force-recreate p2p
docker compose ps p2p
```

Set `TARGET_PEER_ID` to the Seed Node's Peer ID on the second node:

```console
: "${TARGET_PEER_ID:?Set TARGET_PEER_ID to the Seed Node Peer ID}"
connected_peer_lines="$(
  docker compose logs --since 5m --no-color p2p |
    awk '
      /Connected peers:/ { in_peers=1; next }
      in_peers && / - \/.*\/p2p\// { print; next }
      in_peers { in_peers=0 }
    '
)"
test -n "$connected_peer_lines"
printf '%s\n' "$connected_peer_lines" |
  grep -F "/p2p/${TARGET_PEER_ID}"
```

Stop if only TCP succeeds but the Peer ID never appears. Investigate DNS,
NAT, firewall layers, the published Peer ID, network genesis, chain ID, P2P
compatibility, and service logs. Remove the temporary peer entry from the
second node after the test unless it should retain the Seed Node permanently.

## Operate and monitor it

Monitor the same health signals as any production node, plus public
reachability and identity stability:

```console
cd /opt/koinos
docker compose ps
docker compose logs --tail 100 p2p chain block_store
sudo ss -lntp
df -h /var/lib/koinos
du -sh /var/lib/koinos/*
```

Alert on loss of external `8888/tcp` reachability, disabled gossip, stale
chain head, no connected peers, increasing restart counts, DNS changes, high
bandwidth, file-descriptor pressure, memory pressure, or unsafe disk usage.

Use the documented [update and rollback](management.md#update-and-rollback)
procedure. Preserve the encrypted P2P seed secret, but never run two active
hosts with the same identity. Prepare an incident procedure for DNS changes,
host replacement, identity compromise, and coordinated multiaddr rotation.

## Community and official listing

Anyone can operate and publish a community Seed Node. Documentation or
directory inclusion is not an endorsement, audit, or guarantee of continued
availability.

Being reachable does not automatically make a node an official or default
bootstrap peer. Before requesting inclusion in the canonical `p2p.peer` list,
provide maintainers with:

- public DNS name or IP and TCP port;
- Peer ID and complete public multiaddr;
- intended network and verified chain ID;
- expected availability and operator contact;
- external TCP and real Koinos peer-connection evidence;
- monitoring and maintenance expectations.

Maintainers should independently verify the node before changing the
[canonical Koinos configuration](https://github.com/koinos/koinos/blob/master/config-example/config.yml).

Next:

- [Secure the node](security.md)
- [Operate and monitor the node](management.md)
- [Understand P2P architecture](../architecture/microservices/p2p.md)
