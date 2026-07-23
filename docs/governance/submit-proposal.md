# How to Submit a Proposal

Koinos governance proposals require careful community review and the correct
on-chain governance contract for the target network. Start by preparing and
testing the proposal on the current public testnet.

<!-- example: governance-proposal-plan -->
```javascript
--8<-- "examples/javascript/testnet/transaction-workflows/index.js:governance-proposal"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/testnet/transaction-workflows/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/testnet/transaction-workflows)

The executable example validates and prints a testnet-only proposal plan. It
does not claim to submit to a particular governance contract and never
broadcasts. Before an actual submission:

1. Publish a detailed specification and rationale.
2. Discuss it with the community.
3. Identify the current governance contract and ABI.
4. Encode and simulate every operation on testnet.
5. Review authorization, compatibility, and failure behavior.
6. Explicitly sign and broadcast only after approval.

See the [history of updates](history/vhp-bug.md) for prior governance context.
