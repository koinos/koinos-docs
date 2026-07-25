---
icon: fontawesome/solid/file-lines
---

# Node requirements

These are capacity-planning starting points for the official Docker Compose
deployment, not permanent guarantees. Measure the selected profiles on the
network you will operate.

Verified on **2026-07-25**:

- the pinned images used by this guide publish Linux `amd64` images;
- a local mainnet `block_store` measurement was approximately 43 GB;
- the public full-node backup dated 2026-07-19 reported 57 GB compressed and
  included core data plus optional indexes.

Those observations make the previous "18 GB current usage" figure obsolete.
They do not predict future growth.

## Planning matrix

| Role | CPU/RAM planning start | Disk planning rule | Notes |
| --- | --- | --- | --- |
| Core observer | 4 modern cores / 8 GB | At least `max(100 GB, 2 × current core data)` on SSD | Required services only |
| Monitored observer | 4 modern cores / 8 GB | Core rule plus JSON-RPC logs | Adds private `jsonrpc` |
| RPC/API node | 8 cores / 16 GB | At least `max(200 GB, 2 × measured selected-profile data)` on SSD | Historical indexes grow independently |
| Block producer | 4–8 cores / 8–16 GB | Observer rule plus encrypted key/config backups | Prioritize reliability and key protection |

Use more capacity for heavy public traffic, retained logs, filesystem
snapshots, or all optional indexes. Do not use swap as a substitute for the
RAM required by the selected workload.

## Host requirements

- Ubuntu 22.04 LTS or 24.04 LTS for the production path in this guide.
- Linux `amd64` for the verified image set. Recheck image manifests before
  using another architecture.
- Docker Engine and Docker Compose v2.
- SSD-backed storage with reliable write latency; avoid a slow USB disk for a
  production basedir.
- Stable bidirectional internet access. Public P2P nodes need inbound
  `8888/tcp`.
- Correct time with NTP synchronization.
- Enough off-host capacity for encrypted configuration and key backups.
- Disk monitoring at 80% warning and 90% critical by default.

## Measure the actual node

**Safety: read-only.** The script rejects broad basedirs and reports filesystem
capacity plus data usage by service.

<!-- node-example: measure-storage -->
```bash title="measure-storage.sh"
--8<-- "examples/node-operators/observer/measure-storage.sh:measure-storage"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/f9f7dd675f4c5cbd9231cd44dbe250e1f79757c2/examples/node-operators/observer/measure-storage.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/f9f7dd675f4c5cbd9231cd44dbe250e1f79757c2/examples/node-operators/observer#run-locally)

Record measurements with the date, block height, enabled profiles, and retained
log policy. Recalculate headroom after enabling `transaction_store`,
`account_history`, or `contract_meta_store`.

## Avoid universal tuning

Do not add fixed `jobs`, swap, or `nofile` overrides without measurements. A
high open-file limit can hide a descriptor leak rather than solve it. Capture
the affected service, descriptor count, sync state, and error before applying a
temporary workload-specific override.
