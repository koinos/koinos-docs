# Proof-of-Burn

Proof-of-Burn (PoB) is the consensus algorithm used by the Koinos blockchain. It shares properties with both Proof-of-Work (PoW) and Proof-of-Stake (PoS). At a high level, Proof-of-Burn emulates the economics Proof-of-Work while being efficient like Proof-of-Stake.

## What is Proof-of-Work?
Proof-of-Work (PoW) is a consensus mechanism used in blockchain networks, such as Bitcoin. In PoW, miners compete to solve complex mathematical puzzles to validate and add new blocks of transactions to the blockchain. These puzzles require significant computational power, so miners use specialized hardware known as mining rigs.

Mining rigs are dedicated computers designed specifically for mining cryptocurrencies. They are equipped with powerful processors, graphics cards (GPUs), and sometimes specialized chips (ASICs) optimized for solving PoW puzzles efficiently.

The costs associated with mining include the initial investment in hardware, electricity consumption, cooling systems, and maintenance. Electricity is a major ongoing cost in mining operations, as mining rigs require a lot of power to operate continuously. The electricity cost depends on factors such as the energy efficiency of the hardware, electricity rates in the mining location, and the overall energy consumption of the operation.

Miners must carefully consider these costs when deciding whether mining is profitable for them. The profitability of mining depends on various factors, including the current price of the cryptocurrency being mined, network difficulty, and operational expenses.

### Comparing Proof-of-Burn and Proof-of-Work
Like Proof-of-Work, a potential block producer has an upfront cost which gives them access to hash power, or in the case of Proof-of-Burn virtual hash power. Instead of purchasing mining rigs in the real world, they are purchasing virtual mining rigs that only exist on the blockchain itself.

While using the Proof-of-Burn algorithm, more hash power does not equate to more electricity used. Regardless of the amount of virtual hash power, a Proof-of-Burn block producer will have a constant and low energy cost.

## What is Proof-of-Stake?
Proof-of-Stake (PoS) is a consensus mechanism used in blockchain networks to validate and authenticate transactions. In PoS, block producers are chosen to create new blocks and validate transactions based on the number of cryptocurrency tokens they hold and are willing to "stake" as collateral. Block producers are selected to create blocks and validate transactions based on a combination of factors such as their stake size, the length of time they have held their stake, or other predetermined criteria. PoS aims to provide a more energy-efficient alternative to Proof-of-Work (PoW) while still maintaining security and decentralization within the blockchain network.

### Comparing Proof-of-Burn and Proof-of-Stake
Similar to Proof-of-Stake, mining blocks does not consume large amounts of electricity. It is therefore accessible to more participants to produce blocks competitively because profitability is not tied to hardware access or cheap electricity.

In traditional Proof-of-Stake blockchains a block producer stakes his coin to gain the privilege of producing blocks. The network ensures that the block producer is behaving as expected. If the network finds the block producer misbehaving, it will slash or deduct a penalty from their staked coin. 

Proof-of-Burn turns this paradigm upside down. Rather than staking coins and checking for misbehavior, Proof-of-Burn requires you to burn your coins and rewards you for good behavior. To participate you must effectively slash yourself and regain your initial capital plus interest by contributing to the network.

As we've now learned, to be eligible for block production in Proof-of-Stake one must simply stake their coins. At anytime a block producer can unstake their coins essentially reclaiming the value of their initial investment. However, with Proof-of-Burn a block producer has burnt their coins upfront which makes producing blocks on such a system a larger commitment.

---
## Advantages of virtual mining
Because mining rigs are virtualized on the blockchain, we remove the need to spend significant amounts of capital to purchase hardware from vendors. Because your chances to find blocks are not based on computational hash power you will not use exorbitant amounts of electricity to mine blocks.

This has some pretty interesting implications. The cost of electricity is much less of a factor in miner profitability. This promotes decentralization. We can observe the consolidation of large Proof-of-Work networks, like Bitcoin, to geographic areas that have access to cheap electricity. This creates additional barriers to entry for small miners and prevents further decentralization of the network because it is simply not profitable to mine depending on where you live.

---
## The mechanics
How this all works on the blockchain itself is quite straightforward. An aspiring block producer would first acquire KOIN. The block producer would then burn said KOIN and receive VHP in return. VHP is an acronym for Virtual Hash Power. The more VHP a block producer has, the more powerful their virtual mining rig is and the higher chance they have to produce a block.

---
## Dynamic supply
In the realm of block production the total supply of KOIN decreases through deflation and increases through inflation. Let's take a moment to understand the underlying processes that cause these behaviors.

### Obtaining virtual hash power
Unlike traditional blockchain vernacular, burning KOIN does not get sent to an arbitrary inactive address. Burnt KOIN is completely removed from the total supply. Because of this implementation, it is possible for the KOIN supply to decrease. This is the deflationary force on the KOIN supply.

### Block production incentives
Where do block rewards come from? The answer to this is very simple. Block producers are incentivized to participate in the network because they are paid through a modest 2% APY, or Annual Percentage Yield. This is the inflationary force on the KOIN supply.

[Understanding the tokenomics »](tokenomics.md)