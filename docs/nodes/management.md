---
icon: fontawesome/solid/list-check
---

# Operations and recovery

Operate the node directly through its official Compose project.

A container marked `running` is not enough. Use chain ID, advancing head, head
freshness, gossip, peers, restart state, API probes, disk growth, memory
pressure, and logs as operational evidence.

## Routine health

From the official checkout:

```console
cd /opt/koinos
docker compose ps
docker compose logs --tail 100 chain p2p block_store
```

Query the private JSON-RPC head:

```console
curl --fail http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}'
```

Check storage:

```console
df -h /var/lib/koinos
du -sh /var/lib/koinos/*
```

Use `docker compose logs --since` and `--until` for a specific incident
window. Alert before the filesystem reaches the documented warning threshold,
when the head stops advancing, gossip disables unexpectedly, peers disappear,
or a container repeatedly restarts.

## Clean service control

Stop all configured services cleanly:

```console
docker compose stop
docker compose ps
```

Start or recreate them after a reviewed configuration change:

```console
docker compose up -d
docker compose ps
```

A plain `restart` neither pulls images nor necessarily applies Compose
changes. Restart a single service only when its dependencies and data contract
make that safe.

## Update and rollback

Prepare a new release or recorded deployment commit in a separate checkout.
Do not overwrite the running checkout before comparison.

Record both revisions:

```console
git -C /opt/koinos rev-parse HEAD
git -C /opt/koinos-next rev-parse HEAD
```

Compare the operator-controlled files:

```console
diff -u /opt/koinos/.env /opt/koinos-next/env.example
diff -ru /opt/koinos/config /opt/koinos-next/config-example
diff -u /opt/koinos/docker-compose.yml /opt/koinos-next/docker-compose.yml
```

The differences are input for review, not files to copy blindly. Transfer your
basedir, loopback bindings, profiles, credentials, peer settings, and any
producer configuration deliberately into the new bundle.

Before downtime:

1. record current and proposed revisions, profiles, tags, and image digests;
2. review Compose, `.env`, config, genesis, descriptors, and RabbitMQ changes;
3. validate the proposed bundle with `docker compose config`;
4. pull its exact pinned images;
5. verify free disk space;
6. preserve configuration, encrypted keys, P2P identity, and recoverable data;
7. define rollback triggers and a maintenance window.

Stop the current node, activate the reviewed checkout, and start it:

```console
cd /opt/koinos
docker compose stop
cd /opt/koinos-next
docker compose config
docker compose pull
docker compose up -d
docker compose ps
```

Re-run every health and protocol check. Keep the old checkout, images, and
snapshot until the new deployment has remained healthy.

Rollback is the same controlled operation in reverse: stop cleanly, reactivate
the prior checkout and local configuration, restore the prior data only if the
data format requires it, start, and repeat all validation.

## Choose the least destructive recovery

| Symptom | First action | Escalation |
| --- | --- | --- |
| one service is unresponsive | capture evidence; recreate only that service | restart its dependency set |
| optional index is inconsistent | preserve it; rebuild only that index | rebuild selected API indexes |
| chain state is corrupt but block store is sound | preserve everything; reindex chain state | checksum-verified restore |
| core state is corrupt or unavailable | checksum-verified restore | full P2P resync |
| power loss | preserve files/logs; check filesystem and Docker state | isolate corrupt service data |

Before reindexing, resynchronizing, or replacing data:

1. identify the absolute basedir and network;
2. record the chain ID and active configuration;
3. stop the node cleanly;
4. verify free space;
5. preserve configuration, P2P identity, and every key;
6. move old data to a dated rollback directory instead of deleting it;
7. define the validation and rollback steps.

### Reindex

Reindex replays stored blocks to rebuild derived state. Add `reset: true` only
under the affected service in a copy of the active config, review the diff,
and start only the required service and dependencies. Remove `reset: true`
immediately after initialization consumes it, so a later restart cannot reset
the service again.

Never use a global reset when only `chain`, `transaction_store`,
`contract_meta_store`, or `account_history` needs rebuilding.

### Full resynchronization

Use a full P2P resynchronization only when a narrower repair or a verified
backup restore is unsuitable. With the node stopped, move core and optional
state into a dated preservation directory. Retain config, genesis,
descriptors, P2P identity, and keys. Start the required services against empty
state and monitor the network, chain ID, peers, gossip, head, disk, and logs
throughout synchronization.

### Restore

Use the staged [public backup procedure](backup-restore.md) only when its
network, date, layout, and trust boundary fit the recovery. It accelerates
restoration of public chain data; it is not a source of local identity or
authority.

## Incident evidence

Do not repeatedly restart a failing database. Preserve:

- the exact error and relevant bounded logs;
- `docker compose ps`;
- image tags and digests;
- deployment revision and configuration diff;
- disk, filesystem, and kernel status;
- the last clean shutdown and latest valid head.

Clone or snapshot affected data before experimenting. Report reproducible
evidence through the
[Koinos issue tracker](https://github.com/koinos/koinos/issues), omitting
credentials, private keys, private network details, and sensitive archives.
