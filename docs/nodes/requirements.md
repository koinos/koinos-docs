---
icon: fontawesome/solid/file-lines
---

# Node requirements

These values are capacity-planning starting points for the official Docker
Compose deployment, not permanent guarantees. Measure the role and services
you actually operate.

Verified on **2026-07-25**:

- the image set used by this guide publishes Linux `amd64` images;
- a local mainnet `block_store` measurement was approximately 43 GB;
- the public full-node backup dated 2026-07-19 was approximately 57 GB
  compressed and included core data plus optional indexes.

Those observations make the previous “18 GB current usage” figure obsolete.
They do not predict future growth.

## Planning matrix

| Role | CPU/RAM planning start | Disk planning rule | Notes |
| --- | --- | --- | --- |
| Standard node | 4 modern cores / 8 GB | At least `max(100 GB, 2 × current core data)` on SSD | Required services only |
| Standard node with private health API | 4 modern cores / 8 GB | Standard-node rule plus JSON-RPC logs | Adds private `jsonrpc` |
| Public API node | 8 cores / 16 GB | At least `max(200 GB, 2 × measured selected-profile data)` on SSD | Historical indexes grow independently |
| Block producer | 4–8 cores / 8–16 GB | Standard-node rule plus encrypted key/config backups | Prioritize reliability and key protection |

Allow additional capacity for public traffic, retained logs, filesystem
snapshots, or optional indexes. Do not use swap as a substitute for the RAM
required by the workload.

## Host requirements

- Ubuntu 22.04 LTS or 24.04 LTS for the production path in this guide.
- Linux `amd64` for the verified image set. Recheck image manifests before
  using another architecture.
- Docker Engine and Docker Compose v2.
- SSD-backed storage with reliable write latency.
- Stable bidirectional internet access. A public P2P node needs inbound
  `8888/tcp`.
- Correct time with NTP synchronization.
- Off-host capacity for encrypted configuration and key backups.
- Disk monitoring, with 80% warning and 90% critical as useful defaults.

## Check the server

Run the standard host commands directly:

```console
uname -m
docker --version
docker compose version
timedatectl status
df -h /var/lib/koinos
```

After the node has started, measure each service directory:

```console
du -sh /var/lib/koinos/*
```

Record the date, block height, enabled profiles, and log-retention policy with
the measurement. Recalculate headroom after enabling `transaction_store`,
`account_history`, or `contract_meta_store`.

## Avoid universal tuning

Do not add fixed `jobs`, swap, or `nofile` overrides without measurements. A
high open-file limit can hide a descriptor leak rather than solve it. Capture
the affected service, descriptor count, synchronization state, and exact error
before applying a temporary workload-specific override.
