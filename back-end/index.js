const express = require("express");
const cors = require("cors");
const ABI = require("./abi.json");
const ethers = require('ethers')
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    ABI,
    signer
);

console.log(`Connected to contract at ${process.env.CONTRACT_ADDRESS}`)

app.get("/wallet", async (req, res) => {
    const { userAddress } = req.query;

    const name = await contract.getName(userAddress);
    const balance = await provider.getBalance(userAddress);
    const balanceInEther = ethers.formatEther(balance);

    const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethPriceData = await ethPriceResponse.json();
    const ethPriceInUSD = ethPriceData.ethereum.usd;

    const balanceInUSD = balanceInEther * ethPriceInUSD;

    const history = await contract.getMyHistory(userAddress);

    const requests = await contract.getMyRequests(userAddress);

    res.json({name: name, balance: balanceInEther, dollars: balanceInUSD, history, requests});
});

app.get("/", (req, res) => {
    res.send("Hello world");
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening for API Calls on Port ${PORT}`);
});
