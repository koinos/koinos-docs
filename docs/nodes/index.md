# Node Operators

This section covers the official Koinos node composed of microservices and
distributed by [`koinos/koinos`](https://github.com/koinos/koinos). Choose what
the node must do before enabling optional services. The standard starting point
is a node without block production, with private local JSON-RPC for health
checks.

The operating procedures were verified on **2026-07-25** against
`koinos/koinos` commit
[`8216746`](https://github.com/koinos/koinos/commit/821674672e699bf56e94d7c0e8bce122e83d1482).
That revision is a recorded commit, not a new immutable release.
See [Configuration](configuration.md)
before installing or upgrading.

## Choose what the node will do

| Purpose | Services | Public exposure | Main risk | Start here |
| --- | --- | --- | --- | --- |
| Standard node | Required services; optional private JSON-RPC | P2P `8888/tcp` | Disk growth and synchronization | [Run a Koinos node](running-node.md) |
| Public API node | Standard node plus selected API services | HTTPS through a reverse proxy | Abuse, capacity, and incorrect port exposure | [Run a public API node](rpc-node.md) |
| Block producer | Standard node plus `block_producer` | P2P; APIs need not be public | Hot key and irreversible PoB actions | [Block production](block-production.md) |

!!! warning "Do not use `all` as a generic quick start"
    The upstream `all` profile includes `block_producer`. Enable only the
    profiles required for the selected role.

<div class="grid cards" markdown>

-   :fontawesome-solid-play:{ .lg .middle } __Standard node quick start__

    ---

    Prepare an Ubuntu LTS host, select a release or commit, start only the
    required services, and verify synchronization and P2P activity.

    [:octicons-arrow-right-24: Run a Koinos node](running-node.md)

-   :fontawesome-solid-file-lines:{ .lg .middle } __Requirements__

    ---

    Plan CPU, RAM, SSD capacity, bandwidth, time synchronization, and disk
    headroom for the selected services.

    [:octicons-arrow-right-24: Plan capacity](requirements.md)

-   :fontawesome-solid-globe:{ .lg .middle } __Networks__

    ---

    Keep mainnet, the current public testnet, and legacy Harbinger data,
    identities, keys, and chain IDs separate.

    [:octicons-arrow-right-24: Choose a network](networks.md)

-   :fontawesome-solid-tower-broadcast:{ .lg .middle } __Public API node__

    ---

    Enable JSON-RPC, REST, and gRPC intentionally, with loopback bindings,
    clear reverse-proxy requirements, TLS, and external verification.

    [:octicons-arrow-right-24: Publish APIs](rpc-node.md)

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
