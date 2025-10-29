const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Provider
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Hardhat account private key (account #0)
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Wallet signer connected to provider
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Load ABI
const contractJson = require("../smart-contract/artifacts/contracts/PasswordVault.sol/PasswordVault.json");
const vault = new ethers.Contract(
    process.env.VAULT_ADDRESS,
    contractJson.abi,
    signer // Already a Wallet signer — do NOT call connect()
);

// Routes
app.post("/store", async (req, res) => {
    const { addr, ciphertext } = req.body;
    try {
        const tx = await vault.store(ciphertext); // <-- remove vault.connect(signer)
        await tx.wait();
        res.json({ ok: true, txHash: tx.hash });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/get/:addr", async (req, res) => {
    try {
        const ciphertext = await vault.get(req.params.addr);
        res.json({ ciphertext });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
