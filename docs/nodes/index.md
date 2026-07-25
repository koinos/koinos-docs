# Node Operators

This section covers the official Koinos multiservice node distributed by
[`koinos/koinos`](https://github.com/koinos/koinos). Choose a role before
enabling services: the safest starting point is an observer with private local
JSON-RPC for health checks.

The operating procedures were verified on **2026-07-25** against
`koinos/koinos` commit
[`8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482).
That revision is a recorded deployment bundle, not a new immutable release.
See [Configuration](configuration.md)
before installing or upgrading.

## Choose a node role

| Role | Services | Public exposure | Main risk | Start here |
| --- | --- | --- | --- | --- |
| Observer | Required services; optional private JSON-RPC | P2P `8888/tcp` | Disk growth and synchronization | [Run an observer](running-node.md) |
| RPC node | Observer plus selected API services | HTTPS through a reverse proxy | Abuse, capacity, and incorrect port exposure | [Run an RPC node](rpc-node.md) |
| Block producer | Observer plus `block_producer` | P2P; APIs need not be public | Hot key and irreversible PoB actions | [Block production](block-production.md) |

!!! warning "Do not use `all` as a generic quick start"
    The upstream `all` profile includes `block_producer`. Enable only the
    profiles required for the selected role.

<div class="grid cards" markdown>

-   :fontawesome-solid-play:{ .lg .middle } __Observer quick start__

    ---

    Prepare an Ubuntu LTS host, pin the deployment bundle, start the least
    services, and verify head freshness and P2P gossip.

    [:octicons-arrow-right-24: Run an observer](running-node.md)

-   :fontawesome-solid-file-lines:{ .lg .middle } __Requirements__

    ---

    Plan CPU, RAM, SSD capacity, bandwidth, time synchronization, and disk
    headroom for the selected role.

    [:octicons-arrow-right-24: Plan capacity](requirements.md)

-   :fontawesome-solid-globe:{ .lg .middle } __Networks__

    ---

    Keep mainnet, the current public testnet, and legacy Harbinger data,
    identities, keys, and chain IDs separate.

    [:octicons-arrow-right-24: Choose a network](networks.md)

-   :fontawesome-solid-tower-broadcast:{ .lg .middle } __RPC node__

    ---

    Enable JSON-RPC, REST, and gRPC intentionally, with loopback bindings,
    clear reverse-proxy requirements, TLS, and external verification.

    [:octicons-arrow-right-24: Configure RPC](rpc-node.md)

-   :fontawesome-solid-lock:{ .lg .middle } __Security__

    ---

    Apply least-service deployment, binding and firewall controls, proxy
    protections, host hardening, and key separation.

    [:octicons-arrow-right-24: Secure the node](security.md)

-   :fontawesome-solid-list-check:{ .lg .middle } __Operations__

    ---

    Monitor, update, roll back, back up, restore, reindex, resync, and collect
    useful incident evidence.

    [:octicons-arrow-right-24: Operate the node](management.md)

</div>

## Safety classes used in this section

- **Read-only** observes host, service, or chain state.
- **Service-changing** starts, stops, or changes local services.
- **State-destructive** replaces or rebuilds local node data.
- **Irreversible on-chain** changes chain state or consumes assets.

Commands with different safety classes are kept in separate procedures.

## How commands are verified

CI success does **not** mean that every command ran against a real production
node. Verification is recorded at the strongest safe level available:

| Level | What is proven | Examples |
| --- | --- | --- |
| Syntax | The complete console block parses as shell and invokes no documentation-owned helper | every reviewed console block |
| Static configuration | The command or configuration parses against its pinned or declared runtime | Compose services and profiles, nginx configuration |
| Disposable fixture | File-changing behavior succeeds without touching real node data | checksum rejection, archive-path rejection, restore, rollback, reindex/resync moves, key permissions |
| Live read-only | The documented request succeeds without changing chain state | mainnet JSON-RPC/REST, public-backup metadata/range/layout |
| Staging host | The result depends on a synchronized node, real listeners, DNS, firewall, TLS, or service lifecycle | local head advancement, peer logs, external ports, upgrades, reindex/resync, producer start/disable |
| Manual irreversible | Automation is intentionally forbidden | producer registration and KOIN burn |

The internal verifier distinguishes these levels. Only selected commands with
deterministic safe inputs receive fixture or live behavioral execution; all
other copyable console blocks still receive syntax and prohibited-helper
checks.

Before production use, an operator must execute every staging-host command,
observe the stated result, and retain evidence for the actual host, network,
paths, profiles, and deployment revision.
