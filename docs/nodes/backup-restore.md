# Backup and restore

Backups serve different recovery goals. Do not put every class into one
unencrypted archive.

| Class | Examples | Secret? | Recovery use |
| --- | --- | --- | --- |
| Deployment | checked-out revision, `.env`, `config/`, Compose | may contain broker credentials | reproduce reviewed configuration |
| Producer and wallet keys | private key files, wallet files | **yes** | recover authority; encrypt and restrict separately |
| Local identity | P2P state and seed | **yes** | retain stable peer identity |
| Core data | `chain`, `block_store` | no private authority | avoid full P2P resync |
| Optional indexes | transaction, account, contract metadata stores | normally no | avoid index rebuild time |
| Transient state | mempool | no | rebuild; do not rely on it as recovery data |

## Make a private recovery set

Record the network, chain ID, bundle revision, image tags, basedir, owner, and
timestamp. Verify enough free space, stop with `docker compose stop`, and wait
until `docker compose ps` shows no running Koinos services before snapshotting
data. Copy configuration and identities without following paths into another
network's basedir.

Encrypt key and identity backups before copying them off-host. Store the
encryption secret separately, test decryption and restoration in an isolated
directory, and retain more than one recovery generation.

## Public mainnet backup

Verified on **2026-07-25**, the Koinos Foundation seed host exposed a discovery
listing at `https://seed.koinosfoundation.org/backups/` with:

- `koinos-backup.tar.gz`;
- `koinos-backup.tar.gz.metadata`;
- `koinos-backup.tar.gz.sha256`.

The observed metadata dated the snapshot **2026-07-19 02:39:13 UTC**, described
an approximately **57 GB compressed** mainnet archive, and listed core state
plus optional indexes. This is time-sensitive evidence, not a retention
guarantee. Always rediscover the current names and read the current metadata
before downloading.

!!! warning "Do not follow the archive metadata's direct extraction command"
    The current metadata suggests extraction into `/` and ownership as `root`.
    That bypasses staging, path review, least privilege, local-identity
    separation, and recoverable replacement. Use the guarded procedure below.

The fetch helper uses HTTPS and defaults to metadata only. Downloading the full
archive modifies the staging directory and requires substantial free space.

<!-- node-example: fetch-public-backup -->
```bash title="fetch-public-backup.sh"
--8<-- "examples/node-operators/backup-restore/fetch-public-backup.sh:fetch-public-backup"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/backup-restore/fetch-public-backup.sh) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/backup-restore)

## Inspect without extracting

Treat a public archive as untrusted input. The read-only inspector verifies the
published SHA-256, rejects unsafe paths, and confirms that `chain` and
`block_store` are present.

<!-- node-example: inspect-backup -->
```bash title="inspect-backup.sh"
--8<-- "examples/node-operators/backup-restore/inspect-backup.sh:inspect-backup"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/backup-restore/inspect-backup.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/backup-restore)

Review the metadata and full member listing yourself as well. Stop if the
checksum, owner, network, date, layout, or required free space is unclear.

## Stage a mainnet restore

The restore helper supports only the verified public **mainnet** archive. It
requires the active config to set `chain.verify-blocks: true`. Its default
dry-run prints the exact source, target, config, and network without extracting
or replacing data.

**Safety: state-destructive in apply mode.** Apply mode requires an absolute
non-broad basedir, clean-shutdown acknowledgement, private-backup
acknowledgement, and the exact confirmation `RESTORE_MAINNET`.

<!-- node-example: restore-backup -->
```bash title="restore-backup.sh"
--8<-- "examples/node-operators/backup-restore/restore-backup.sh:restore-backup"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/backup-restore/restore-backup.sh) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/backup-restore)

Only `chain` and `block_store` enter the live basedir. Existing core, mempool,
and optional-index directories move to `.pre-restore-TIMESTAMP`. The helper
does not restore public configuration, peer identity, wallets, or producer
keys.

After reviewing the dry run, stop the node and independently verify the private
backup before adding `--apply --node-stopped --backup-confirmed --confirm
RESTORE_MAINNET`.

## Validate and roll back

Before startup, inspect ownership, available space, active `.env`, active
config, genesis data, descriptors, and expected chain ID. Start the selected
profiles, then verify:

- all expected containers remain running;
- local chain ID is mainnet;
- head advances and becomes fresh;
- block verification produces no errors;
- P2P peers and gossip are active;
- disk has safe headroom;
- enabled JSON-RPC, REST, and gRPC probes succeed.

If validation fails, stop cleanly. Move the newly restored `chain` and
`block_store` aside, move the required directories back from
`.pre-restore-TIMESTAMP`, restore the prior reviewed bundle, and re-run the
same health checks. Do not delete either generation until recovery is proven.

The current public testnet has query endpoints but no verified public
external-operator bundle, so this mainnet restore must not be adapted by
substituting testnet or Harbinger files.
