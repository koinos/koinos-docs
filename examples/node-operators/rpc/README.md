# RPC-node examples

These examples target the official Koinos multiservice deployment bundle at
commit `821674672e699bf56e94d7c0e8bce122e83d1482`.

Copy `env.example` to `.env` in that checkout to enable the `api` profile while
keeping JSON-RPC, REST, gRPC, RabbitMQ, and RabbitMQ management on loopback.
Only P2P is directly public.

Choose **one** reverse proxy:

- build `Dockerfile.caddy`, replace the domains and allowed web origin in
  `Caddyfile`, then install both as the Caddy deployment; the pinned custom
  build supplies the rate-limit module used by the configuration;
- replace the domains, allowed web origin, and certificate paths in
  `nginx.conf`, then install it as the complete nginx configuration.

Run read-only protocol checks from this directory:

```text
./test-jsonrpc.sh http://127.0.0.1:8080
./test-rest.sh http://127.0.0.1:3000
GRPC_PLAINTEXT=1 ./test-grpc.sh 127.0.0.1:50051 /path/to/config/koinos_descriptors.pb
./audit-exposure.sh
```

Run `audit-exposure.sh rpc.example.com` from a **different host** to verify that
only intended public ports are reachable. For a public RPC host, ports 80 and
443 should be open; P2P 8888 is optional by role. Ports 5672, 15672, 8080,
50051, and 3000 should remain closed externally.
