#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:fetch-public-backup]

usage() {
  cat >&2 <<'EOF'
usage: fetch-public-backup.sh --staging ABSOLUTE_DIR [--download-archive]

Without --download-archive, downloads only the discovery page, metadata, and
checksum. The archive is large and is downloaded only when explicitly asked.
EOF
  exit 2
}

staging=""
download_archive=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --staging)
      [[ $# -ge 2 ]] || usage
      staging="$2"
      shift 2
      ;;
    --download-archive)
      download_archive=1
      shift
      ;;
    *)
      usage
      ;;
  esac
done

[[ "$staging" == /* ]] || {
  echo "--staging must be an absolute path" >&2
  exit 1
}

staging="$(
  python3 - "$staging" <<'PY'
from pathlib import Path
import sys

target = Path(sys.argv[1]).resolve()
home = Path.home().resolve()
for broad in (Path("/"), home, Path("/tmp"), Path("/var"), Path("/var/lib")):
    if target == broad.resolve():
        raise SystemExit(f"refusing broad staging directory: {target}")
if len(target.parts) < 3:
    raise SystemExit(f"refusing shallow staging directory: {target}")
print(target)
PY
)"

base_url="https://seed.koinosfoundation.org/backups"
archive_name="koinos-backup.tar.gz"

mkdir -p -- "$staging"
echo "Authoritative discovery: $base_url/"
echo "Staging directory: $staging"
curl --fail --location --show-error \
  --connect-timeout 10 --max-time 60 \
  "$base_url/" -o "$staging/index.html"
curl --fail --location --show-error \
  --connect-timeout 10 --max-time 60 \
  "$base_url/$archive_name.metadata" -o "$staging/$archive_name.metadata"
curl --fail --location --show-error \
  --connect-timeout 10 --max-time 60 \
  "$base_url/$archive_name.sha256" -o "$staging/$archive_name.sha256"

echo "Metadata and checksum downloaded. Review both before downloading the archive."
if [[ "$download_archive" -eq 1 ]]; then
  echo "Downloading the large public mainnet archive..."
  curl --fail --location --show-error \
    --connect-timeout 10 --retry 3 --continue-at - \
    "$base_url/$archive_name" -o "$staging/$archive_name"
  echo "Archive downloaded; run inspect-backup.sh before extraction."
fi
# --8<-- [end:fetch-public-backup]
