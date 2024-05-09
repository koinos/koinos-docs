---
icon: fontawesome/solid/fire
---

# Proof-of-Burn
Koinos' Proof-of-Burn (PoB) algorithm is designed to be a fair and efficient consensus mechanism. In this system, participants "burn" tokens, thereby demonstrating their commitment and reducing the circulating supply of the token. To determine block validators, participants submit cryptographic proofs. Validators are selected randomly based on the size of the burn relative to the total amount burned within a specific time window, ensuring that larger burns have a higher chance of being selected. This mechanism incentivizes participants to contribute to the network's security and stability by sacrificing tokens, with the potential reward of becoming block validators and earning block rewards in return. The Proof-of-Burn concept aligns with Koinos' aim to create a fair and sustainable blockchain ecosystem.

---
## Consensus in a smart contract
At genesis Koinos mainnet did not include any smart contracts. The base implementation was federated and the genesis key had sole ability to produce blocks. Within a handful of blocks, smart contracts that give Koinos its functionality were uploaded. One of those smart contracts was the [Proof-of-Burn consensus algorithm](https://github.com/koinos/koinos-contracts-as/blob/master/contracts/pob/assembly/Pob.ts).

All system smart contracts can be found on GitHub under the [Koinos organization](https://github.com/koinos). Those that are implemented with AssemblyScript can be found in the [Koinos Contract AS repository](https://github.com/koinos/koinos-contracts-as). While those that are implemented in C++ can be found in the [Koinos Contract CPP respository](https://github.com/koinos/koinos-contracts-cpp). The Proof-of-Burn consensus is implemented using AssemblyScript.

[Read the PoB smart contract »](https://github.com/koinos/koinos-contracts-as/blob/master/contracts/pob/assembly/Pob.ts)

---
## Vocabulary terms
To better understand the following sections it may be helpful to define some vocabulary terms.

_**Table 1.** A table containing commonly used vocabulary terms when discussiong Koinos' consensus algorithm._

| Term | Definition |
| --- | --- |
| VHP | VHP is an acronym and a token ticker for Virtual Hash Power. It is a representation of block production power and is analagous to hashrate in Proof-of-Work consensus algorithms. |
| Effective VHP | The amount of VHP that should be accounted for with regard to consensus operations. Effective VHP is equal to your VHP balance after 20 blocks. |
| Virtual supply | This is defined as total KOIN supply + total VHP supply. |
| VRF | This is an acronym for Verifiable Random Function. It is used to generate a random number that is cryptographically verified as random. |
| Hot wallet | A hot wallet is often used for convenience and usability reasons, the keys are stored and used on a machine that is actively connected to the internet. |
| Producer address | The account that holds both KOIN and VHP for use during block production. |

---
## The Proof-of-Burn contract ABI
Because the consensus algorithm (PoB) is implemented as a smart contract, interacting with it is accomplished through normal smart contract calls. Like all other smart contracts it has an Application Binary Interface or ABI.

```proto linenums="1" title="pob.abi"
{
   "methods" : {
      "burn": {
         "argument"    : "koinos.contracts.pob.burn_arguments",
         "return"      : "koinos.contracts.pob.burn_result",
         "entry-point" : "0x859facc5",
         "description" : "Burns KOIN to receive VHP",
         "read-only"   : false
      },
      "register_public_key": {
         "argument"    : "koinos.contracts.pob.register_public_key_arguments",
         "return"      : "koinos.contracts.pob.register_public_key_result",
         "entry-point" : "0x53192be1",
         "description" : "Registers a block production public key to an address",
         "read-only"   : false
      },
      "get_public_key": {
         "argument"    : "koinos.contracts.pob.get_public_key_arguments",
         "return"      : "koinos.contracts.pob.get_public_key_result",
         "entry-point" : "0x96634f68",
         "description" : "Gets the public key registered to a producer address",
         "read-only"   : true
      },
      "get_metadata": {
         "argument"    : "koinos.contracts.pob.get_metadata_arguments",
         "return"      : "koinos.contracts.pob.get_metadata_result",
         "entry-point" : "0xfcf7a68f",
         "description" : "Returns the PoB metadata",
         "read-only"   : true
      },
      "get_consensus_parameters": {
         "argument"    : "koinos.contracts.pob.get_consensus_parameters_arguments",
         "return"      : "koinos.contracts.pob.get_consensus_parameters_result",
         "entry-point" : "0x5fd7ac0f",
         "description" : "Returns the PoB consensus parameters",
         "read-only"   : true
      },
      "update_consensus_parameters": {
         "argument"    : "koinos.contracts.pob.update_consensus_parameters_arguments",
         "return"      : "koinos.contracts.pob.update_consensus_parameters_result",
         "entry-point" : "0x793e7c30",
         "description" : "Updates the PoB consensus parameters",
         "read-only"   : false
      }
   },
   "types" : "CpQNCh5rb2lub3MvY29udHJhY3RzL3BvYi9wb2IucHJvdG8SFGtvaW5vcy5jb250cmFjdHMucG9iGhRrb2lub3Mvb3B0aW9ucy5wcm90byLiAQoUY29uc2Vuc3VzX3BhcmFtZXRlcnMSPwocdGFyZ2V0X2FubnVhbF9pbmZsYXRpb25fcmF0ZRgBIAEoDVIZdGFyZ2V0QW5udWFsSW5mbGF0aW9uUmF0ZRIuChN0YXJnZXRfYnVybl9wZXJjZW50GAIgASgNUhF0YXJnZXRCdXJuUGVyY2VudBIyChV0YXJnZXRfYmxvY2tfaW50ZXJ2YWwYAyABKA1SE3RhcmdldEJsb2NrSW50ZXJ2YWwSJQoOcXVhbnR1bV9sZW5ndGgYBCABKA1SDXF1YW50dW1MZW5ndGgiZgoRcHVibGljX2tleV9yZWNvcmQSIwoKcHVibGljX2tleRgBIAEoDEIEgLUYAFIJcHVibGljS2V5EiwKEHNldF9ibG9ja19oZWlnaHQYAiABKARCAjABUg5zZXRCbG9ja0hlaWdodCJ2CghtZXRhZGF0YRIYCgRzZWVkGAEgASgMQgSAtRgAUgRzZWVkEiQKCmRpZmZpY3VsdHkYAiABKAxCBIC1GABSCmRpZmZpY3VsdHkSKgoPbGFzdF9ibG9ja190aW1lGAMgASgEQgIwAVINbGFzdEJsb2NrVGltZSJ4Cg5zaWduYXR1cmVfZGF0YRIhCgl2cmZfcHJvb2YYASABKAxCBIC1GABSCHZyZlByb29mEh8KCHZyZl9oYXNoGAIgASgMQgSAtRgAUgd2cmZIYXNoEiIKCXNpZ25hdHVyZRgDIAEoDEIEgLUYAFIJc2lnbmF0dXJlIkoKC3ZyZl9wYXlsb2FkEhgKBHNlZWQYASABKAxCBIC1GABSBHNlZWQSIQoKYmxvY2tfdGltZRgCIAEoBEICMAFSCWJsb2NrVGltZSJmCh1yZWdpc3Rlcl9wdWJsaWNfa2V5X2FyZ3VtZW50cxIgCghwcm9kdWNlchgBIAEoDEIEgLUYBlIIcHJvZHVjZXISIwoKcHVibGljX2tleRgCIAEoDEIEgLUYAFIJcHVibGljS2V5IhwKGnJlZ2lzdGVyX3B1YmxpY19rZXlfcmVzdWx0IocBCg5idXJuX2FyZ3VtZW50cxIlCgx0b2tlbl9hbW91bnQYASABKARCAjABUgt0b2tlbkFtb3VudBInCgxidXJuX2FkZHJlc3MYAiABKAxCBIC1GAZSC2J1cm5BZGRyZXNzEiUKC3ZocF9hZGRyZXNzGAMgASgMQgSAtRgGUgp2aHBBZGRyZXNzIg0KC2J1cm5fcmVzdWx0IiQKImdldF9jb25zZW5zdXNfcGFyYW1ldGVyc19hcmd1bWVudHMiYwofZ2V0X2NvbnNlbnN1c19wYXJhbWV0ZXJzX3Jlc3VsdBJACgV2YWx1ZRgBIAEoCzIqLmtvaW5vcy5jb250cmFjdHMucG9iLmNvbnNlbnN1c19wYXJhbWV0ZXJzUgV2YWx1ZSIYChZnZXRfbWV0YWRhdGFfYXJndW1lbnRzIksKE2dldF9tZXRhZGF0YV9yZXN1bHQSNAoFdmFsdWUYASABKAsyHi5rb2lub3MuY29udHJhY3RzLnBvYi5tZXRhZGF0YVIFdmFsdWUiYAoZcmVnaXN0ZXJfcHVibGljX2tleV9ldmVudBIeCgdhZGRyZXNzGAEgASgMQgSAtRgGUgdhZGRyZXNzEiMKCnB1YmxpY19rZXkYAiABKAxCBIC1GABSCXB1YmxpY0tleSI8ChhnZXRfcHVibGljX2tleV9hcmd1bWVudHMSIAoIcHJvZHVjZXIYASABKAxCBIC1GAZSCHByb2R1Y2VyIjMKFWdldF9wdWJsaWNfa2V5X3Jlc3VsdBIaCgV2YWx1ZRgBIAEoDEIEgLUYAFIFdmFsdWUiaQoldXBkYXRlX2NvbnNlbnN1c19wYXJhbWV0ZXJzX2FyZ3VtZW50cxJACgV2YWx1ZRgBIAEoCzIqLmtvaW5vcy5jb250cmFjdHMucG9iLmNvbnNlbnN1c19wYXJhbWV0ZXJzUgV2YWx1ZSIkCiJ1cGRhdGVfY29uc2Vuc3VzX3BhcmFtZXRlcnNfcmVzdWx0QjxaOmdpdGh1Yi5jb20va29pbm9zL2tvaW5vcy1wcm90by1nb2xhbmcva29pbm9zL2NvbnRyYWN0cy9wb2JiBnByb3RvMw=="
}
```

Let us elaborate on all entry points provided by the PoB contract.

_**Table 2.** A table containing descriptions of entry points on the Proof-of-burn contract.._

| <div style="width:225px">Entry point</div> | Description |
| --- | --- |
| `burn` | This method allows an account to burn their KOIN and receive VHP in return. The system always provides a 1:1 exchange from KOIN to VHP. |
| `register_public_key` | For security purposes, the account that holds value (in VHP and KOIN) and different from the private key used to sign blocks. This method allows an account to associate their "producer address" with the keys that will sign blocks and therefore be a hot wallet. |
| `get_public_key` | A simple read method that allows a user to see what public key is associated with a particular producer address. |
| `get_metadata` | This method is used to retrieve current consensus metadata which includes the current difficulty, seed, and the last block time. |
| `get_consensus_parameters` | This read method retrieves the currently active consensus parameters. It includes the target annual inflation, the target burn percentage, target block time, and the quantum length. |
| `update_consensus_parameters` | This method allows the consensus parameters to be updated. Currently this can only occur through the governance process. |

---
## Block production
In many ways PoB works very similar to Proof-of-Work (PoW). Like PoW, there is a constantly adjusting difficulty. The more VHP that produces on the network, the more difficult it is to produce a valid block. The difficulty adjustment algorithm is borrowed from Ethereum's PoW implementation verbatim.

### Calculating the difficulty target
The target difficulty can be calculated by retrieving the current difficulty from calling the `get_metadata` entry point converting it to a `uint128` and using it as the denominator with the maximum value of a `uint128` as the numerator.

Simpy put the `target` can be defined as `max(uint128) / difficulty`.

### Determining if a block has met the target difficulty
Using the seed from `get_metadata` along with the current block time, block producers use a VRF (verifiable random function) to generate a proof and a proof hash. Using the proof hash, we then right bitshift it by 128 and divide that number by current effective VHP balance of the producer address. If that value is under the difficulty target, we consider the difficulty met and the block can be considered valid.

This can be understood simply with `(proof_hash >> 128) / vhp_balance < target`.

---
## Effective VHP
To prevent certain abuses, using the same VHP to produce with different accounts in order to gain an advantage, we introduce the concept of effective VHP. When VHP is moved there is a block delay before it becomes "effective". The block window where VHP becomes effective is 20 blocks. This implementation can be found in the VHP contract itself.

[Read the VHP contract »](https://github.com/koinos/koinos-contracts-as/blob/master/contracts/vhp/assembly/Vhp.ts)

---
## Target burn percentage and annual inflation
Let's begin with some real world numbers. The current mainnet target annual inflation is 2% and the target burn percentage is 50.1%. This means that if the target burn percentage is met the annual inflation will work out to 2% of the current total virtual supply. The yield of a block producer would also be 2% annually.

### What happens if the target burn percentage is not met?
If we are under the target burn percentage we have the same annual inflation but there is less VHP producing. This effective increases the return of block production. The system innately incentivizes more block producers to hop on the network and contribute to network security.

### What happens if we exceed the target burn percentage?
If we are over the target burn percentage, again, we have the same annual inflation but there is more VHP producing. This will decrease the return of block production. This state effectively discourages block producers to operate creating an economic downward pressure on creating new VHP for block production.

---
## The actual target annual inflation
Because new KOIN is being minted every block and we target 2% annual inflation, we must account for a compounding effect. We use the following equation to set the annual inflation within the smart contract.

Where:
```
x = target annual inflation
y = block per year
z = desired inflation rate
```

The actual target inflation can be expressed as: `x = y*((1 + z)^(1 / y) - 1)`

Therefore, technically the target annual inflation is set to 1.9802%, which is effectively 2% when considering the compounding effect of newly minted KOIN over the year.

---
## Block producer security
Having an account with large amounts of VHP and KOIN is considered valuable and should be kept secure. It is always recommended to keep your cryptocurrency secure and to achieve this you should avoid keeping your assets in a hot wallet. Because of this reality, we introduce the public key pairing in our consensus algorithm. You may associate a hot public/private key pairing with your producer address in order to safeguard your assets.

In other words, the safest way to produce blocks is to keep your producer address in cold storage and your block producer key pair hot. See the `register_public_key` entry point for more information on this topic.

---
## Block resources
As you may know already, every bit of computation, disk, and storage is paid for on Koinos through a user's mana. However, there is additional processing on the blockchain that occurs outside of transactions when processing a block. Like transactions, this is also paid for by the user. Unlike normal transactions, this cost is paid for by the block producer.

Because the costs of processing a block is paid for by the block producer, it is necessary for the producer address to contain both VHP and KOIN. The block producer must maintain enough KOIN in order to meet the mana requirements for submitting a block in additional to having enough VHP to meet the target difficulty.