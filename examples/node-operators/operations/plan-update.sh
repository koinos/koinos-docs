#!/usr/bin/env bash
set -euo pipefail
# --8<-- [start:plan-update]

usage() {
  echo "usage: plan-update.sh CURRENT_CHECKOUT PROPOSED_CHECKOUT" >&2
  exit 2
}

[[ $# -eq 2 ]] || usage
current="$1"
proposed="$2"

for checkout in "$current" "$proposed"; do
  [[ -d "$checkout" ]] || {
    echo "checkout not found: $checkout" >&2
    exit 1
  }
  for required in docker-compose.yml env.example config-example/config.yml; do
    [[ -f "$checkout/$required" ]] || {
      echo "missing $required in $checkout" >&2
      exit 1
    }
  done
done

revision() {
  if git -C "$1" rev-parse --verify HEAD >/dev/null 2>&1; then
    git -C "$1" rev-parse HEAD
  else
    echo "not a Git checkout"
  fi
}

echo "Current revision:  $(revision "$current")"
echo "Proposed revision: $(revision "$proposed")"
echo
echo "Review these diffs before any pull, stop, or restart:"
diff -u "$current/docker-compose.yml" "$proposed/docker-compose.yml" || true
diff -u "$current/env.example" "$proposed/env.example" || true
diff -ru "$current/config-example" "$proposed/config-example" || true

echo
echo "Pinned image tags in proposed env.example:"
awk -F= '/^[A-Z0-9_]+_TAG=/{print $1 "=" $2}' "$proposed/env.example"

echo
echo "Inspection complete; no services or files were changed."
# --8<-- [end:plan-update]
