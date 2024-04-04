# Proof-of-Burn

Proof-of-Burn (PoB) is the consensus algorithm used by the Koinos blockchain. It shares properties with both Proof-of-Work (PoW) and Proof-of-Stake (PoS). At a high level, Proof-of-Burn emulates the behavior of Proof-of-Work while keeping the concept of real world assets such as mining rigs virtualized on-chain.

### Similarities to Proof-of-Work
Like Proof-of-Work, a potential block producer will acquire hash power by sacrificing capital in order to have higher chances of mining blocks. The more hash power one has, the more likely they will produce a block.

### Similarities to Proof-of-Stake
Similar to Proof-of-Stake, mining blocks does not consume large amounts of electricity. It is therefore accessible to more participants to produce blocks competitively because profitability is not tied to hardware access or cheap electricity.

### Key differences between Proof-of-Stake and Proof-of-Burn
In traditional Proof-of-Stake blockchains a block producer stakes his coin to gain the privilege of producing blocks. The network ensures that the block producer is behaving as expected. If the network finds the block producer misbehaving, it will slash or deduct a penalty from their staked coin.

Proof-of-Burn turns this paradigm upside down. Rather than staking coins and checking for misbehavior, Proof-of-Burn requires you to burn your coins and rewards you for good behavior. To participate you must effectively slash yourself and regain your initial capital plus interest by contributing the network.

---
## Advantages of virtual mining
Because mining rigs are virtualized on chain, we remove the need to spend significant amounts of capital to purchase hardware from vendors. Because your chances to find blocks are not based on computational hash power you will not use exorbitant amounts of electricity to mine blocks.

This has some pretty interesting implications. For one, the cost of electricity is much less of a factor in miner profitability. This promotes decentralization. We can observe the consolidation of large Proof-of-Work networks, like Bitcoin, to geographic areas that have access to cheap electricity. This creates additional barriers to entry for small miners and prevents further decentralization of the network because it is simply not profitable to mine depending on where you live.

---
## The mechanics
How this all works on the blockchain itself is quite straightforward. An aspiring block producer would first acquire KOIN. The block producer would then burn said KOIN and receive VHP in return. VHP is an acronym for Virtual Hashpower. The more VHP a block producer has, the powerful their virtual mining rig is and the higher chance they have to produce a block.

---
## Dynamic supply
In the realm of block production the total supply of KOIN decreases through deflation and increases through inflation. Let's take a moment to understand the underlying processes that cause these behaviors.

### Obtaining virtual hashpower
Unlike traditional blockchain vernacular, burning KOIN does not get sent to an arbitrary inactive address. Burnt KOIN is completely removed from the total supply. Because of this implementation, it is possible for the KOIN supply to decrease. This is the deflationary force on the KOIN supply.

### Block production incentives
Where do block rewards come from? The answer to this is very simple. Block producers are incentivized to participate in the network because they are paid through a modest 2% APY, or Annual Percentage Yield. This is the inflationary force on the KOIN supply.

[Understanding the tokenomics »](tokenomics.md)