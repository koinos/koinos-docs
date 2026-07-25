#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:test-jsonrpc]

RPC_URL="${1:-http://127.0.0.1:8080}"
response="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 --max-time 20 \
    -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}' \
    "$RPC_URL"
)"

python3 - "$response" <<'PY'
import json
import sys

payload = json.loads(sys.argv[1])
if payload.get("error"):
    raise SystemExit(f"JSON-RPC error: {payload['error']}")
topology = payload.get("result", {}).get("head_topology", {})
height = topology.get("height")
block_id = topology.get("id")
if height is None or not block_id:
    raise SystemExit(f"invalid head response: {payload}")
print(f"JSON-RPC OK: height={height} id={block_id}")
PY
# --8<-- [end:test-jsonrpc]
