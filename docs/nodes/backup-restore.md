# Backup and restore

This chapter gives a direct, staged procedure for recovering a Koinos node.

The public backup is useful for avoiding a full mainnet synchronization. It is
not a replacement for your private configuration, peer identity, wallet, or
producer-key backups.

The example paths below are:

- `/opt/koinos`: the official deployment checkout;
- `/var/lib/koinos`: the active node data;
- `/srv/koinos-restore`: temporary download and extraction space.

Confirm your real paths in `.env` before running any command. Do not adapt this
procedure to another network.

## What to back up privately

Keep separate recovery copies according to their sensitivity:

| Data | Typical location | Recovery purpose |
| --- | --- | --- |
| deployment and configuration | checkout, `.env`, `config/` | reproduce the reviewed node |
| producer and wallet keys | operator-defined key storage | recover authority |
| P2P identity | `BASEDIR/p2p` | retain the peer identity |
| core public data | `BASEDIR/chain`, `BASEDIR/block_store` | avoid a full synchronization |
| optional indexes | transaction, account, contract metadata stores | avoid index rebuild time |

Encrypt keys and identities before copying them off-host. Store the decryption
secret separately and test a restoration in an isolated directory.

## About the public mainnet backup

Verified on **2026-07-25**, the Koinos Foundation seed host published:

- `koinos-backup.tar.gz`;
- `koinos-backup.tar.gz.metadata`;
- `koinos-backup.tar.gz.sha256`.

The observed metadata dated the snapshot **2026-07-19 02:39:13 UTC** and
reported approximately **57 GB compressed**. Always open the current
[backup directory](https://seed.koinosfoundation.org/backups/) and read the
current metadata before downloading. The filename, size, date, checksum, and
layout can change.

!!! warning "Do not extract the archive directly into `/`"
    The published metadata currently shows a direct extraction command. Do
    not use it. First verify the checksum and archive paths, extract into a
    staging directory, and install only `chain` and `block_store`.

## 1. Prepare enough space

You need room for:

- the compressed archive;
- the extracted `chain` and `block_store`;
- the previous local data retained for rollback.

Check both the active data filesystem and staging filesystem:

```console
df -h /var/lib/koinos /srv
du -sh /var/lib/koinos
```

Create a staging directory owned by the node operator:

```console
sudo install -d -m 750 -o koinos -g koinos /srv/koinos-restore
cd /srv/koinos-restore
```

Replace `koinos` with the real operator account.

## 2. Download the metadata and backup

Download the three current files directly from the Foundation seed:

```console
curl --fail --location --remote-name \
  https://seed.koinosfoundation.org/backups/koinos-backup.tar.gz.metadata
curl --fail --location --remote-name \
  https://seed.koinosfoundation.org/backups/koinos-backup.tar.gz.sha256
curl --fail --location --continue-at - --remote-name \
  https://seed.koinosfoundation.org/backups/koinos-backup.tar.gz
```

`--continue-at -` allows `curl` to resume an interrupted large download.

Read the metadata before continuing:

```console
less koinos-backup.tar.gz.metadata
```

Stop if it does not describe the intended mainnet backup or if you cannot
provide the required free space.

## 3. Verify the download and archive paths

Extract the published digest and make `sha256sum` verify the local filename:

```console
published_sha="$(awk 'NR == 1 {print $1}' \
  koinos-backup.tar.gz.sha256)"
[[ "$published_sha" =~ ^[0-9a-fA-F]{64}$ ]]
printf '%s  %s\n' "$published_sha" koinos-backup.tar.gz |
  sha256sum --check -
```

Expect `koinos-backup.tar.gz: OK`. The conversion is necessary because the
published checksum currently contains the seed host's absolute source path.

Write the archive member names without extracting anything:

```console
tar -tzf koinos-backup.tar.gz > archive-members.txt
test -s archive-members.txt
```

Reject absolute paths, parent traversal, and link entries automatically, then
require the two public state directories:

```console
(
set -euo pipefail
if LC_ALL=C grep -Eq '(^/|(^|/)\.\.(/|$))' archive-members.txt; then
  printf 'ERROR: unsafe archive member path\n' >&2
  exit 1
fi
if tar -tvzf koinos-backup.tar.gz |
  awk 'substr($1, 1, 1) == "l" || substr($1, 1, 1) == "h" { found=1 }
       END { exit !found }'
then
  printf 'ERROR: archive contains link entries\n' >&2
  exit 1
fi
grep -q '^\.koinos/chain/' archive-members.txt
grep -q '^\.koinos/block_store/' archive-members.txt
)
```

Review the bounded beginning and end of the accepted listing:

```console
sed -n '1,40p' archive-members.txt
tail -n 40 archive-members.txt
```

If the current archive uses a different layout, stop and review the procedure
instead of guessing new extraction paths.

## 4. Stop the node and preserve local state

Before stopping, reject an unexpected target and verify that the running node
and the trusted public endpoint have the same chain ID:

```console
(
set -euo pipefail
koinos_basedir=/var/lib/koinos
restore_stage=/srv/koinos-restore
case "$koinos_basedir" in
  ""|/|/home|/var|/var/lib) exit 1 ;;
esac
test -d "$koinos_basedir"
test -d "$restore_stage"

local_chain_id="$(curl --fail --silent --show-error \
  http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_chain_id","params":{},"id":1}' |
  jq -er '.result.chain_id')"
mainnet_chain_id="$(curl --fail --silent --show-error \
  https://api.koinos.io/jsonrpc \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_chain_id","params":{},"id":1}' |
  jq -er '.result.chain_id')"
printf 'local chain ID:   %s\n' "$local_chain_id"
printf 'mainnet chain ID: %s\n' "$mainnet_chain_id"
test "$local_chain_id" = "$mainnet_chain_id"
)
```

From the official checkout, stop the node cleanly:

```console
cd /opt/koinos
docker compose stop
docker compose ps
```

Wait until no Koinos service is running.

Create and record a unique rollback directory:

```console
rollback_dir="/var/lib/koinos-before-restore-$(date -u +%Y%m%dT%H%M%SZ)"
sudo install -d -m 750 -o koinos -g koinos "$rollback_dir"
printf '%s\n' "$rollback_dir" \
  > /srv/koinos-restore/rollback-directory.txt
```

Display the target and stop if it is not exactly the new directory just
created:

```console
rollback_dir="$(cat /srv/koinos-restore/rollback-directory.txt)"
printf 'active data: %s\nrollback data: %s\n' \
  /var/lib/koinos "$rollback_dir"
test -d "$rollback_dir"
test ! -e "$rollback_dir/chain"
test ! -e "$rollback_dir/block_store"
```

Move current public and rebuildable state there:

```console
rollback_dir="$(cat /srv/koinos-restore/rollback-directory.txt)"
for state_dir in \
  chain block_store mempool transaction_store account_history contract_meta_store
do
  if sudo test -e "/var/lib/koinos/$state_dir"; then
    sudo mv "/var/lib/koinos/$state_dir" "$rollback_dir/"
  fi
done
```

Do **not** move or replace:

- `.env` or the deployment checkout;
- `config/`;
- the local `p2p` directory;
- wallets or producer keys.

## 5. Extract only the core public data

Return to the staging directory and create an empty extraction target:

```console
cd /srv/koinos-restore
mkdir extracted
```

Extract only the two paths confirmed in the listing:

```console
tar -xzf koinos-backup.tar.gz -C extracted \
  .koinos/chain .koinos/block_store
```

Copy the staged core data into the active basedir:

```console
sudo cp -a extracted/.koinos/chain /var/lib/koinos/
sudo cp -a extracted/.koinos/block_store /var/lib/koinos/
sudo chown -R --reference=/var/lib/koinos \
  /var/lib/koinos/chain /var/lib/koinos/block_store
```

Before startup, require `chain.verify-blocks: true` in the active configuration:

```console
chain_section="$(sed -n '/^chain:/,/^[^[:space:]#]/p' \
  /opt/koinos/config/config.yml)"
printf '%s\n' "$chain_section"
printf '%s\n' "$chain_section" |
  grep -Eq '^[[:space:]]+verify-blocks:[[:space:]]*true([[:space:]]|$)'
```

The command fails if the displayed `chain` section does not explicitly set
`verify-blocks: true`. Keep the active mainnet genesis data, descriptors, peer
identity, and image versions from your selected release or commit and its
configuration files.

## 6. Start and validate

Start the same profiles that were active before the restore:

```console
cd /opt/koinos
docker compose up -d
docker compose ps
docker compose logs --tail 100 --follow chain block_store p2p
```

Do not remove the rollback directory yet. Confirm:

- every expected container remains running;
- the local chain ID is mainnet;
- block verification reports no errors;
- the head advances and becomes recent;
- peers and gossip are active;
- disk space remains safe;
- any enabled JSON-RPC, REST, or gRPC endpoint responds normally.

Optional index services will rebuild their local data because this procedure
installs only `chain` and `block_store`.

## Roll back

If validation fails:

Stop the node and move both generations directly:

```console
cd /opt/koinos
docker compose stop
rollback_dir="$(cat /srv/koinos-restore/rollback-directory.txt)"
failed_restore="/var/lib/koinos-failed-restore-$(date -u +%Y%m%dT%H%M%SZ)"
sudo install -d -m 750 -o koinos -g koinos "$failed_restore"
for state_dir in \
  chain block_store mempool transaction_store account_history contract_meta_store
do
  if sudo test -e "/var/lib/koinos/$state_dir"; then
    sudo mv "/var/lib/koinos/$state_dir" "$failed_restore/"
  fi
  if sudo test -e "$rollback_dir/$state_dir"; then
    sudo mv "$rollback_dir/$state_dir" /var/lib/koinos/
  fi
done
docker compose config
docker compose up -d
docker compose ps
```

Run the same chain-ID, head-freshness, advancement, gossip, peer, API, and disk
checks used after the restore.

Do not delete either generation until the recovered node has remained healthy.

The current public testnet has query endpoints but no verified public
external-operator bundle. Do not substitute testnet or Harbinger files into
this mainnet procedure.
