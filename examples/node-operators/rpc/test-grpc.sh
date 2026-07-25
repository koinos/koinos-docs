#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:test-grpc]

endpoint="${1:-grpc.example.com:443}"
descriptors="${2:-./config/koinos_descriptors.pb}"

if ! command -v grpcurl >/dev/null 2>&1; then
  echo "grpcurl is required" >&2
  exit 1
fi
if [[ ! -f "$descriptors" ]]; then
  echo "descriptor set not found: $descriptors" >&2
  exit 1
fi

transport=()
if [[ "${GRPC_PLAINTEXT:-0}" == "1" ]]; then
  transport=(-plaintext)
fi

response="$(
  grpcurl "${transport[@]}" \
    -connect-timeout 5 \
    -max-time 20 \
    -protoset "$descriptors" \
    -d '{}' \
    "$endpoint" \
    koinos.rpc.chain.chain_rpc/get_head_info
)"

python3 - "$response" <<'PY'
import json
import sys

payload = json.loads(sys.argv[1])
topology = payload.get("headTopology", payload.get("head_topology", {}))
height = topology.get("height")
block_id = topology.get("id")
if height is None or not block_id:
    raise SystemExit(f"invalid gRPC head response: {payload}")
print(f"gRPC OK: height={height} id={block_id}")
PY
# --8<-- [end:test-grpc]
