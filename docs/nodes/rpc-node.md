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

Use Caddy, nginx, or an equivalent maintained reverse proxy. Configure it as
an independent host service and meet all of these requirements:

- obtain and renew valid public TLS certificates;
- route JSON-RPC to `127.0.0.1:8080`;
- route `/v1/`, `/swagger`, and required Swagger assets to
  `127.0.0.1:3000`;
- proxy gRPC with HTTP/2 to `127.0.0.1:50051`;
- limit request body size;
- set connection and upstream timeouts;
- rate-limit by client;
- allow only the required browser origins instead of `*`;
- remove unnecessary server-identification headers;
- retain bounded access and error logs.

Follow the current
[Caddy reverse proxy documentation](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)
or
[nginx proxy documentation](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
for the software version you install. Validate the proxy configuration before
reloading it.

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

From a different machine or network, test the intended public ports:

```console
nc -vz rpc.example.com 443
nc -vz rpc.example.com 8080
nc -vz rpc.example.com 3000
nc -vz rpc.example.com 50051
nc -vz rpc.example.com 5672
nc -vz rpc.example.com 15672
```

Expect `443` to succeed. Expect the raw Koinos and RabbitMQ ports to fail.
Port `8888` is the only Koinos service port that may intentionally be public.

Finally, repeat the JSON-RPC, REST, and gRPC checks through the public TLS
names. Monitor latency, non-2xx responses, container restarts, queue pressure,
head freshness, disk growth, and host saturation.

Continue with [Security](security.md) and
[Operations and recovery](management.md).
