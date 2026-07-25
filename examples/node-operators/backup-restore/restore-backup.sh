#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:restore-backup]

usage() {
  cat >&2 <<'EOF'
usage: restore-backup.sh \
  --archive FILE --checksum FILE --basedir ABSOLUTE_DIR \
  --config CONFIG_YML --network mainnet \
  [--apply --node-stopped --backup-confirmed --confirm RESTORE_MAINNET]

The default is a dry run. Applying preserves existing state under
BASEDIR/.pre-restore-TIMESTAMP and never imports configuration, keys, wallets,
or peer identity from the public archive.
EOF
  exit 2
}

archive=""
checksum=""
basedir=""
config=""
network=""
apply=0
node_stopped=0
backup_confirmed=0
confirmation=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --archive|--checksum|--basedir|--config|--network|--confirm)
      [[ $# -ge 2 ]] || usage
      value="$2"
      case "$1" in
        --archive) archive="$value" ;;
        --checksum) checksum="$value" ;;
        --basedir) basedir="$value" ;;
        --config) config="$value" ;;
        --network) network="$value" ;;
        --confirm) confirmation="$value" ;;
      esac
      shift 2
      ;;
    --apply)
      apply=1
      shift
      ;;
    --node-stopped)
      node_stopped=1
      shift
      ;;
    --backup-confirmed)
      backup_confirmed=1
      shift
      ;;
    *)
      usage
      ;;
  esac
done

[[ -n "$archive" && -n "$checksum" && -n "$basedir" && -n "$config" && -n "$network" ]] || usage
[[ "$basedir" == /* ]] || {
  echo "--basedir must be an absolute path" >&2
  exit 1
}
[[ "$network" == "mainnet" ]] || {
  echo "this public-backup helper supports only network=mainnet" >&2
  exit 1
}
[[ -f "$config" ]] || {
  echo "active config not found: $config" >&2
  exit 1
}

resolved_basedir="$(
  python3 - "$basedir" <<'PY'
from pathlib import Path
import sys

target = Path(sys.argv[1]).resolve()
home = Path.home().resolve()
broad = {
    Path("/").resolve(),
    home,
    Path("/tmp").resolve(),
    Path("/var").resolve(),
    Path("/var/lib").resolve(),
    Path("/srv").resolve(),
    Path("/opt").resolve(),
    Path("/Users").resolve(),
    Path("/home").resolve(),
}
if target in broad or len(target.parts) < 4:
    raise SystemExit(f"refusing unsafe or broad basedir: {target}")
print(target)
PY
)"
basedir="$resolved_basedir"

python3 - "$config" <<'PY'
import sys
import yaml

with open(sys.argv[1], encoding="utf-8") as stream:
    config = yaml.safe_load(stream) or {}
if (config.get("chain") or {}).get("verify-blocks") is not True:
    raise SystemExit("active config must set chain.verify-blocks: true")
PY

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
"$script_dir/inspect-backup.sh" "$archive" "$checksum"

echo
printf 'Source archive: %s\n' "$archive"
printf 'Target basedir: %s\n' "$basedir"
printf 'Active config: %s\n' "$config"
printf 'Network: %s\n' "$network"

if [[ "$apply" -eq 0 ]]; then
  echo "Mode: DRY RUN"
  echo "No data was extracted or replaced."
  echo "Apply requires --node-stopped --backup-confirmed --confirm RESTORE_MAINNET."
  exit 0
fi

[[ "$node_stopped" -eq 1 ]] || {
  echo "--node-stopped is required for apply mode" >&2
  exit 1
}
[[ "$backup_confirmed" -eq 1 ]] || {
  echo "--backup-confirmed is required for apply mode" >&2
  exit 1
}
[[ "$confirmation" == "RESTORE_MAINNET" ]] || {
  echo "--confirm RESTORE_MAINNET is required for apply mode" >&2
  exit 1
}
[[ -d "$basedir" ]] || {
  echo "basedir does not exist: $basedir" >&2
  exit 1
}

if command -v docker >/dev/null 2>&1; then
  running="$(
    docker ps --format '{{.Names}}' 2>/dev/null |
      awk '/(^|-)koinos(-|$)/ { print }' || true
  )"
  [[ -z "$running" ]] || {
    echo "Koinos containers appear to be running:" >&2
    echo "$running" >&2
    exit 1
  }
fi

stamp="$(date -u +%Y%m%dT%H%M%SZ)"
stage="$(mktemp -d "${basedir}.restore-stage.XXXXXX")"
preserve="$basedir/.pre-restore-$stamp"
completed=0

cleanup() {
  if [[ "$completed" -eq 0 && -d "$stage" && "$stage" == "${basedir}.restore-stage."* ]]; then
    rm -rf -- "$stage"
  fi
}
trap cleanup EXIT

state_output="$(
  tar -tzf "$archive" |
    python3 -c '
from pathlib import PurePosixPath
import sys

members = [line.rstrip("\n") for line in sys.stdin]
for wanted in ("chain", "block_store"):
    matches = []
    for name in members:
        parts = PurePosixPath(name).parts
        if wanted in parts:
            matches.append("/".join(parts[:parts.index(wanted) + 1]))
    if not matches:
        raise SystemExit(f"missing required directory: {wanted}")
    print(sorted(set(matches), key=lambda item: (item.count("/"), len(item)))[0])
'
)"
state_members=()
while IFS= read -r member; do
  state_members+=("$member")
done <<<"$state_output"

tar -xzf "$archive" -C "$stage" -- "${state_members[@]}"
staged_chain="$stage/${state_members[0]}"
staged_block_store="$stage/${state_members[1]}"
[[ -d "$staged_chain" && -d "$staged_block_store" ]] || {
  echo "staged archive does not contain usable chain and block_store directories" >&2
  exit 1
}

mkdir -p -- "$preserve"
for directory in chain block_store mempool transaction_store contract_meta_store account_history; do
  if [[ -e "$basedir/$directory" ]]; then
    mv -- "$basedir/$directory" "$preserve/$directory"
  fi
done

rollback() {
  echo "restore move failed; attempting to return preserved state" >&2
  for directory in chain block_store mempool transaction_store contract_meta_store account_history; do
    if [[ -e "$preserve/$directory" && ! -e "$basedir/$directory" ]]; then
      mv -- "$preserve/$directory" "$basedir/$directory" || true
    fi
  done
}

if ! mv -- "$staged_chain" "$basedir/chain"; then
  rollback
  exit 1
fi
if ! mv -- "$staged_block_store" "$basedir/block_store"; then
  mv -- "$basedir/chain" "$stage/restored-chain" || true
  rollback
  exit 1
fi

completed=1
echo "Restore staged successfully."
echo "Previous state: $preserve"
echo "Restored: $basedir/chain and $basedir/block_store"
echo "Not restored: config, keys, wallets, peer identity, and optional indexes"
echo "Keep services stopped until configuration and ownership are reviewed."
echo "After startup, verify chain ID, advancing head, gossip, peers, logs, and disk."
# --8<-- [end:restore-backup]
