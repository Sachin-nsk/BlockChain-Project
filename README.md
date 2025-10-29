# Blockchain Password Vault

A **decentralized password vault** built on Ethereum using Hardhat and Ethers.js. This project allows users to securely store and retrieve encrypted passwords on the blockchain, leveraging smart contracts for security and decentralization.

---

## **Features**

- Store encrypted passwords on Ethereum blockchain.
- Retrieve passwords securely using your wallet address.
- Fully decentralized with no central server storing sensitive data.
- Simple and interactive frontend built with React.
- Backend powered by Node.js and Express.

---

## **Tech Stack**

- **Blockchain:** Solidity, Hardhat, Ethereum
- **Backend:** Node.js, Express, Ethers.js
- **Frontend:** React, HTML, CSS
- **Security:** Encrypted password storage
- **Environment Management:** dotenv

---



## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/password-vault.git
```

```bash
cd password-vault
```

### 2. Smart Contract Setup

```bash
cd smart-contract
npm install
npx hardhat node
```
### In a separte Terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Save the deployed contract address into .env as VAULT_ADDRESS.

3. Backend Setup
```bash
cd ../backend
npm install
```

Create a .env file:

```ini
RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=<Your-Private-Key-Here>
VAULT_ADDRESS=<Deployed-Contract-Address>
```

Run the server:
```bash
node server.js
The backend runs on: http://localhost:3000
```

4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## **Usage**
-Enter your wallet address and password.

-Click Store Password to save it on the blockchain.

-Enter your wallet address to retrieve the encrypted password.

-Decrypt the password using the frontend UI.

---

## **Future Improvements**
-Integration with biometric authentication.

-Decentralized identity (DID) login.

-Quantum-resistant encryption.

-Web3 and Metaverse login integration.

-Voice or gesture-based authentication.


