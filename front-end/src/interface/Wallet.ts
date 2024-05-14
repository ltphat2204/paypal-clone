interface WalletType {
    address: string;
}

interface WalletContextType {
    wallet: WalletType;
    connect: (walletData: WalletType) => void;
    disconnect: () => void;
}

export type { WalletContextType, WalletType };