#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:audit-exposure]

external_host="${1:-}"

echo "Local TCP listeners relevant to Koinos:"
if command -v ss >/dev/null 2>&1; then
  ss -lnt '( sport = :22 or sport = :80 or sport = :443 or sport = :5672 or sport = :8888 or sport = :15672 or sport = :8080 or sport = :50051 or sport = :3000 )'
else
  echo "ss is unavailable; inspect listeners with the host's equivalent tool"
fi

if command -v ufw >/dev/null 2>&1; then
  echo
  echo "UFW status:"
  ufw status verbose
fi

if [[ -n "$external_host" ]]; then
  if ! command -v nc >/dev/null 2>&1; then
    echo "nc is required for external checks" >&2
    exit 1
  fi
  echo
  echo "Testing $external_host from this machine:"
  for port in 80 443 5672 8888 15672 8080 50051 3000; do
    if nc -z -w 3 "$external_host" "$port" 2>/dev/null; then
      printf 'OPEN   %s:%s\n' "$external_host" "$port"
    else
      printf 'CLOSED %s:%s\n' "$external_host" "$port"
    fi
  done
fi
# --8<-- [end:audit-exposure]
