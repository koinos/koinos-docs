#!/usr/bin/env bash
set -euo pipefail

# --8<-- [start:measure-storage]
basedir="${1:-/var/lib/koinos}"

if [[ "$basedir" != /* || "$basedir" == "/" || "$basedir" == "$HOME" ]]; then
  printf 'ERROR: unsafe basedir: %s\n' "$basedir" >&2
  exit 2
fi

if [[ ! -d "$basedir" ]]; then
  printf 'ERROR: basedir does not exist: %s\n' "$basedir" >&2
  exit 2
fi

printf 'Filesystem capacity:\n'
df -h "$basedir"
printf '\nKoinos data by service:\n'
du -sh \
  "$basedir"/chain \
  "$basedir"/block_store \
  "$basedir"/transaction_store \
  "$basedir"/account_history \
  "$basedir"/contract_meta_store \
  2>/dev/null |
  sort -h
# --8<-- [end:measure-storage]
