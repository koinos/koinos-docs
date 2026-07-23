# Kondor browser dApp

This Vite project detects Kondor, requests account access, reads the wallet
provider's chain ID, and requests a user-approved message signature. It never
broadcasts a transaction.

```bash
npm install
npm start
npm test
npm run build
```

The online runner can demonstrate the unavailable-wallet state. Wallet
interaction requires the Kondor extension to be installed in that same browser
context; an extension installed in another browser cannot be accessed.
