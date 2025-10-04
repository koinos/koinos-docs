# CLI Wallet Guide

The Koinos CLI (Command Line Interface) wallet provides developers and advanced users with complete control over blockchain interactions through command-line tools.

## Overview

The Koinos CLI wallet is a powerful command-line tool designed for developers, power users, and automated systems. It provides direct access to all Koinos blockchain functionality without the need for a graphical interface, making it perfect for development workflows, automation scripts, and advanced blockchain operations.

## Key Features

### 🖥️ Command-Line Interface
- **Full CLI Control**: Complete blockchain interaction through terminal commands
- **Scriptable**: Perfect for automation and batch operations
- **Developer-Friendly**: Designed with developers in mind
- **Cross-Platform**: Works on Windows, macOS, and Linux

### 🔧 Advanced Functionality
- **Raw Transactions**: Create and sign transactions manually
- **Custom Parameters**: Full control over transaction parameters
- **Batch Operations**: Execute multiple operations in sequence
- **Network Configuration**: Connect to any Koinos network

### 🔐 Secure Key Management
- **Local Key Storage**: Keys stored securely on your local machine
- **Multiple Key Formats**: Support for various key formats
- **Backup & Recovery**: Easy backup and recovery procedures
- **Hardware Integration**: Compatible with hardware security modules

### 🚀 Development Features
- **Testing Tools**: Built-in tools for testing and development
- **Network Switching**: Easy switching between mainnet, testnet, and local networks
- **Smart Contract Interaction**: Direct smart contract calls and deployments
- **Transaction Analysis**: Detailed transaction analysis and debugging

## Installation

### Prerequisites
- **Node.js**: Version 14 or higher
- **npm**: Node package manager
- **Git**: For cloning the repository

### Installation Methods

#### Method 1: From GitHub (Recommended)
```bash
# Clone the repository
git clone https://github.com/koinos/koinos-cli.git

# Navigate to the directory
cd koinos-cli

# Install dependencies
npm install

# Build the CLI
npm run build

# Install globally
npm install -g .
```

#### Method 2: Direct Installation
```bash
# Install directly from npm (if available)
npm install -g @koinos/cli
```

### Verification
```bash
# Verify installation
koinos-cli --version

# Check available commands
koinos-cli --help
```

## Getting Started

### Initial Configuration

#### Setting Up Your First Wallet
```bash
# Create a new wallet
koinos-cli wallet create

# Set a password for your wallet
koinos-cli wallet password

# Create your first account
koinos-cli wallet create-account
```

#### Network Configuration
```bash
# Set up mainnet connection
koinos-cli config set network mainnet

# Set up testnet connection
koinos-cli config set network testnet

# Set custom RPC endpoint
koinos-cli config set rpc-url https://your-rpc-endpoint.com
```

### Basic Commands

#### Wallet Management
```bash
# List all accounts
koinos-cli wallet list

# Import an existing private key
koinos-cli wallet import <private-key>

# Export account information
koinos-cli wallet export <account-name>

# Check account balance
koinos-cli wallet balance <account-address>
```

#### Transaction Operations
```bash
# Send KOIN tokens
koinos-cli wallet transfer <from> <to> <amount>

# Check transaction status
koinos-cli transaction status <transaction-id>

# View transaction details
koinos-cli transaction info <transaction-id>
```

## Advanced Usage

### Smart Contract Interaction

#### Calling Contract Functions
```bash
# Call a read-only contract function
koinos-cli contract call <contract-address> <function-name> <parameters>

# Execute a contract function (state-changing)
koinos-cli contract execute <contract-address> <function-name> <parameters>
```

#### Contract Deployment
```bash
# Deploy a new smart contract
koinos-cli contract deploy <wasm-file> <abi-file>

# Upgrade an existing contract
koinos-cli contract upgrade <contract-address> <new-wasm-file>
```

### Account Management

#### Multi-Account Operations
```bash
# Create multiple accounts
koinos-cli wallet create-account --name account1
koinos-cli wallet create-account --name account2

# Switch between accounts
koinos-cli wallet use <account-name>

# Set default account
koinos-cli config set default-account <account-name>
```

#### Key Management
```bash
# Generate new keypair
koinos-cli keys generate

# Import from seed phrase
koinos-cli wallet import-seed "<seed-phrase>"

# Export seed phrase
koinos-cli wallet export-seed
```

### Network Operations

#### Node Interaction
```bash
# Get chain information
koinos-cli chain info

# Get latest block
koinos-cli chain head

# Get specific block
koinos-cli chain block <block-height>
```

#### Resource Management
```bash
# Check MANA balance
koinos-cli resources mana <account-address>

# Check resource limits
koinos-cli resources limits <account-address>
```

## Configuration

### Configuration File
The CLI uses a configuration file typically located at:
- **Linux/macOS**: `~/.koinos-cli/config.json`
- **Windows**: `%APPDATA%/.koinos-cli/config.json`

### Common Configuration Options
```json
{
  "network": "mainnet",
  "rpc_url": "https://api.koinos.io",
  "default_account": "my-account",
  "timeout": 30000,
  "auto_broadcast": true
}
```

### Environment Variables
```bash
# Set RPC endpoint
export KOINOS_RPC_URL="https://api.koinos.io"

# Set default network
export KOINOS_NETWORK="mainnet"

# Set wallet password (not recommended for security)
export KOINOS_WALLET_PASSWORD="your-password"
```

## Scripting & Automation

### Bash Scripting Example
```bash
#!/bin/bash

# Automated transaction script
ACCOUNT="your-account"
RECIPIENT="recipient-address"
AMOUNT="100"

# Check balance before transfer
BALANCE=$(koinos-cli wallet balance $ACCOUNT)
echo "Current balance: $BALANCE"

# Execute transfer
koinos-cli wallet transfer $ACCOUNT $RECIPIENT $AMOUNT

# Check transaction status
echo "Transfer completed"
```

### Batch Operations
```bash
# Process multiple transfers from file
while IFS=, read -r recipient amount
do
    koinos-cli wallet transfer my-account $recipient $amount
done < transfers.csv
```

## Development Workflows

### Testing Smart Contracts
```bash
# Deploy to testnet
koinos-cli config set network testnet
koinos-cli contract deploy my-contract.wasm my-contract.abi

# Run test transactions
koinos-cli contract execute <contract-address> test_function "{}"

# Check contract state
koinos-cli contract call <contract-address> get_state "{}"
```

### Mainnet Deployment
```bash
# Switch to mainnet
koinos-cli config set network mainnet

# Deploy with sufficient MANA
koinos-cli contract deploy my-contract.wasm my-contract.abi --mana 1000000

# Verify deployment
koinos-cli contract call <contract-address> version "{}"
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Test RPC connection
koinos-cli chain info

# Check network configuration
koinos-cli config show

# Reset configuration
koinos-cli config reset
```

#### Wallet Issues
```bash
# Unlock wallet
koinos-cli wallet unlock

# Reset wallet password
koinos-cli wallet reset-password

# Recover from seed
koinos-cli wallet recover "<seed-phrase>"
```

#### Transaction Failures
```bash
# Check account balance and MANA
koinos-cli wallet balance <account>
koinos-cli resources mana <account>

# View transaction error details
koinos-cli transaction error <transaction-id>
```

## Security Considerations

### Key Management
- **Secure Storage**: Store wallet files in encrypted directories
- **Backup Keys**: Regular backup of wallet and key files
- **Access Control**: Limit file system permissions for wallet files
- **Environment Isolation**: Use separate environments for testing and production

### Network Security
- **Trusted RPC**: Only connect to trusted RPC endpoints
- **SSL/TLS**: Ensure secure connections (https://)
- **Network Isolation**: Use VPNs or private networks when possible
- **Monitoring**: Monitor for unusual activity

### Operational Security
- **Regular Updates**: Keep CLI tools updated
- **Audit Scripts**: Review automation scripts regularly
- **Logging**: Implement secure logging practices
- **Access Controls**: Implement proper user access controls

## Resources & Support

### Official Resources
- **GitHub Repository**: [koinos/koinos-cli](https://github.com/koinos/koinos-cli)
- **Documentation**: [CLI README](https://github.com/koinos/koinos-cli/blob/master/README.md)
- **Issues & Support**: GitHub Issues page

### Community Resources
- **Discord**: Koinos Discord #development channel
- **Forums**: Community forums for CLI discussions
- **Examples**: Community-contributed scripts and examples

### Additional Tools
- **IDE Integration**: VS Code extensions for Koinos development
- **CI/CD**: Integration examples for continuous deployment
- **Monitoring**: Tools for monitoring CLI operations

## Next Steps

After setting up the CLI wallet:
- Explore [Smart Contract Development](../contracts/index.md) for contract interaction
- Learn about [Node Operations](../nodes/index.md) for running your own infrastructure
- Check out [Developer Guides](../developers/index.md) for advanced development patterns

---

*The Koinos CLI wallet provides unmatched control and flexibility for developers and power users. Master the command line to unlock the full potential of the Koinos blockchain.*