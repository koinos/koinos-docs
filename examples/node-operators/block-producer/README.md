# Block-producer examples

These examples target mainnet and the official Koinos multiservice bundle at
commit `821674672e699bf56e94d7c0e8bce122e83d1482`.

- `config.yml` is a complete mainnet configuration with a deliberately invalid
  producer-address placeholder. Replace it only after verifying the account,
  public key, chain ID, and current Proof-of-Burn contract.
- `harden-producer-key.sh` defaults to dry-run and applies owner-only private
  key permissions only with `--apply`.
- `verify-production.sh` reads the most recent locally produced block ID and
  confirms it through both the local block store and a canonical public
  endpoint. It never produces or broadcasts a block itself.

No script registers a key, burns KOIN, enables the producer profile, or
broadcasts a transaction. Those decisions are intentionally manual and
irreversible.
