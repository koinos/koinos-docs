---
icon: fontawesome/solid/list-check
---

# Operations and recovery

Operate from evidence: chain ID, advancing head, head freshness, gossip, peers,
container restart state, API probes, disk growth, memory pressure, and error
logs. A container marked `running` is not enough.

## Routine health and logs

Use the [observer health helper](running-node.md#5-verify-synchronization-and-health)
and [storage measurement](requirements.md#measure-the-actual-node). Follow a
bounded log tail with `docker compose logs --tail 100 --follow chain p2p
block_store`; use `--since` and `--until` for an incident window. Retain
service log directories and host/Docker logs according to a space-bounded
rotation policy.

Alert before disk reaches the documented warning threshold, when the head stops
advancing or becomes stale, when gossip disables unexpectedly, when peers
disappear, or when a container repeatedly restarts.

## Clean service control

Use `docker compose stop` and wait for containers to exit before host
maintenance or a consistent snapshot. Use `docker compose up -d` after
reviewed configuration changes; this recreates services as required. A plain
`restart` neither pulls images nor necessarily applies Compose changes.

Restart one service only when its dependencies and state contract make that
safe. Capture logs and exact versions first, and file an upstream bug report
when behavior suggests a defect.

## Update and rollback

Select an immutable release tag or recorded deployment-bundle commit. Prepare
it in a separate checkout; never overwrite the running checkout before review.
The update planner is read-only.

<!-- node-example: plan-update -->
```bash title="plan-update.sh"
--8<-- "examples/node-operators/operations/plan-update.sh:plan-update"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/dev/examples/node-operators/operations/plan-update.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/dev/examples/node-operators/operations)

Before downtime:

1. record current and proposed revisions, profiles, tags, and image digests;
2. compare Compose, `.env`, config, genesis data, descriptors, and RabbitMQ;
3. merge reviewed local values into the new bundle;
4. validate YAML and `docker compose config`;
5. pull the exact pinned images and inspect failures;
6. verify free space;
7. preserve configuration, encrypted keys, peer identity, and a recoverable
   data snapshot;
8. define rollback triggers and the maintenance window.

Then stop cleanly, activate the new checkout/configuration, and use
`docker compose up -d`. Re-run every health and protocol check. Keep the old
bundle, images, and snapshot until the new deployment has remained healthy.

Rollback means another clean stop, restoration of the prior bundle and local
configuration, restoration of the prior snapshot only if the data format
requires it, startup, and the same chain-ID/head/gossip/API validation.

## Choose recovery depth

Use the least destructive operation supported by evidence:

| Symptom | First action | Escalation |
| --- | --- | --- |
| one service is unresponsive | capture evidence; recreate only that service | restart its dependency set |
| optional index is inconsistent | preserve it; rebuild only that index | rebuild selected API indexes |
| chain state is corrupt but block store is sound | preserve everything; reindex chain state | checksum-verified restore |
| core state is corrupt or unavailable | checksum-verified restore | full P2P resync |
| power loss | preserve files/logs; check filesystem and Docker state | isolate corrupt service data |

Before reindex, resync, or replacement, identify and print the absolute
basedir, network, chain ID, active configuration, and selected directories.
Reject root/home/broad targets. Stop cleanly, verify free space, preserve
configuration and all keys, make a recoverable snapshot, and define rollback.

### Reindex

Reindex replays stored blocks to rebuild selected derived state. Copy the
active config, add `reset: true` only under the single affected service, show
the diff, and start only that service/dependency set. As soon as initialization
has consumed the reset, restore the normal config so a reboot cannot reset it
again. Monitor replay and validate the result before removing the snapshot.

Never use a global reset when only `chain`, `transaction_store`,
`contract_meta_store`, or `account_history` needs rebuilding.

### Full resync

Use a full P2P resync only when a narrower repair or verified backup restore is
not suitable. With the node stopped and a private recovery set proven, move
core and optional state into a timestamped preservation directory rather than
deleting it. Retain configuration, genesis, descriptors, peer identity, and
keys. Start the required services against empty state, then verify network,
chain ID, peers, gossip, advancing head, disk, and APIs throughout the sync.

### Restore

Prefer the staged, checksum-verified
[public backup procedure](backup-restore.md) when its network, date, layout,
and trust boundary fit the recovery goal. It is an acceleration source for
public chain data—not a source of local identity or authority.

## Corruption and incident evidence

Do not repeatedly restart a failing database. Preserve the logs, `docker
compose ps`, image tags/digests, bundle revision, config diff, disk and
filesystem status, kernel messages, last clean shutdown, head data, and exact
error text. Clone or snapshot affected data before experimentation. Test a
repair only on the copy.

Report reproducible evidence through the
[Koinos issue tracker](https://github.com/koinos/koinos/issues), omitting
credentials, private keys, private network details, and archives that may
contain them.
