import { ComponentWithChildrenProps } from "../interface/Component";
import { UserType, UserContextType } from "../interface/User";
import { WalletContextType } from "../interface/Wallet";
import { WalletContext } from "./Wallet";
import { useCallback, useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext<UserContextType | null>(null);

const EmptyUser: UserType = { name: "", tokens: "", balance: "" };

const UserProvider:React.FC<ComponentWithChildrenProps> = ({ children }) => {
    const user = useContext<WalletContextType | null>(WalletContext);
    const [detail, setDetail] = useState<UserType>(EmptyUser);

    const updateDetailInformation = async () => {
        const address = user?.wallet.address;

        const res = await axios.get("http://localhost:8080/wallet", {
            params: {
                userAddress: address
            }
        });

        const data = res.data as UserType;

        setDetail({ name: data.name, tokens: data.tokens, balance: data.balance });
    }

    const updateFunction = useCallback(updateDetailInformation, [user]);

    useEffect(() => {
        if (user?.wallet.address) {
            updateFunction();
        } else {
            setDetail(EmptyUser);
        }
    }, [updateFunction, user]);

    return (
        <UserContext.Provider value={{ data: detail }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
