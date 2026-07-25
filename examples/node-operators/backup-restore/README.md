# Backup and restore examples

These helpers target a mainnet node using the official Koinos multiservice
layout. They do not support the current public testnet because no authoritative
external-operator bundle was available at verification time.

## Inspect first

`fetch-public-backup.sh` downloads the discovery page, metadata, and checksum
to an explicit staging directory. The multi-gigabyte archive is downloaded
only with `--download-archive`.

`inspect-backup.sh` is read-only. It verifies SHA-256, rejects absolute and
parent-traversal members, and requires `chain` and `block_store` directories.

## Restore only after a clean stop and private backup

`restore-backup.sh` defaults to dry-run and accepts only `mainnet`. Apply mode
requires all three independent acknowledgements:

```text
--node-stopped --backup-confirmed --confirm RESTORE_MAINNET
```

The active config must set `chain.verify-blocks: true`. Existing core and index
state is moved to `.pre-restore-TIMESTAMP`; only public `chain` and
`block_store` state is installed. Configuration, P2P identity, wallets,
producer keys, and optional public indexes are never imported.

Run the dry run first:

```text
./restore-backup.sh \
  --archive /srv/koinos-restore/koinos-backup.tar.gz \
  --checksum /srv/koinos-restore/koinos-backup.tar.gz.sha256 \
  --basedir /var/lib/koinos \
  --config /opt/koinos/config/config.yml \
  --network mainnet
```

The apply command is documented on the
[Backup and restore](../../../docs/nodes/backup-restore.md) page. Never test apply
mode against a real basedir; automated tests use disposable fixture
directories.
