# Read-only Koinos queries

This Node.js example uses the current mainnet REST API and Koilib provider to
read head information, a public KOIN balance, token metadata, and a contract
ABI. It never signs or broadcasts a transaction.

```bash
npm install
npm start
npm test
```

No credentials are required. A transient network error is retried twice with a
short exponential delay.
