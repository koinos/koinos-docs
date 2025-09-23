# How to Submit a Proposal

Learn how to create and submit governance proposals on Koinos.

## Overview

Koinos governance allows the community to propose changes to the blockchain through on-chain voting mechanisms.

## Proposal Process

1. **Draft Proposal**: Create detailed proposal document
2. **Community Discussion**: Engage with community for feedback
3. **Submit Proposal**: Submit on-chain proposal
4. **Voting Period**: Community votes on proposal
5. **Implementation**: Approved proposals are executed

## Submitting a Proposal

```javascript
// Example proposal submission
const proposal = {
  title: \
Upgrade
System
Contract\,
  description: \Detailed
description
of
changes\,
  operations: [
    // Operations to execute if approved
  ]
};

await governanceContract.functions.submitProposal(proposal);
```

## Best Practices

- Provide clear rationale and specifications
- Engage community before formal submission  
- Test changes thoroughly on testnet
- Consider backward compatibility

## Next Steps

- [History of updates](history/vhp-bug.md)
