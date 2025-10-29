// scripts/deploy.js
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
    // Get contract factory
    const PasswordVault = await ethers.getContractFactory("PasswordVault");

    // Deploy contract (no .deployed() in ethers v6)
    const vault = await PasswordVault.deploy();

    // Wait for deployment transaction to be mined
    await vault.waitForDeployment();

    console.log("PasswordVault deployed to:", vault.target); // use .target instead of .address
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
