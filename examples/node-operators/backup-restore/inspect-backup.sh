#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:inspect-backup]

usage() {
  echo "usage: inspect-backup.sh ARCHIVE CHECKSUM_FILE" >&2
  exit 2
}

[[ $# -eq 2 ]] || usage
archive="$1"
checksum_file="$2"

[[ -f "$archive" ]] || {
  echo "archive not found: $archive" >&2
  exit 1
}
[[ -f "$checksum_file" ]] || {
  echo "checksum file not found: $checksum_file" >&2
  exit 1
}

expected="$(awk 'NF { print $1; exit }' "$checksum_file")"
[[ "$expected" =~ ^[[:xdigit:]]{64}$ ]] || {
  echo "checksum file does not begin with a SHA-256 digest" >&2
  exit 1
}

if command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "$archive" | awk '{print $1}')"
elif command -v shasum >/dev/null 2>&1; then
  actual="$(shasum -a 256 "$archive" | awk '{print $1}')"
else
  echo "sha256sum or shasum is required" >&2
  exit 1
fi

actual_lower="$(printf '%s' "$actual" | tr '[:upper:]' '[:lower:]')"
expected_lower="$(printf '%s' "$expected" | tr '[:upper:]' '[:lower:]')"
[[ "$actual_lower" == "$expected_lower" ]] || {
  echo "SHA-256 mismatch: expected=$expected actual=$actual" >&2
  exit 1
}

listing="$(mktemp)"
trap 'rm -f -- "$listing"' EXIT
tar -tzf "$archive" >"$listing"

python3 - "$listing" <<'PY'
from pathlib import PurePosixPath
import sys

names = [line.rstrip("\n") for line in open(sys.argv[1], encoding="utf-8")]
if not names:
    raise SystemExit("archive is empty")

found = set()
for name in names:
    if "\x00" in name:
        raise SystemExit("archive contains a NUL byte in a member name")
    path = PurePosixPath(name)
    if path.is_absolute() or ".." in path.parts:
        raise SystemExit(f"unsafe archive member: {name}")
    found.update(part for part in path.parts if part in {"chain", "block_store"})

missing = {"chain", "block_store"} - found
if missing:
    raise SystemExit(
        "archive is missing required state directories: " + ", ".join(sorted(missing))
    )
PY

printf 'Archive: %s\n' "$archive"
printf 'SHA-256: %s (verified)\n' "$actual"
printf 'Members: %s\n' "$(wc -l <"$listing" | tr -d ' ')"
echo "Required state directories: chain, block_store (present)"
echo "Inspection complete; no files were extracted."
# --8<-- [end:inspect-backup]
