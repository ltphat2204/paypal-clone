import { ethers, formatEther } from "ethers";
import { WalletType } from "../interface/Wallet";

const connectWallet = async () => {
    if (!window.ethereum) {
        throw Error("Please install Metamask");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const wallet: WalletType = { address, signer };

    return wallet;
}

const shortenAdress = (address: string) => {
    const first = address.substring(0, 6);
    const last = address.substring(address.length - 4);
    return `${first}...${last}`;
}

const toEth = (num: bigint) => {
    return formatEther(num);
}

export { connectWallet, shortenAdress, toEth };