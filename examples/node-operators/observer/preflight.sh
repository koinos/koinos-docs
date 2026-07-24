#!/usr/bin/env bash
set -euo pipefail

# --8<-- [start:observer-preflight]
basedir="${1:-/var/lib/koinos}"

case "$basedir" in
  /*) ;;
  *)
    printf 'ERROR: basedir must be an absolute path: %s\n' "$basedir" >&2
    exit 2
    ;;
esac

if [[ "$basedir" == "/" || "$basedir" == "$HOME" ]]; then
  printf 'ERROR: refusing broad basedir: %s\n' "$basedir" >&2
  exit 2
fi

for command_name in docker curl python3; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf 'ERROR: required command is missing: %s\n' "$command_name" >&2
    exit 1
  fi
done

docker --version
docker compose version
printf 'Kernel: '; uname -sr
printf 'Architecture: '; uname -m

probe_path="$basedir"
while [[ ! -e "$probe_path" && "$probe_path" != "/" ]]; do
  probe_path="$(dirname "$probe_path")"
done

printf 'Storage containing %s:\n' "$basedir"
df -h "$probe_path"

if command -v timedatectl >/dev/null 2>&1; then
  timedatectl show \
    --property=NTPSynchronized \
    --property=Timezone \
    --property=LocalRTC
fi

if command -v ss >/dev/null 2>&1; then
  printf 'Current listeners on Koinos default ports:\n'
  ss -ltn |
    awk 'NR == 1 || $4 ~ /:(5672|8080|8888|15672|3000|50051)$/'
fi

printf 'Preflight completed for %s\n' "$basedir"
# --8<-- [end:observer-preflight]
