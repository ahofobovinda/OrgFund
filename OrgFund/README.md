# OrgFund

OrgFund is a blockchain-based application designed to manage organizational funds with full transparency. Built on the Internet Computer platform, OrgFund provides secure, decentralized, and auditable financial records for organizations. The platform allows users to track income, expenses, and balances while ensuring every transaction is recorded on the blockchain for accountability. The application features a user-friendly API built with Node.js and Express.js, and leverages Azle for smart contract development. With stable and durable storage using StableBTreeMap, OrgFund guarantees data persistence even after canister upgrades. This project includes endpoints for creating, retrieving, updating, and deleting transactions, offering complete transparency for all financial activities.

## Features
- Decentralized financial management using blockchain
- Secure and auditable transaction history
- User-friendly API for transaction management
- Built with Node.js, Express.js, and Azle
- Data persistence with StableBTreeMap for storage

## Installation

### Prerequisites
- Node.js (version 20 or later)
- DFX (Internet Computer SDK)

### Setup

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/orgfund.git
    cd orgfund
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the DFX project:
    ```bash
    dfx start
    ```

4. Deploy the canister:
    ```bash
    dfx deploy
    ```

5. Run the application locally:
    ```bash
    npm run dev
    ```

## API Endpoints

- **POST** `/transactions`: Create a new transaction
- **GET** `/transactions`: Retrieve all transactions
- **GET** `/transactions/:id`: Retrieve a specific transaction by ID
- **PUT** `/transactions/:id`: Update a transaction by ID
- **DELETE** `/transactions/:id`: Delete a transaction by ID

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
