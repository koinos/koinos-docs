# Node requirements

Below are the node requirements using the provided Docker Compose scripts.

## Minimum requirements

- A modern CPU with 4 cores (Intel i3 9300 or AMD Ryzen 3300 equivalent)
- 8 GB RAM
- 40 GB free disk space (As of May 2024, 18 GB is required, but the amount is constantly growing)
- 10 mbps down/up internet connection

## Recommended requirements

- A modern CPU with 8 cores (Intel i7 9700 or AMD Ryzen 3700 equivalent)
- 16 GB RAM
- 100 GB free disk space (As of May 2024, 18 GB is required, but the amount is constantly growing)
- 25 mbps down/ 10 mbps up internet connection

## Note on disk space

As of May 2024, only 18 GB of disk space is required. However, due the every growing nature of blockchains, more and more disk space will be needed to run a node. It is recommended that you have plenty of free space to allow for that growth without having to constantly monitor your node.

If you are running additional microservices, specifically those enabled with the API profile, your disk usage will be more to accommodate for the additional data tracked by those microservices. As of May 2024, running with the optional API microservices requires 30 GB total (12 GB more than the minimal configuration) and will grow at a faster rate.
