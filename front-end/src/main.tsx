import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WalletProvider } from "./contexts/Wallet";
import { UserProvider } from "./contexts/User";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WalletProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </WalletProvider>
    </React.StrictMode>
);
