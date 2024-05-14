import { createContext, useState } from "react";
import { WalletType, WalletContextType } from "../interface/Wallet";
import { ComponentWithChildrenProps } from "../interface/Component";

const WalletContext = createContext<WalletContextType | null>(null);

const WalletProvider:React.FC<ComponentWithChildrenProps> = ({ children }) => {
    const [wallet, setWallet] = useState<WalletType>({ address: "" });

    const connect = (walletData: WalletType) => {
        setWallet(walletData);
    };

    const disconnect = () => {
        setWallet({ address: "" });
    };

    return (
        <WalletContext.Provider value={{ wallet, connect, disconnect }}>
            {children}
        </WalletContext.Provider>
    );
}

export { WalletContext, WalletProvider };
