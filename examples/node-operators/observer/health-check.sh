#!/usr/bin/env bash
set -euo pipefail

# --8<-- [start:observer-health]
project_dir="${1:-.}"
basedir="${2:-/var/lib/koinos}"
rpc_url="${RPC_URL:-http://127.0.0.1:8080/}"
max_head_age="${MAX_HEAD_AGE_SECONDS:-300}"
disk_warn_percent="${DISK_WARN_PERCENT:-80}"

project_dir="$(cd "$project_dir" && pwd -P)"
if [[ "$basedir" != /* || "$basedir" == "/" || "$basedir" == "$HOME" ]]; then
  printf 'ERROR: unsafe basedir: %s\n' "$basedir" >&2
  exit 2
fi

required_services=(amqp chain mempool block_store p2p jsonrpc)
mapfile -t running_services < <(
  cd "$project_dir"
  docker compose ps --status running --services
)

for service in "${required_services[@]}"; do
  if ! printf '%s\n' "${running_services[@]}" | grep -qx "$service"; then
    printf 'ERROR: required service is not running: %s\n' "$service" >&2
    exit 1
  fi
done

rpc() {
  local method="$1"
  curl --fail --silent --show-error --max-time 10 \
    "$rpc_url" \
    -H 'content-type: application/json' \
    --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"$method\",\"params\":{}}"
}

head_response="$(rpc chain.get_head_info)"
python3 - "$max_head_age" "$head_response" <<'PY'
import json
import sys
import time

max_age = int(sys.argv[1])
data = json.loads(sys.argv[2])
if "error" in data:
    raise SystemExit(f"ERROR: chain.get_head_info failed: {data['error']}")
result = data["result"]
height = int(result["head_topology"]["height"])
block_ms = int(result["head_block_time"])
age = int(time.time() - block_ms / 1000)
if height <= 0 or age < 0 or age > max_age:
    raise SystemExit(
        f"ERROR: stale or invalid head: height={height} age={age}s"
    )
print(f"Chain head: height={height} age={age}s")
PY

gossip_response="$(rpc p2p.get_gossip_status)"
python3 - "$gossip_response" <<'PY'
import json
import sys

data = json.loads(sys.argv[1])
if "error" in data:
    raise SystemExit(f"ERROR: p2p.get_gossip_status failed: {data['error']}")
enabled = data["result"].get("enabled")
if enabled is not True:
    raise SystemExit(f"ERROR: P2P gossip is not enabled: {enabled!r}")
print("P2P gossip: enabled")
PY

disk_used="$(
  df -P "$basedir" |
    awk 'NR == 2 {gsub("%", "", $5); print $5}'
)"
if [[ -z "$disk_used" || "$disk_used" -ge "$disk_warn_percent" ]]; then
  printf 'ERROR: basedir filesystem usage is %s%% (limit %s%%)\n' \
    "${disk_used:-unknown}" "$disk_warn_percent" >&2
  exit 1
fi

printf 'Disk usage: %s%%\n' "$disk_used"
printf 'Observer health check passed\n'
# --8<-- [end:observer-health]
