# Run an RPC node

An RPC node is a healthy observer with application-facing services enabled.
Operate those services through the official Koinos Compose project.

The upstream `api` profile enables JSON-RPC, REST, gRPC, transaction store,
contract metadata store, and account history. It does **not** require
`block_producer`.

## Architecture and trust boundary

Keep the Koinos API ports on loopback and expose only a hardened HTTPS reverse
proxy:

| Protocol | Local host port | Public route | Verification |
| --- | ---: | --- | --- |
| JSON-RPC | `127.0.0.1:8080` | `https://rpc.example.com/` | HTTP POST |
| REST and Swagger | `127.0.0.1:3000` | `https://rpc.example.com/v1/...` and `/swagger` | HTTP GET |
| gRPC | `127.0.0.1:50051` | `grpc.example.com:443` | descriptor-based gRPC |

RabbitMQ `5672` and its administration UI `15672` must remain private. P2P
`8888` may be public when the host participates in peer-to-peer networking.

## 1. Enable the API profile

Start from the same official deployment checkout and basedir as the observer.
Preserve the existing `.env`, then edit these values:

| Setting | Value |
| --- | --- |
| `COMPOSE_PROFILES` | `api` |
| `JSONRPC_INTERFACE` | `127.0.0.1` |
| `JSONRPC_PORT` | `8080` |
| `REST_INTERFACE` | `127.0.0.1` |
| `REST_PORT` | `3000` |
| `GRPC_INTERFACE` | `127.0.0.1` |
| `GRPC_PORT` | `50051` |
| `AMQP_INTERFACE` | `127.0.0.1` |
| `AMQP_ADMIN_INTERFACE` | `127.0.0.1` |

Keep the image tags from the selected deployment revision. Validate and start:

```console
cd /opt/koinos
docker compose config
docker compose up -d
docker compose ps
```

Expect the five required services plus `jsonrpc`, `rest`, `grpc`,
`transaction_store`, `contract_meta_store`, and `account_history`. Expect no
`block_producer` container.

## 2. Verify each local protocol

Check JSON-RPC:

```console
curl --fail http://127.0.0.1:8080/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}'
```

Check REST:

```console
curl --fail http://127.0.0.1:3000/v1/chain/head_info
```

Check gRPC with `grpcurl` and the descriptor set from the same deployment
bundle:

```console
grpcurl -plaintext \
  -protoset /opt/koinos/config/koinos_descriptors.pb \
  -d '{}' \
  127.0.0.1:50051 \
  koinos.rpc.chain.chain_rpc/get_head_info
```

Koinos gRPC does not advertise reflection, so a reflection-only test is not
sufficient. Plaintext is appropriate only for this loopback check; public gRPC
must use TLS.

## 3. Publish through a reverse proxy

This direct procedure uses the standard Ubuntu nginx package. It publishes:

- JSON-RPC and REST/Swagger as `https://rpc.example.com`;
- gRPC as `grpc.example.com:443`;
- no raw Koinos or RabbitMQ port.

Replace both example hostnames and the single allowed browser origin before
validation.

Install nginx, Certbot, and the network test tools:

```console
sudo apt-get update
sudo apt-get install -y nginx certbot netcat-openbsd ufw
sudo systemctl enable --now nginx
```

Point both DNS names at this host. Allow SSH and the reverse proxy through the
host firewall; allow P2P only when this node accepts inbound peers:

```console
read -r -p 'Administrative CIDR allowed to use SSH: ' admin_cidr
test -n "$admin_cidr"
sudo ufw allow from "$admin_cidr" to any port 22 proto tcp
sudo ufw allow 'Nginx Full'
sudo ufw allow 8888/tcp
sudo ufw status verbose
```

Do not enable or reload a remote firewall until a second administrative
session from that CIDR proves that SSH recovery access remains available.
Remove any broader pre-existing SSH rule only after that test. Ports `8080`,
`3000`, `50051`, `5672`, and `15672` need no public firewall rule.

Obtain one certificate containing both DNS names through the initial Ubuntu
nginx web root:

```console
sudo certbot certonly --webroot --webroot-path /var/www/html \
  -d rpc.example.com \
  -d grpc.example.com
sudo certbot certificates
```

Create the HTTP-level rate-limit and CORS-origin definitions:

```console
sudoedit /etc/nginx/conf.d/koinos-rpc-global.conf
```

```nginx
map $http_origin $koinos_cors_origin {
    default "";
    "https://app.example.com" $http_origin;
}

limit_req_zone $binary_remote_addr zone=koinos_rpc:10m rate=10r/s;
```

Create the complete site:

```console
sudoedit /etc/nginx/sites-available/koinos-rpc
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name rpc.example.com grpc.example.com;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 308 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name rpc.example.com;

    ssl_certificate
        /etc/letsencrypt/live/rpc.example.com/fullchain.pem;
    ssl_certificate_key
        /etc/letsencrypt/live/rpc.example.com/privkey.pem;

    server_tokens off;
    client_max_body_size 1m;
    proxy_connect_timeout 5s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;

    add_header Access-Control-Allow-Origin
        $koinos_cors_origin always;
    add_header Access-Control-Allow-Methods
        "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers
        "Content-Type, Authorization" always;
    add_header Vary "Origin" always;
    add_header X-Content-Type-Options "nosniff" always;

    if ($request_method = OPTIONS) {
        return 204;
    }

    location = / {
        limit_req zone=koinos_rpc burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:8080;
    }

    location ^~ /v1/ {
        limit_req zone=koinos_rpc burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://127.0.0.1:3000;
    }

    location = /swagger {
        limit_req zone=koinos_rpc burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
    }

    location ^~ /swagger/ {
        limit_req zone=koinos_rpc burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
    }

    location ^~ /api/ {
        limit_req zone=koinos_rpc burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
    }

    location ^~ /_next/ {
        limit_req zone=koinos_rpc burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
    }

    location = /favicon.ico {
        proxy_pass http://127.0.0.1:3000;
    }

    location / {
        return 404;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name grpc.example.com;

    ssl_certificate
        /etc/letsencrypt/live/rpc.example.com/fullchain.pem;
    ssl_certificate_key
        /etc/letsencrypt/live/rpc.example.com/privkey.pem;

    server_tokens off;
    client_max_body_size 1m;

    location / {
        limit_req zone=koinos_rpc burst=20 nodelay;
        limit_req_status 429;
        grpc_connect_timeout 5s;
        grpc_read_timeout 30s;
        grpc_send_timeout 30s;
        grpc_set_header Host $host;
        grpc_pass grpc://127.0.0.1:50051;
    }
}
```

The `10r/s` rate, `burst=20`, `1m` body limit, and timeout values are
conservative starting controls, not universal capacity recommendations.
Load-test the intended methods and payload sizes on a staging host, monitor
queue and node saturation, and change them only from measured evidence.

Enable and validate the site before reloading:

```console
test -L /etc/nginx/sites-enabled/koinos-rpc ||
  sudo ln -s /etc/nginx/sites-available/koinos-rpc \
    /etc/nginx/sites-enabled/koinos-rpc
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl --no-pager --full status nginx
sudo certbot renew --dry-run
```

The Koinos ports must remain bound to loopback even when a host firewall is
also present. Defense in depth matters: a future firewall change must not
publish the raw services automatically.

## 4. Verify exposure from two locations

On the node host, inspect listeners:

```console
sudo ss -lntp
```

The API, RabbitMQ, and RabbitMQ administration ports should show
`127.0.0.1`, not `0.0.0.0` or `[::]`.

From a different machine or network, list every relevant port:

```console
for port in 22 80 443 8888 5672 15672 8080 3000 50051; do
  if nc -z -w 3 rpc.example.com "$port"; then
    printf 'OPEN   %s\n' "$port"
  else
    printf 'CLOSED %s\n' "$port"
  fi
done
```

Expect `80` and `443` to be open. Port `22` should be restricted to the
administration source, and `8888` may be open when inbound P2P is intentional.
Expect `5672`, `15672`, `8080`, `3000`, and `50051` to be closed externally.

Run every public protocol test from that external machine. Check JSON-RPC:

```console
curl --fail --silent --show-error https://rpc.example.com/ \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"chain.get_head_info","params":{},"id":1}' |
  jq -e '.result.head_topology.height | tonumber > 0'
```

Check REST and Swagger:

```console
curl --fail --silent --show-error \
  https://rpc.example.com/v1/chain/head_info |
  jq -e '.head_topology.height | tonumber > 0'
curl --fail --head https://rpc.example.com/swagger
```

Check the allowed CORS preflight:

```console
curl --fail --include --request OPTIONS https://rpc.example.com/ \
  -H 'Origin: https://app.example.com' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: Content-Type'
```

The response must be `204` and must return exactly the reviewed
`Access-Control-Allow-Origin`, not `*`.

Copy `koinos_descriptors.pb` from the same deployment bundle to the external
test machine, then check public gRPC over TLS:

```console
grpcurl \
  -protoset ./koinos_descriptors.pb \
  -d '{}' \
  grpc.example.com:443 \
  koinos.rpc.chain.chain_rpc/get_head_info
```

Monitor latency, non-2xx responses, container restarts, queue pressure, head
freshness, disk growth, certificate expiry, nginx log growth, and host
saturation.

Continue with [Security](security.md) and
[Operations and recovery](management.md).
