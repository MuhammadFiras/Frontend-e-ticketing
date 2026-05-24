# ⚽ Web3 Football E-Ticketing DApp

This is a decentralized application (dApp) for purchasing and verifying football match tickets on the blockchain. It was built as a Final Project to demonstrate smart contract integration with a React frontend.

## 🌟 Features & Rubric Fulfillments
This project fulfills all the requested smart contract implementation requirements:
- **Struct & Mapping (Minimal 1):** Uses a `TicketDetails` struct and mapping to act as a digital ledger storing the buyer's address, price paid, and timestamp.
- **Write Functions (Minimal 2):** Includes `buyTicket` (to purchase and mint the NFT) and `withdrawFunds` (for the admin to collect the ETH).
- **Read/View Function (Minimal 1):** Includes `getTicketInfo` to act as a ticket scanner, retrieving struct data without spending gas fees.
- **Modifiers & Require:** Uses `require` statements for validation and a custom `onlyOwner` modifier to protect the club's funds.
- **Events (Nilai Tambah):** Emits a `TicketPurchased` event upon a successful transaction to log the sale on the blockchain.

## 🛠️ Tech Stack
- **Smart Contract:** Solidity (Deployed on Sepolia Testnet)
- **Frontend:** React.js (Vite) + Ethers.js
- **Storage:** IPFS (via Pinata) for NFT Metadata
- **Wallet Integration:** MetaMask

## 🚀 How to Run This Project Locally

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install the [MetaMask](https://metamask.io/) browser extension.
3. Switch your MetaMask network to **Sepolia** and ensure you have test Sepolia ETH.

### Installation Steps
1. Clone this repository to your local machine.
2. Open your terminal and navigate into the project folder:
   ```bash
   cd e-ticketing-app

3. Install the dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run dev
5. Open your browser and go to `http://localhost:5173` to see the app in action.

## 📖 How to Use

1. Connect: Click "Connect MetaMask" to log in to the app.

2. Purchase: Click "Buy Ticket" to trigger the smart contract and pay the 0.01 Sepolia ETH fee.

3. Verify: Once confirmed, note your new Ticket ID (it starts at 0 for the first buyer).

4. Scan: Scroll down to the Ticket Scanner, enter the ID, and click "Search" to read and verify your data directly from the blockchain.