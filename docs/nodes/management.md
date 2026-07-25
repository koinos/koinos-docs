---
icon: fontawesome/solid/list-check
---

# Operations and recovery

Operate the node directly through its official Compose project.

A container marked `running` is not enough. Use chain ID, advancing head, head
freshness, gossip, peers, restart state, API probes, disk growth, memory
pressure, and logs as operational evidence.

## Routine health

Run the complete
[synchronization and health procedure](running-node.md#5-prove-synchronization-and-health).
It fails when a required service is absent or restarted, the head is stale or
does not advance, gossip is disabled, or no connected peer is visible.

For a quick bounded view from the official checkout:

```console
cd /opt/koinos
docker compose ps
docker compose logs --tail 100 chain p2p block_store
df -h /var/lib/koinos
du -sh /var/lib/koinos/*
docker stats --no-stream
```

Use `docker compose logs --since` and `--until` for a specific incident
window. Koinos also writes service logs below each service's configured
`log-dir`. Locate and measure them instead of assuming Docker contains the
only history:

```console
find /var/lib/koinos -type f -path '*/logs/*' -print
du -sh /var/lib/koinos/*/logs 2>/dev/null
docker info --format 'Docker logging driver: {{.LoggingDriver}}'
```

Set a space-bounded retention policy for both the service log directories and
the active Docker logging driver. Alert before the filesystem reaches the
documented warning threshold, when the head stops advancing, gossip disables
unexpectedly, peers disappear, or a container repeatedly restarts.

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

Create the proposed checkout and select the reviewed release or commit:

```console
sudo git clone https://github.com/koinos/koinos.git /opt/koinos-next
sudo chown -R koinos:koinos /opt/koinos-next
read -r -p 'Reviewed release tag or commit: ' next_revision
test -n "$next_revision"
git -C /opt/koinos-next checkout "$next_revision"
git -C /opt/koinos-next rev-parse HEAD
```

Record both revisions:

```console
git -C /opt/koinos rev-parse HEAD
git -C /opt/koinos-next rev-parse HEAD
```

Compare the operator-controlled files:

```console
diff -u /opt/koinos/env.example /opt/koinos-next/env.example || true
diff -ru /opt/koinos/config-example /opt/koinos-next/config-example || true
diff -u /opt/koinos/docker-compose.yml \
  /opt/koinos-next/docker-compose.yml || true
diff -u /opt/koinos/env.example /opt/koinos/.env || true
diff -ru /opt/koinos/config-example /opt/koinos/config || true
```

The first three comparisons show upstream changes. The final two show the
current operator's local changes. Use both sets as review input; do not copy
the old configuration blindly.

Create the new active files from the proposed bundle, then use your editor to
apply only the reviewed local values:

```console
cd /opt/koinos-next
cp env.example .env
cp -R config-example config
sudoedit .env
sudoedit config/config.yml
docker compose config
```

Transfer the absolute basedir, loopback bindings, profiles, credentials, peer
settings, and producer configuration deliberately. Preserve the new genesis,
descriptors, RabbitMQ configuration, and required version-specific settings
unless the reviewed upstream diff says otherwise.

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

The following direct procedure reindexes `chain` from the existing
`block_store`. It is **state-destructive** and assumes the standard paths used
throughout this guide.

Stop cleanly, preserve the active configuration and chain state, and record the
recovery directory:

```console
cd /opt/koinos
docker compose stop
docker compose ps

reindex_backup="/var/lib/koinos-before-reindex-$(date -u +%Y%m%dT%H%M%SZ)"
sudo install -d -m 750 -o koinos -g koinos "$reindex_backup"
sudo cp -a /opt/koinos/.env /opt/koinos/config "$reindex_backup/"
sudo cp -a /var/lib/koinos/chain "$reindex_backup/"
printf '%s\n' "$reindex_backup" |
  sudo tee /var/lib/koinos/reindex-rollback-directory.txt
```

Do not continue unless the stopped state and copied directories have been
inspected. Edit `config/config.yml` and set both values only under `chain`:

```yaml
chain:
  reset: true
  verify-blocks: true
```

Review and start the affected service:

```console
cd /opt/koinos
diff -u config/config.yml \
  "$(cat /var/lib/koinos/reindex-rollback-directory.txt)/config/config.yml" ||
  true
docker compose config
docker compose up -d chain
docker compose logs --tail 100 --follow chain
```

Wait for the verified `Resetting database...` message. Then remove
`reset: true` immediately, keep `verify-blocks: true`, and validate the normal
configuration without restarting the reindex:

```console
sudoedit /opt/koinos/config/config.yml
cd /opt/koinos
docker compose config
docker compose up -d
docker compose logs --tail 100 --follow chain p2p
```

The reindex is complete only after `Chain state is synchronized with block
store` appears and the full health procedure passes. If it fails, stop the
node and roll back directly:

```console
cd /opt/koinos
docker compose stop
reindex_backup="$(cat /var/lib/koinos/reindex-rollback-directory.txt)"
failed_reindex="/var/lib/koinos-failed-reindex-$(date -u +%Y%m%dT%H%M%SZ)"
sudo install -d -m 750 -o koinos -g koinos "$failed_reindex"
sudo mv /var/lib/koinos/chain "$failed_reindex/"
sudo mv /opt/koinos/.env "$failed_reindex/env.failed"
sudo mv /opt/koinos/config "$failed_reindex/config.failed"
sudo cp -a "$reindex_backup/chain" /var/lib/koinos/
sudo cp -a "$reindex_backup/.env" /opt/koinos/.env
sudo cp -a "$reindex_backup/config" /opt/koinos/config
docker compose config
docker compose up -d
docker compose ps
```

Keep both recovery generations until the restored node passes the full health
procedure.

### Full resynchronization

Use a full P2P resynchronization only when a narrower repair or a verified
backup restore is unsuitable. With the node stopped, move core and optional
state into a dated preservation directory. Retain config, genesis,
descriptors, P2P identity, and keys. Start the required services against empty
state and monitor the network, chain ID, peers, gossip, head, disk, and logs
throughout synchronization.

Stop the node, prove the intended basedir, and create a recoverable destination:

```console
cd /opt/koinos
docker compose stop
docker compose ps

koinos_basedir=/var/lib/koinos
test "$koinos_basedir" = /var/lib/koinos
test -d "$koinos_basedir"
resync_backup="/var/lib/koinos-before-resync-$(date -u +%Y%m%dT%H%M%SZ)"
sudo install -d -m 750 -o koinos -g koinos "$resync_backup"
printf '%s\n' "$resync_backup" |
  sudo tee "$koinos_basedir/resync-rollback-directory.txt"
```

Move only public and rebuildable service state:

```console
resync_backup="$(cat /var/lib/koinos/resync-rollback-directory.txt)"
for state_dir in \
  chain block_store mempool transaction_store contract_meta_store account_history
do
  if sudo test -e "/var/lib/koinos/$state_dir"; then
    sudo mv "/var/lib/koinos/$state_dir" "$resync_backup/"
  fi
done
```

Do not move `p2p`, `block_producer`, the deployment checkout, `.env`, or
`config`. Confirm that neither the global section nor any service retains
`reset: true`, then validate and start:

```console
cd /opt/koinos
docker compose config
docker compose up -d
docker compose ps
docker compose logs --tail 100 --follow p2p block_store chain
```

Run the full synchronization and health procedure until the head is fresh and
advancing. If rollback is required, use the recorded path:

```console
cd /opt/koinos
docker compose stop
resync_backup="$(cat /var/lib/koinos/resync-rollback-directory.txt)"
failed_resync="/var/lib/koinos-failed-resync-$(date -u +%Y%m%dT%H%M%SZ)"
sudo install -d -m 750 -o koinos -g koinos "$failed_resync"
for state_dir in \
  chain block_store mempool transaction_store contract_meta_store account_history
do
  if sudo test -e "/var/lib/koinos/$state_dir"; then
    sudo mv "/var/lib/koinos/$state_dir" "$failed_resync/"
  fi
  if sudo test -e "$resync_backup/$state_dir"; then
    sudo mv "$resync_backup/$state_dir" /var/lib/koinos/
  fi
done
docker compose config
docker compose up -d
docker compose ps
```

Keep the failed and restored generations until the node passes the full health
procedure.

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
