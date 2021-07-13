# Tutorials

## Using the tKOIN faucet

**tKOIN** is the Koinos blockchain testnet token. 

Anyone can participate in the Koinos test network by running a node ([instructions here](https://www.youtube.com/watch?v=64NWplpcmqU&feature=emb_logo)). By installing and running the node each user is assigned a public and private key. Using the key a user can receive tKOIN from our discord faucet using the instructions below. The private key resides in ~/.koinos/block_producer/private.key in OSx / Linux and c:\.koinos in Windows

After starting the node for the first time you can get your public key by looking at the 000.log file in the .koinos/block_producer directory. It should be on the first line with the label "**Public address:"**

``` 
cat ~/.koinos/block_producer/000.log
```

It is also displayed when you first start the node although it usually scrolls out of view very quickly. 


Once you have your public address you can join our [Discord](https://discord.com/invite/GErGNsu) server and request some tKOIN in the #koinos channel by sending the following message to the faucet bot:

```
!faucet + your public address
```

example:

```
!faucet 1ENxxuH81kytBdYe81fD9tBdYe81fD9Qxe
```

You can get your balance at any time using the command:

```
!balance + your public address
```

example:

```
!balance 1ENxxuH81kytBdYe81fD9BdYe81fD9Qxe
```
