#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:test-rest]

REST_URL="${1:-http://127.0.0.1:3000}"
response="$(
  curl --fail --silent --show-error \
    --connect-timeout 5 --max-time 20 \
    "${REST_URL%/}/v1/chain/head_info"
)"

python3 - "$response" <<'PY'
import json
import sys

payload = json.loads(sys.argv[1])
result = payload.get("result", payload)
topology = result.get("head_topology", {})
height = topology.get("height")
block_id = topology.get("id")
if height is None or not block_id:
    raise SystemExit(f"invalid REST head response: {payload}")
print(f"REST OK: height={height} id={block_id}")
PY
# --8<-- [end:test-rest]
