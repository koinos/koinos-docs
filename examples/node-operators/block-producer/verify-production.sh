#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:verify-production]

usage() {
  echo "usage: verify-production.sh PROJECT_DIR [LOCAL_RPC_URL] [CANONICAL_RPC_URL]" >&2
  exit 2
}

[[ $# -ge 1 && $# -le 3 ]] || usage
project_dir="$1"
local_rpc="${2:-http://127.0.0.1:8080}"
canonical_rpc="${3:-https://api.koinos.io/}"

[[ -f "$project_dir/docker-compose.yml" ]] || {
  echo "docker-compose.yml not found in project directory: $project_dir" >&2
  exit 1
}

logs="$(docker compose --project-directory "$project_dir" logs --no-color block_producer)"
block_id="$(
  printf '%s\n' "$logs" |
    sed -nE 's/.*Produced block.*ID: (0x[[:xdigit:]]+).*/\1/p' |
    tail -n 1
)"
[[ "$block_id" =~ ^0x[[:xdigit:]]{68}$ ]] || {
  echo "no complete produced block ID found in block_producer logs" >&2
  exit 1
}

query_block() {
  local endpoint="$1"
  curl --fail --silent --show-error \
    --connect-timeout 5 --max-time 20 \
    -H "Content-Type: application/json" \
    --data "{\"jsonrpc\":\"2.0\",\"method\":\"block_store.get_blocks_by_id\",\"params\":{\"block_ids\":[\"$block_id\"],\"return_block\":false,\"return_receipt\":false},\"id\":1}" \
    "$endpoint"
}

verify_response() {
  local label="$1"
  local response="$2"
  python3 - "$label" "$block_id" "$response" <<'PY'
import json
import sys

label, expected, raw = sys.argv[1:]
payload = json.loads(raw)
if payload.get("error"):
    raise SystemExit(f"{label} RPC error: {payload['error']}")
items = payload.get("result", {}).get("block_items", [])
if not items or items[0].get("block_id") != expected:
    raise SystemExit(f"{label} did not return produced block {expected}")
print(f"{label} confirmed block {expected} at height {items[0].get('block_height')}")
PY
}

local_response="$(query_block "$local_rpc")"
verify_response "Local node" "$local_response"

canonical_response=""
for _attempt in 1 2 3 4 5 6 7 8 9 10; do
  canonical_response="$(query_block "$canonical_rpc" || true)"
  if [[ -n "$canonical_response" ]] &&
    python3 - "$block_id" "$canonical_response" <<'PY'
import json
import sys

expected, raw = sys.argv[1:]
try:
    items = json.loads(raw).get("result", {}).get("block_items", [])
except (json.JSONDecodeError, AttributeError):
    raise SystemExit(1)
raise SystemExit(0 if items and items[0].get("block_id") == expected else 1)
PY
  then
    break
  fi
  sleep 3
done

[[ -n "$canonical_response" ]] || {
  echo "canonical endpoint returned no usable response" >&2
  exit 1
}
verify_response "Canonical endpoint" "$canonical_response"
# --8<-- [end:verify-production]
