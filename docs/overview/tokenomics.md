# Tokenomics
Token economics, also called tokenomics, covers all details of a token economy. There are several different attributes to look at. [Decrypt U](https://decrypt.co/resources/tokenomics) identifies five key areas to consider when discussing tokenomics. Those are token mining, utility, distribution, vesting/lockups, and burning. Tokenomics are one of the ways that blockchains and dApps set themselves apart even when using similar or identical technology.

---
## KOIN and VHP
There are two tokens that are a part of the core Koinos system, KOIN and VHP (Virtual Hash Power). VHP is used exclusively for the [Poof-of-Burn](./proof-of-burn.md) consensus algorithm, but it plays an important role in the tokenomics of Koinos.

### KOIN Supply
The KOIN supply is the total amount of KOIN in circulation. This does not include the KOIN that has not been claimed from the [initial mining](#initial-mining) phase.

### VHP Supply
The VHP supply is the total amount of VHP in existence. This is a direct result of the Proof-of-Burn consensus algorithm. VHP is created when an aspiring block producer burns KOIN and is destroyed when a block is created.

### Virtual Supply
The virtual supply is the combined supply of KOIN and VHP. When minting KOIN for block production, the virtual supply is used.

### Outstanding Supply
The outstanding KOIN supply and outstanding virtual supply are their respective supplies but also considering the unclaimed KOIN. This is a useful supply to consider because more KOIN can be claimed at any moment, increasing the KOIN supply.

### Fully Diluted Supply
There is no fully diluted KOIN supply because Koinos funds block production through minting new KOIN.

---
## Mining
Token mining refers to the creation of new tokens. This can be during the initial distribution as well as throughout the lifetime of a blockchain.

### Initial Mining
KOIN was originally created through Proof-of-Work mining. Two smart contracts were uploaded to Ethereum that facilitated the initial distribution of KOIN. Over the course of a year, anyone could mine KOIN by submitting proofs to the smart contract and would be rewarded with new KOIN for their efforts. There was a limit on the KOIN supply during this period of 100,000,000 KOIN. During the mining period, 99,738,744.02587864 KOIN was mined, or 99.739% of the possible supply.

When the Koinos Mainnet was launched, the KOIN balances were imported to Koinos where KOIN holders could claim their Ethereum based KOIN on Koinos. After the snap shot, the Ethereum based KOIN token became worthless.

### Block Rewards
There is a 2% APY on the KOIN supply that is paid out to block producers. When calculating how much KOIN to create, the virtual supply is used. This ensures a consistent and reliable block reward for block producers over time.

In addition to the new KOIN created each block, some VHP is converted back in to KOIN when a block is produced.

---
## Utility
The utility of KOIN is primarily in granting access to use Koinos through [Mana](./mana.md) and secondarily in being burned to participate in block production through Proof-of-Burn.

There is an interesting dichotomy in these two forms of utility because they are mutually exclusive. KOIN can either grant you Mana to use Koinos, or it can be burned for VHP to produce blocks. But it cannot do both at the same time. Therefore, there are opportunity costs regardless of what you do with your KOIN and over time the market will determine the relative utility of KOIN in these two scenarios.

---
## Distribution
The KOIN distribution was a completely fair launch. There were no tokens allocated to the team. There were no tokens allocated to investors. The KOIN mining was announced in advanced and free open-source mining software was provided for anyone that wanted to participate. The mining phase lasted four one year, which provided ample time for anyone to participate in it that wanted to.

This launch sets KOIN apart from almost every other token that did some sort of pre-sale (e.g. initial coin offering or initial exchange offering) or air-drop based on a pre-sale token. There was no "ninja" or "insta" mining due to the advanced notice and provision of the mining software by the core team. This combination of factors puts KOIN in rarified company with Bitcoin and scarce others for fairest token launches and distributions.

---
## Vesting
There is no formal vesting of KOIN. There is a small lockup of KOIN when consuming Mana. Only KOIN with 100% Mana can be transferred to another address, but Mana regenerates over five days at most and so the lockup is relatively short.

---
## Burning
KOIN is burned and converted in to VHP when participating in Proof-of-Burn. While VHP is turned back in to KOIN, it takes months to do so. Burning KOIN creates immediate deflationary pressure on KOIN.

Additionally, both KOIN and VHP allow burning of the tokens external to their use in Proof-of-Burn, permanently removing them for their respective supplies with no way of getting them back. Anyone can invoke this behavior on their own tokens at their sole discretion.
