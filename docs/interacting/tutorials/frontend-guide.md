# Frontend Guide: Building a dApp with Koilib + Kondor

Complete tutorial for building a frontend application that interacts with Koinos using Koilib and Kondor wallet.

## Overview

This tutorial will guide you through building a simple dApp that can:
- Connect to Kondor wallet
- Read KOIN balances
- Send KOIN transfers
- Display transaction history

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Node.js and npm installed
- Understanding of [Kondor wallet integration](../kondor-wallet.md)

## Project Setup

### 1. Initialize Project

```bash
mkdir koinos-dapp
cd koinos-dapp
npm init -y
```

### 2. Install Dependencies

```bash
npm install koilib
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

### 3. Project Structure

```
koinos-dapp/
├── src/
│   ├── index.html
│   ├── index.js
│   ├── styles.css
│   └── wallet.js
├── package.json
└── webpack.config.js
```

## Implementation

### HTML Structure (src/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Koinos dApp</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Koinos dApp</h1>
            <div id="network-status"></div>
        </header>
        
        <main>
            <!-- Connection Section -->
            <section id="connection-section">
                <button id="connect-btn" class="btn primary">Connect Kondor</button>
                <div id="install-prompt" class="hidden">
                    <p>Kondor wallet not found. Please install it first.</p>
                    <a href="https://chrome.google.com/webstore" target="_blank" class="btn">Install Kondor</a>
                </div>
            </section>
            
            <!-- Wallet Section -->
            <section id="wallet-section" class="hidden">
                <div class="wallet-info">
                    <h2>Wallet Connected</h2>
                    <p><strong>Address:</strong> <span id="wallet-address"></span></p>
                    <p><strong>Balance:</strong> <span id="wallet-balance">Loading...</span> KOIN</p>
                    <button id="disconnect-btn" class="btn secondary">Disconnect</button>
                </div>
                
                <!-- Transfer Section -->
                <div class="transfer-section">
                    <h3>Send KOIN</h3>
                    <form id="transfer-form">
                        <input type="text" id="recipient" placeholder="Recipient address" required>
                        <input type="number" id="amount" placeholder="Amount (KOIN)" step="0.00000001" required>
                        <button type="submit" class="btn primary">Send</button>
                    </form>
                </div>
                
                <!-- Status Section -->
                <div id="status-section">
                    <div id="loading" class="hidden">Processing...</div>
                    <div id="success" class="hidden"></div>
                    <div id="error" class="hidden"></div>
                </div>
            </section>
        </main>
    </div>
    
    <script src="index.js"></script>
</body>
</html>
```

### Styling (src/styles.css)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 40px;
    color: white;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

#network-status {
    font-size: 0.9rem;
    opacity: 0.8;
}

section {
    background: white;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
}

.btn:hover {
    background: #5a67d8;
    transform: translateY(-2px);
}

.btn.secondary {
    background: #718096;
}

.btn.secondary:hover {
    background: #4a5568;
}

.wallet-info {
    margin-bottom: 30px;
}

.wallet-info h2 {
    color: #2d3748;
    margin-bottom: 15px;
}

.transfer-section h3 {
    margin-bottom: 20px;
    color: #2d3748;
}

#transfer-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

#transfer-form input {
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
}

#transfer-form input:focus {
    outline: none;
    border-color: #667eea;
}

.hidden {
    display: none;
}

#loading {
    color: #3182ce;
    font-weight: 500;
}

#success {
    color: #38a169;
    font-weight: 500;
}

#error {
    color: #e53e3e;
    font-weight: 500;
}

@media (max-width: 600px) {
    .container {
        padding: 10px;
    }
    
    header h1 {
        font-size: 2rem;
    }
    
    section {
        padding: 20px;
    }
}
```

### Wallet Integration (src/wallet.js)

```javascript
const { Provider, Contract, utils } = require('koilib');

class KoinosWallet {
    constructor() {
        this.signer = null;
        this.provider = null;
        this.connected = false;
        this.koinContract = null;
        
        this.setupEventListeners();
    }
    
    async init() {
        if (!this.isKondorAvailable()) {
            return false;
        }
        
        // Setup provider
        this.provider = new Provider('https://api.koinos.io');
        
        // Setup KOIN contract
        this.koinContract = new Contract({
            id: '19GYjDBVXU7keLbYvMLazsGQn3GTWHjHkK',
            provider: this.provider,
            abi: utils.tokenAbi
        });
        
        return true;
    }
    
    isKondorAvailable() {
        return typeof window.kondor !== 'undefined';
    }
    
    async connect() {
        try {
            const accounts = await window.kondor.getAccounts();
            
            if (accounts.length > 0) {
                this.signer = window.kondor.getSigner();
                this.signer.provider = this.provider;
                this.koinContract.signer = this.signer;
                this.connected = true;
                
                return accounts[0];
            }
        } catch (error) {
            console.error('Connection failed:', error);
            throw error;
        }
        
        return null;
    }
    
    disconnect() {
        this.signer = null;
        this.connected = false;
        if (this.koinContract) {
            this.koinContract.signer = null;
        }
    }
    
    async getBalance(address) {
        try {
            const { result } = await this.koinContract.functions.balanceOf({
                owner: address
            });
            
            return utils.formatUnits(result.value, 8);
        } catch (error) {
            console.error('Balance query failed:', error);
            throw error;
        }
    }
    
    async transfer(to, amount) {
        if (!this.connected) {
            throw new Error('Wallet not connected');
        }
        
        try {
            const { transaction, receipt } = await this.koinContract.functions.transfer({
                from: this.signer.address,
                to: to,
                value: utils.parseUnits(amount, 8)
            });
            
            if (receipt.reverted) {
                throw new Error('Transaction reverted: ' + receipt.logs);
            }
            
            return { transaction, receipt };
        } catch (error) {
            console.error('Transfer failed:', error);
            throw error;
        }
    }
    
    setupEventListeners() {
        if (typeof window !== 'undefined' && window.kondor) {
            window.kondor.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnect();
                    window.dispatchEvent(new CustomEvent('walletDisconnected'));
                } else {
                    window.dispatchEvent(new CustomEvent('accountChanged', { 
                        detail: accounts[0] 
                    }));
                }
            });
            
            window.kondor.on('networkChanged', (network) => {
                window.dispatchEvent(new CustomEvent('networkChanged', { 
                    detail: network 
                }));
            });
        }
    }
}

module.exports = KoinosWallet;
```

### Main Application (src/index.js)

```javascript
const KoinosWallet = require('./wallet');

class KoinosApp {
    constructor() {
        this.wallet = new KoinosWallet();
        this.currentAccount = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.init();
    }
    
    initializeElements() {
        // Connection elements
        this.connectBtn = document.getElementById('connect-btn');
        this.installPrompt = document.getElementById('install-prompt');
        this.connectionSection = document.getElementById('connection-section');
        
        // Wallet elements
        this.walletSection = document.getElementById('wallet-section');
        this.walletAddress = document.getElementById('wallet-address');
        this.walletBalance = document.getElementById('wallet-balance');
        this.disconnectBtn = document.getElementById('disconnect-btn');
        
        // Transfer elements
        this.transferForm = document.getElementById('transfer-form');
        this.recipientInput = document.getElementById('recipient');
        this.amountInput = document.getElementById('amount');
        
        // Status elements
        this.loading = document.getElementById('loading');
        this.success = document.getElementById('success');
        this.error = document.getElementById('error');
        this.networkStatus = document.getElementById('network-status');
    }
    
    setupEventListeners() {
        this.connectBtn.addEventListener('click', () => this.connectWallet());
        this.disconnectBtn.addEventListener('click', () => this.disconnectWallet());
        this.transferForm.addEventListener('submit', (e) => this.handleTransfer(e));
        
        // Wallet events
        window.addEventListener('walletDisconnected', () => this.handleDisconnection());
        window.addEventListener('accountChanged', (e) => this.handleAccountChange(e.detail));
        window.addEventListener('networkChanged', (e) => this.handleNetworkChange(e.detail));
    }
    
    async init() {
        const available = await this.wallet.init();
        
        if (!available) {
            this.showInstallPrompt();
        } else {
            this.updateNetworkStatus('Mainnet');
        }
    }
    
    showInstallPrompt() {
        this.connectBtn.style.display = 'none';
        this.installPrompt.classList.remove('hidden');
    }
    
    async connectWallet() {
        try {
            this.showStatus('Connecting...', 'loading');
            
            const account = await this.wallet.connect();
            
            if (account) {
                this.currentAccount = account;
                await this.showWalletInfo();
                this.hideStatus();
            } else {
                this.showStatus('Connection failed', 'error');
            }
        } catch (error) {
            this.showStatus(`Connection failed: ${error.message}`, 'error');
        }
    }
    
    disconnectWallet() {
        this.wallet.disconnect();
        this.handleDisconnection();
    }
    
    async showWalletInfo() {
        this.connectionSection.classList.add('hidden');
        this.walletSection.classList.remove('hidden');
        
        this.walletAddress.textContent = this.currentAccount;
        
        // Load balance
        try {
            const balance = await this.wallet.getBalance(this.currentAccount);
            this.walletBalance.textContent = balance;
        } catch (error) {
            this.walletBalance.textContent = 'Error loading balance';
            console.error('Balance load failed:', error);
        }
    }
    
    handleDisconnection() {
        this.currentAccount = null;
        this.connectionSection.classList.remove('hidden');
        this.walletSection.classList.add('hidden');
        this.hideStatus();
    }
    
    async handleAccountChange(account) {
        this.currentAccount = account;
        if (account) {
            await this.showWalletInfo();
        }
    }
    
    handleNetworkChange(network) {
        this.updateNetworkStatus(network);
        
        if (network === 'mainnet') {
            this.wallet.provider = new Provider('https://api.koinos.io');
        } else if (network === 'testnet') {
            this.wallet.provider = new Provider('https://harbinger-api.koinos.io');
        }
    }
    
    updateNetworkStatus(network) {
        this.networkStatus.textContent = `Connected to ${network}`;
    }
    
    async handleTransfer(e) {
        e.preventDefault();
        
        const recipient = this.recipientInput.value.trim();
        const amount = this.amountInput.value.trim();
        
        if (!recipient || !amount) {
            this.showStatus('Please fill in all fields', 'error');
            return;
        }
        
        try {
            this.showStatus('Sending transaction...', 'loading');
            
            const { transaction } = await this.wallet.transfer(recipient, amount);
            
            this.showStatus(`Transaction sent: ${transaction.id}`, 'success');
            
            // Wait for confirmation
            await transaction.wait();
            
            this.showStatus('Transaction confirmed!', 'success');
            
            // Refresh balance
            const newBalance = await this.wallet.getBalance(this.currentAccount);
            this.walletBalance.textContent = newBalance;
            
            // Clear form
            this.transferForm.reset();
            
        } catch (error) {
            let errorMessage = error.message;
            
            if (errorMessage.includes('insufficient')) {
                errorMessage = 'Insufficient balance';
            } else if (errorMessage.includes('rejected')) {
                errorMessage = 'Transaction cancelled by user';
            }
            
            this.showStatus(`Transfer failed: ${errorMessage}`, 'error');
        }
    }
    
    showStatus(message, type) {
        this.hideStatus();
        
        const element = this[type];
        if (element) {
            element.textContent = message;
            element.classList.remove('hidden');
        }
    }
    
    hideStatus() {
        this.loading.classList.add('hidden');
        this.success.classList.add('hidden');
        this.error.classList.add('hidden');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new KoinosApp();
});
```

### Webpack Configuration (webpack.config.js)

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    devServer: {
        static: './dist',
        hot: true,
    },
    mode: 'development',
};
```

### Package.json Scripts

```json
{
  "scripts": {
    "start": "webpack serve --open",
    "build": "webpack --mode=production",
    "dev": "webpack serve --mode=development"
  }
}
```

## Running the Application

### Development

```bash
npm start
```

This will start the development server at `http://localhost:8080`.

### Production Build

```bash
npm run build
```

This creates a `dist/` folder with optimized files for deployment.

## Features Implemented

1. **Kondor Integration**: Connect/disconnect wallet
2. **Balance Display**: Show current KOIN balance
3. **Token Transfer**: Send KOIN to other addresses
4. **Network Detection**: Display current network
5. **Error Handling**: User-friendly error messages
6. **Responsive Design**: Works on mobile and desktop

## Next Steps

### Enhancements

1. **Transaction History**: Display recent transactions
2. **Multiple Tokens**: Support for other tokens
3. **Contract Interaction**: Call custom smart contracts
4. **Advanced Features**: Multi-sig, batch operations
5. **State Management**: Use React/Vue for complex apps

### Deployment

1. **IPFS**: Decentralized hosting
2. **GitHub Pages**: Free static hosting
3. **Netlify/Vercel**: Modern deployment platforms
4. **Domain Setup**: Custom domain configuration

This tutorial provides a solid foundation for building Koinos dApps with modern web technologies and best practices.

