#!/usr/bin/env bash
set -euo pipefail

# --8<-- [start:query-network]
rpc_url="${1:?usage: query-network.sh RPC_URL [EXPECTED_CHAIN_ID]}"
expected_chain_id="${2:-}"

rpc() {
  local method="$1"
  curl --fail --silent --show-error --max-time 10 \
    "$rpc_url" \
    -H 'content-type: application/json' \
    --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"$method\",\"params\":{}}"
}

chain_response="$(rpc chain.get_chain_id)"
head_response="$(rpc chain.get_head_info)"

python3 - "$expected_chain_id" "$chain_response" "$head_response" <<'PY'
import json
import sys

expected = sys.argv[1]
chain = json.loads(sys.argv[2])
head = json.loads(sys.argv[3])

for name, payload in (("chain ID", chain), ("head", head)):
    if "error" in payload:
        raise SystemExit(f"ERROR: {name} request failed: {payload['error']}")

chain_id = chain["result"]["chain_id"]
height = int(head["result"]["head_topology"]["height"])
block_id = head["result"]["head_topology"]["id"]

if expected and chain_id != expected:
    raise SystemExit(
        f"ERROR: chain ID mismatch: expected {expected}, received {chain_id}"
    )

print(f"Chain ID: {chain_id}")
print(f"Head: height={height} id={block_id}")
PY
# --8<-- [end:query-network]
