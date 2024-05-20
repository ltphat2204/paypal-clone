import { JsonRpcSigner } from "ethers";

interface WalletType {
    address: string;
    signer?: JsonRpcSigner;
}

interface WalletContextType {
    wallet: WalletType;
    connect: (walletData: WalletType) => void;
    disconnect: () => void;
}

export type { WalletContextType, WalletType };