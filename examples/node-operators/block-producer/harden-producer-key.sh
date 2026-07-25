#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:harden-producer-key]

usage() {
  echo "usage: harden-producer-key.sh ABSOLUTE_BASEDIR [--apply]" >&2
  exit 2
}

[[ $# -ge 1 && $# -le 2 ]] || usage
basedir="$1"
apply=0
if [[ $# -eq 2 ]]; then
  [[ "$2" == "--apply" ]] || usage
  apply=1
fi

[[ "$basedir" == /* ]] || {
  echo "basedir must be an absolute path" >&2
  exit 1
}

basedir="$(
  python3 - "$basedir" <<'PY'
from pathlib import Path
import sys

target = Path(sys.argv[1]).resolve()
home = Path.home().resolve()
broad = {Path("/").resolve(), home, Path("/var").resolve(), Path("/var/lib").resolve()}
if target in broad or len(target.parts) < 4:
    raise SystemExit(f"refusing unsafe or broad basedir: {target}")
print(target)
PY
)"

key_dir="$basedir/block_producer"
private_key="$key_dir/private.key"
public_key="$key_dir/public.key"

[[ -d "$key_dir" ]] || {
  echo "block producer directory not found: $key_dir" >&2
  exit 1
}
[[ -f "$private_key" ]] || {
  echo "private key not found: $private_key" >&2
  exit 1
}

echo "Producer key directory: $key_dir"
echo "Private key: $private_key"
echo "Requested permissions: directory 700, private key 600"

if [[ "$apply" -eq 0 ]]; then
  echo "Mode: DRY RUN; add --apply to change permissions."
  exit 0
fi

chmod 700 "$key_dir"
chmod 600 "$private_key"
if [[ -f "$public_key" ]]; then
  chmod 644 "$public_key"
fi

echo "Permissions updated. Verify ownership and create an encrypted off-host backup."
# --8<-- [end:harden-producer-key]
