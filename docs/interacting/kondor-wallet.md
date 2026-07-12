# Working with Kondor Wallet

Learn how to integrate Kondor wallet into your dApps for seamless user interaction.

## Overview

Kondor is the primary browser wallet for Koinos, providing secure key management and dApp integration. It allows users to sign transactions without exposing their private keys to applications.

## Installation

Users need to install Kondor from:
- [Chrome Web Store](https://chrome.google.com/webstore)
- [Firefox Add-ons](https://addons.mozilla.org/firefox)

## Detection and Connection

### Check if Kondor is Available

```javascript
async function checkKondor() {
  if (typeof window.kondor !== 'undefined') {
    console.log('Kondor is installed!');
    return true;
  } else {
    console.log('Kondor not found. Please install Kondor wallet.');
    return false;
  }
}
```

### Request Connection

```javascript
async function connectKondor() {
  try {
    // Request account access
    const accounts = await window.kondor.getAccounts();
    
    if (accounts.length > 0) {
      console.log('Connected account:', accounts[0]);
      return accounts[0];
    } else {
      console.log('No accounts available');
      return null;
    }
  } catch (error) {
    console.error('Connection failed:', error);
    return null;
  }
}
```

## Using Kondor with Koilib

### Setup Signer

```javascript
const { Provider, Contract, utils } = require('koilib');

async function setupKondorSigner() {
  if (!window.kondor) {
    throw new Error('Kondor wallet not found');
  }
  
  // Get Kondor signer
  const signer = window.kondor.getSigner();
  
  // Setup provider
  const provider = new Provider('https://api.koinos.io');
  signer.provider = provider;
  
  return signer;
}
```

### Sign Transactions

```javascript
async function sendTokens() {
  try {
    const signer = await setupKondorSigner();
    
    // Create contract instance with Kondor signer
    const koin = new Contract({
      id: '19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK',
      provider: signer.provider,
      signer: signer,
      abi: utils.tokenAbi
    });
    
    // Send transaction (Kondor will prompt user)
    const { transaction, receipt } = await koin.functions.transfer({
      from: signer.address,
      to: '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe',
      value: utils.parseUnits('1', 8) // 1 KOIN
    });
    
    console.log('Transaction submitted:', transaction.id);
    
    // Wait for confirmation
    await transaction.wait();
    console.log('Transaction confirmed!');
    
  } catch (error) {
    if (error.message.includes('User rejected')) {
      console.log('User cancelled transaction');
    } else {
      console.error('Transaction failed:', error);
    }
  }
}
```

## Handling User Events

### Account Changes

```javascript
// Listen for account changes
window.kondor.on('accountsChanged', (accounts) => {
  console.log('Accounts changed:', accounts);
  if (accounts.length === 0) {
    // User disconnected
    handleDisconnection();
  } else {
    // User switched accounts
    handleAccountChange(accounts[0]);
  }
});

function handleAccountChange(newAccount) {
  console.log('Switched to account:', newAccount);
  // Update your app state
  updateUI(newAccount);
}

function handleDisconnection() {
  console.log('User disconnected');
  // Clear app state
  clearUserData();
}
```

### Network Changes

```javascript
// Listen for network changes
window.kondor.on('networkChanged', (network) => {
  console.log('Network changed to:', network);
  
  if (network === 'mainnet') {
    // Switch to mainnet endpoints
    updateProvider('https://api.koinos.io');
  } else if (network === 'testnet') {
    // Switch to testnet endpoints
    updateProvider('https://testnet.koinosfoundation.org');
  }
});
```

## Complete Integration Example

```javascript
class KondorIntegration {
  constructor() {
    this.signer = null;
    this.provider = null;
    this.connected = false;
  }
  
  async init() {
    if (!this.checkKondorAvailable()) {
      return false;
    }
    
    await this.setupEventListeners();
    return true;
  }
  
  checkKondorAvailable() {
    return typeof window.kondor !== 'undefined';
  }
  
  async connect() {
    try {
      const accounts = await window.kondor.getAccounts();
      
      if (accounts.length > 0) {
        this.signer = window.kondor.getSigner();
        this.provider = new Provider('https://api.koinos.io');
        this.signer.provider = this.provider;
        this.connected = true;
        
        console.log('Connected to Kondor:', accounts[0]);
        return accounts[0];
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
    
    return null;
  }
  
  async setupEventListeners() {
    window.kondor.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        this.disconnect();
      } else {
        this.handleAccountChange(accounts[0]);
      }
    });
    
    window.kondor.on('networkChanged', (network) => {
      this.handleNetworkChange(network);
    });
  }
  
  disconnect() {
    this.signer = null;
    this.provider = null;
    this.connected = false;
    console.log('Disconnected from Kondor');
  }
  
  handleAccountChange(account) {
    console.log('Account changed:', account);
    // Reinitialize signer with new account
    this.connect();
  }
  
  handleNetworkChange(network) {
    console.log('Network changed:', network);
    const endpoint = network === 'mainnet' 
      ? 'https://api.koinos.io' 
      : 'https://testnet.koinosfoundation.org';
    
    this.provider = new Provider(endpoint);
    if (this.signer) {
      this.signer.provider = this.provider;
    }
  }
  
  async sendTransaction(contractAddress, functionName, args) {
    if (!this.connected) {
      throw new Error('Not connected to Kondor');
    }
    
    const contract = new Contract({
      id: contractAddress,
      provider: this.provider,
      signer: this.signer,
      abi: contractAbi // Your contract ABI
    });
    
    return await contract.functions[functionName](args);
  }
}

// Usage
const kondor = new KondorIntegration();

async function initApp() {
  const available = await kondor.init();
  
  if (!available) {
    showInstallPrompt();
    return;
  }
  
  // Add connect button
  document.getElementById('connect-btn').addEventListener('click', async () => {
    const account = await kondor.connect();
    if (account) {
      showConnectedState(account);
    }
  });
}
```

## Best Practices

1. **Always check if Kondor is available** before using
2. **Handle user rejection gracefully** - users may cancel transactions
3. **Listen for account/network changes** and update your app accordingly
4. **Provide clear feedback** to users about transaction status
5. **Test on both mainnet and testnet** networks
6. **Handle errors appropriately** with user-friendly messages

## Troubleshooting

**Kondor not detected**: User needs to install the extension
**Connection failed**: User may have denied permission
**Transaction failed**: Check network, balance, and contract parameters
**Wrong network**: Ensure user is on the correct network (mainnet/testnet)

## Next Steps

- [Explore testnet](testnet.md)
- [Learn about common tasks](../exchanges/head-block.md)

