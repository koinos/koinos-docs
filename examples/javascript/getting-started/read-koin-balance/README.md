# Read a KOIN balance

- Runtime: Node.js 20 or newer
- Network: Koinos mainnet
- Safety: read-only
- Input: an optional public Koinos address

Install and run:

```bash
npm install
npm start -- YOUR_PUBLIC_KOINOS_ADDRESS
```

With no argument, the script queries the documented public example address. It
prints the decimal KOIN balance returned by the mainnet REST API. It never
creates a wallet, reads a private key, or submits a transaction.
