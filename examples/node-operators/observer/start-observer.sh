#!/usr/bin/env bash
set -euo pipefail

# --8<-- [start:start-observer]
project_dir="${1:-.}"
project_dir="$(cd "$project_dir" && pwd -P)"

if [[ ! -f "$project_dir/docker-compose.yml" || ! -f "$project_dir/.env" ]]; then
  printf 'ERROR: %s must contain docker-compose.yml and .env\n' \
    "$project_dir" >&2
  exit 2
fi

profiles="$(
  awk -F= '
    $1 == "COMPOSE_PROFILES" {
      value = substr($0, index($0, "=") + 1)
      gsub(/[[:space:]]/, "", value)
      print value
    }
  ' "$project_dir/.env"
)"

case ",$profiles," in
  *,all,*|*,block_producer,*)
    printf 'ERROR: observer start refuses COMPOSE_PROFILES=%s\n' \
      "$profiles" >&2
    printf 'Use the dedicated block-production procedure instead.\n' >&2
    exit 2
    ;;
esac

cd "$project_dir"
docker compose config --services
docker compose up -d
docker compose ps
# --8<-- [end:start-observer]
