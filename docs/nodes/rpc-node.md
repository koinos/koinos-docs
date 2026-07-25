# Run an RPC node

An RPC node adds application-facing services to a healthy observer. The
official `api` profile enables JSON-RPC, REST, gRPC, transaction store,
contract metadata store, and account history. It does **not** need the
`block_producer` profile.

## Architecture and trust boundary

Keep the Koinos API ports on loopback and expose only a hardened HTTPS reverse
proxy:

| Protocol | Local host port | Public route | Verification |
| --- | ---: | --- | --- |
| JSON-RPC | `127.0.0.1:8080` | `https://rpc.example.com/` | HTTP POST |
| REST and Swagger | `127.0.0.1:3000` | `https://rpc.example.com/v1/...` and `/swagger` | HTTP GET |
| gRPC | `127.0.0.1:50051` | `grpc.example.com:443` | descriptor-based gRPC |

RabbitMQ `5672` and its management UI `15672` must also remain private. P2P
`8888` can be public if this host participates in peer-to-peer networking.

## 1. Enable the API profile

Start from the same immutable deployment bundle used for the observer and
measure the additional storage required by the selected index services.

**Safety: service-changing when installed.** This configuration keeps every API
on loopback and intentionally enables `api`.

<!-- node-example: rpc-env -->
```dotenv title=".env"
--8<-- "examples/node-operators/rpc/env.example:rpc-env"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/env.example) ·
[Use locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

After preserving the existing `.env`, apply the reviewed values and run
`docker compose --profile api up -d`. Confirm that the six API services plus
the five required services are healthy with `docker compose ps`.

## 2. Verify locally before exposing it

These read-only checks require `curl`, Python 3, and—in the gRPC case—`grpcurl`
plus the `koinos_descriptors.pb` file from the **same deployment bundle**. The
gRPC service does not advertise reflection, so a reflection-only command is not
a valid test.

<!-- node-example: test-jsonrpc -->
```bash title="test-jsonrpc.sh"
--8<-- "examples/node-operators/rpc/test-jsonrpc.sh:test-jsonrpc"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/test-jsonrpc.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

<!-- node-example: test-rest -->
```bash title="test-rest.sh"
--8<-- "examples/node-operators/rpc/test-rest.sh:test-rest"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/test-rest.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

<!-- node-example: test-grpc -->
```bash title="test-grpc.sh"
--8<-- "examples/node-operators/rpc/test-grpc.sh:test-grpc"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/test-grpc.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

Use `GRPC_PLAINTEXT=1` only for the local loopback test. Public gRPC should use
TLS on port 443.

## 3. Terminate TLS and control traffic

Choose one complete proxy configuration and replace every example domain and
allowed browser origin. Do not use `*` for CORS when the caller origin is
known. Both examples cap request bodies, define timeouts, hide internal ports,
route REST/Swagger assets, and handle gRPC separately.

### Caddy

Caddy can obtain and renew certificates automatically when public DNS and
ports 80/443 are correctly configured. The configuration uses the
`caddy-ratelimit` module, which is not part of the standard Caddy binary. Build
the complete pinned
[`Dockerfile.caddy`](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/Dockerfile.caddy)
from the example directory and verify `caddy list-modules` includes
`http.handlers.rate_limit` before installation.

<!-- node-example: rpc-caddy -->
```caddyfile title="Caddyfile"
--8<-- "examples/node-operators/rpc/Caddyfile:rpc-caddy"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/Caddyfile) ·
[Validate locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

### nginx

The nginx example expects certificates to exist at the declared paths. Use
your ACME client or certificate-management process before starting nginx.

<!-- node-example: rpc-nginx -->
```nginx title="nginx.conf"
--8<-- "examples/node-operators/rpc/nginx.conf:rpc-nginx"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/nginx.conf) ·
[Validate locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

## 4. Prove internal ports are not public

Inspect the local listeners, then run the same script with the public hostname
from another network. This is read-only; it does not change firewall rules.

<!-- node-example: audit-exposure -->
```bash title="audit-exposure.sh"
--8<-- "examples/node-operators/rpc/audit-exposure.sh:audit-exposure"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc/audit-exposure.sh) ·
[Run locally](https://github.com/koinos/koinos-docs/tree/a607646343d910bab33eb8f19a6fdad763e8c5ff/examples/node-operators/rpc)

From outside the server, expect only 80/443 and any intentionally public P2P
port. Treat externally reachable 5672, 15672, 8080, 50051, or 3000 as a
misconfiguration.

## Operate from measurements

Monitor endpoint latency, non-2xx responses, container restarts, queue pressure,
head freshness, disk growth, and host saturation. Do not infer request rates
from fictional log messages, raise compute limits without a measured workload,
or use swap as a substitute for adequate memory.

Continue with [Security](security.md) and
[Operations and recovery](management.md).
