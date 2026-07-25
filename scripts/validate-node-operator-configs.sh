#!/usr/bin/env bash
set -euo pipefail

root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
fixture="$(mktemp -d "${TMPDIR:-/tmp}/koinos-node-configs.XXXXXX")"

cleanup() {
  case "$fixture" in
    "${TMPDIR:-/tmp}"/koinos-node-configs.*) rm -rf -- "$fixture" ;;
    *) echo "refusing to clean unexpected fixture path: $fixture" >&2 ;;
  esac
}
trap cleanup EXIT

command -v docker >/dev/null 2>&1 || {
  echo "Docker is required for Compose and proxy validation" >&2
  exit 1
}
docker info >/dev/null 2>&1 || {
  echo "Docker daemon is unavailable; start it before config validation" >&2
  exit 1
}

mkdir -p "$fixture/config"
cp "$root/examples/node-operators/upstream/docker-compose.yml" \
  "$fixture/docker-compose.yml"
cp "$root/examples/node-operators/upstream/config.yml" \
  "$fixture/config/config.yml"
printf 'loopback_users.guest = false\n' >"$fixture/config/rabbitmq.conf"
printf '{}\n' >"$fixture/config/genesis_data.json"
: >"$fixture/config/koinos_descriptors.pb"

sed 's/^COMPOSE_PROFILES=.*/COMPOSE_PROFILES=block_producer,jsonrpc/' \
  "$root/examples/node-operators/observer/env.example" \
  >"$fixture/producer.env"

for env_file in \
  "$root/examples/node-operators/observer/env.example" \
  "$root/examples/node-operators/rpc/env.example" \
  "$fixture/producer.env"
do
  docker compose \
    --project-directory "$fixture" \
    --env-file "$env_file" \
    -f "$fixture/docker-compose.yml" \
    config --quiet
done
echo "PASS: Docker Compose observer, API, and producer fixtures"

caddy_image="$(
  docker build --quiet \
    --file "$root/examples/node-operators/rpc/Dockerfile.caddy" \
    "$root/examples/node-operators/rpc"
)"
docker run --rm \
  --volume "$root/examples/node-operators/rpc/Caddyfile:/etc/caddy/Caddyfile:ro" \
  "$caddy_image" \
  caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
echo "PASS: Caddy configuration"

mkdir -p \
  "$fixture/tls/rpc.example.com" \
  "$fixture/tls/grpc.example.com"
openssl req -x509 -newkey rsa:2048 -nodes -days 1 \
  -subj "/CN=rpc.example.com" \
  -keyout "$fixture/tls/rpc.example.com/privkey.pem" \
  -out "$fixture/tls/rpc.example.com/fullchain.pem" \
  >/dev/null 2>&1
cp "$fixture/tls/rpc.example.com/privkey.pem" \
  "$fixture/tls/grpc.example.com/privkey.pem"
cp "$fixture/tls/rpc.example.com/fullchain.pem" \
  "$fixture/tls/grpc.example.com/fullchain.pem"

nginx_image="nginx@sha256:30f1c0d78e0ad60901648be663a710bdadf19e4c10ac6782c235200619158284"
docker run --rm \
  --volume "$root/examples/node-operators/rpc/nginx.conf:/etc/nginx/nginx.conf:ro" \
  --volume "$fixture/tls:/etc/nginx/tls:ro" \
  "$nginx_image" \
  nginx -t
echo "PASS: nginx configuration"
