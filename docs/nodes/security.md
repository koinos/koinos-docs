# Secure a node

Security starts by deploying the fewest services required for the node's
purpose. A standard node needs core services; a public API host adds `api`;
only a producer enables `block_producer`. The `all` profile is not a safe
shortcut.

## Network exposure by purpose

| Port | Service | Standard node | Public API host | Producer |
| ---: | --- | --- | --- | --- |
| `22/tcp` | SSH | restricted administration source | restricted administration source | restricted administration source |
| `80`, `443/tcp` | reverse proxy | closed | public when needed | closed unless also a public API host |
| `8888/tcp` | P2P | public when accepting peers | public when accepting peers | public when accepting peers |
| `5672/tcp` | RabbitMQ AMQP | loopback only | loopback only | loopback only |
| `15672/tcp` | RabbitMQ management | loopback only | loopback only | loopback only |
| `8080/tcp` | JSON-RPC | loopback only | loopback behind proxy | loopback only |
| `50051/tcp` | gRPC | closed or loopback | loopback behind proxy | closed or loopback |
| `3000/tcp` | REST | closed or loopback | loopback behind proxy | closed or loopback |

Docker-published ports can bypass assumptions about host firewalls. Verify both
the effective Docker bindings and reachability from another host. Follow the
[two-location exposure check](rpc-node.md#4-verify-exposure-from-two-locations).

A [public Seed Node](seed-node.md) deliberately exposes P2P while keeping API
and RabbitMQ ports private. Its stable P2P seed secret requires owner-only
storage, encrypted backup, and incident planning, but it must remain separate
from wallet and producer keys.

## Host and account controls

- Use a dedicated unprivileged Unix account for the checkout and basedir.
- Restrict SSH by source network where possible; use keys, disable password
  authentication after recovery access is verified, and protect privileged
  accounts with MFA at the access layer.
- Keep Ubuntu, Docker Engine, Compose, the reverse proxy, and monitoring agents
  patched through a tested maintenance window.
- Do not add application users to the Docker group; Docker access is
  effectively root access.
- Keep the basedir and configuration unreadable by unrelated users. Producer
  private keys require owner-only permissions.
- Synchronize time and alert when it drifts.

## API boundary

Keep `block_store.add_block` and `chain.propose_block` blacklisted. Terminate
TLS at a maintained proxy, allow only known browser origins, cap request size,
apply rate limits, and set bounded upstream timeouts. Prefer a VPN or
authenticated gateway for non-public clients.

Never publish RabbitMQ or its management UI. Replace default broker credentials
for a remotely administered deployment, store them outside version control,
and update the Koinos AMQP URL consistently. A password alone does not make a
public AMQP listener safe.

Apply the
[reverse-proxy requirements](rpc-node.md#3-publish-through-a-reverse-proxy)
before reload, then test JSON-RPC, REST, Swagger assets, gRPC, CORS preflight,
rate limiting, and certificate renewal from outside the host.

## Supply chain and change control

- Deploy an immutable Koinos repository tag or commit and record it.
- Pin every microservice image tag; never depend on `latest`.
- Review upstream release notes and configuration diffs before pulling.
- Record image digests after pull when your deployment process supports digest
  pinning.
- Preserve the last known-good bundle and a rollback snapshot until health,
  chain ID, and advancing head are verified.

## Keys, backups, and incident readiness

Wallet keys and producer keys serve different purposes and should not be the
same key. Keep producer keys only on the producer host, with owner-only
permissions. Encrypt off-host backups, control access separately from the
server, and test restore procedures in an isolated location.

Back up these items according to their sensitivity:

- selected release or commit and confirmed local configuration;
- wallet and producer keys, encrypted and separately access-controlled;
- P2P identity if stable peer identity matters;
- core chain and block-store data;
- optional indexes, which can be rebuilt but may take substantial time.

A public blockchain backup is untrusted input for local restoration. Verify its
checksum and layout; never import its peer identity, configuration, wallets, or
producer keys. See [Backup and restore](backup-restore.md).

Prepare an incident checklist before an outage: responsible contacts,
monitoring signals, clean-stop procedure, known-good versions, encrypted key
recovery, snapshot locations, rollback criteria, and a second host from which
external exposure can be tested.
