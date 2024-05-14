import "./App.css";
import logo from "./logo.png";
import { Layout, Button } from "antd";
import CurrentBalance from "./components/CurrentBalance";
import RequestAndPay from "./components/RequestAndPay";
import AccountDetails from "./components/AccountDetails";
import RecentActivity from "./components/RecentActivity";
import { useContext } from "react";
import { WalletContext } from "./contexts/Wallet";
import { WalletContextType } from "./interface/Wallet";
import { connectWallet } from "./utils/Wallet";

const { Header, Content } = Layout;

function App() {
    const user = useContext<WalletContextType | null>(WalletContext);

    if (!user) {
        return <h1>Some thing is wrong</h1>
    }

    const handleConnectWallet = async() => {
        if (!user.wallet.address) {
            try {
                const address = await connectWallet();
                user.connect(address);
            } catch (err) {
                alert(err)
            }
        } else {
            user.disconnect();
        }
    }

    return (
        <div className="App">
            <Layout>
                <Header className="header">
                    <div className="headerLeft">
                        <img src={logo} alt="logo" className="logo" />
                        <>
                            <div
                                className="menuOption"
                                style={{ borderBottom: "1.5px solid black" }}
                            >
                                Summary
                            </div>
                            <div className="menuOption">Activity</div>
                            <div className="menuOption">{"Send & Request"}</div>
                            <div className="menuOption">Wallet</div>
                            <div className="menuOption">Help</div>
                        </>
                    </div>

                    <Button type={"primary"} onClick={handleConnectWallet}>{user.wallet.address ? "Disconnect Wallet": "Connect Wallet"}</Button>
                </Header>
                {
                    user.wallet.address ?
                        <Content className="content">
                            <div className="firstColumn">
                                <CurrentBalance />
                                <RequestAndPay />
                                <AccountDetails />
                            </div>
                            <div className="secondColumn">
                                <RecentActivity />
                            </div>
                        </Content> :
                        <h1 style={{ textAlign: "center" }}>Please connect to Metamask</h1>
                }
            </Layout>
        </div>
    );
}

export default App;
