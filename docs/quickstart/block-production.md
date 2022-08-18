# Block production

Koinos uses the novel consensus algorithm, Proof of Burn (PoB). To participate in block production using you will need to configure your node to produce blocks as well as perform some simple actions on the blockchain.

## Proof of Burn basics

Proof of Burn is both similar and different to Proof of Work and Proof of Stake, but an altogether different consensus algorithm. Like Proof of Stake, no mining occurs to produce blocks, placing all physical nodes on an equal playing field. Hashing is simulated in Proof of Burn by burning KOIN and in this way, the algorithm works similarly to Proof of Work.

## Configuring the block producer

Please follow our guide on [running a node](./running-a-koinos-node.md). Be sure to start the node with the `--profile all` or `--profile block_producer` option to start the optional block producer micro service.

Upon starting a new node, a private block production key will be generated automatically for you. This key will be at `$KOINOS_BASE_DIR/block_producer/private.key` (`$KOINOS_BASE_DIR` is `~/.koinos` on Mac OS/Linux and `C:\koinos` for Windows if following our guide). There is a corresponding `public.key` file that is written out when the block producer runs and is always the public key corresponding to the private key that the block producer is configured to use (`private.key` by default).


