# Connect with Koilib

- Runtime: Node.js 20 or newer
- Networks: Koinos mainnet and the public Koinos testnet
- Safety: read-only
- Input: `mainnet` or `testnet`

Install and query mainnet:

```bash
npm install
npm start
```

Query the public testnet:

```bash
npm run testnet
```

The script retrieves the current chain ID and head information. In particular,
it does not hardcode the resettable public-testnet chain ID.
