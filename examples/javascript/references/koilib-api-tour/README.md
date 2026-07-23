# Koilib API tour

This executable Node.js tour demonstrates the exported `Provider`, `Contract`,
`Serializer`, `Signer`, `Transaction`, and `utils` APIs from Koilib 9.2.0.

```bash
npm install
npm start
npm test
```

The signer uses a clearly disposable deterministic key only for local message
signing. The example never signs or broadcasts a blockchain transaction.
