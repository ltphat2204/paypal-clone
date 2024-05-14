import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import matic from "../matic.png";
import { WalletContextType } from "../interface/Wallet";
import { WalletContext } from "../contexts/Wallet";
import { UserContext } from "../contexts/User";
import { useContext } from "react";
import { shortenAdress } from "../utils/Wallet";
import { UserContextType } from "../interface/User";
import { Spin } from "antd";


function AccountDetails() {
    const user = useContext<WalletContextType | null>(WalletContext);
    const detail = useContext<UserContextType | null>(UserContext);

    return (
        <Card title="Account Details" style={{ width: "100%" }}>
            {
                detail === null || detail.data.name === "" ?
                    <div className="accountDetailRow" style={{ justifyContent: "center" }}>
                        <Spin size="large"/>
                    </div> :
                    <>
                        <div className="accountDetailRow">
                            <UserOutlined style={{ color: "#767676", fontSize: "25px" }} />
                            <div>
                                <div className="accountDetailHead"> {detail?.data.name} </div>
                                <div className="accountDetailBody">
                                    Address: {user && shortenAdress(user.wallet.address)}
                                </div>
                            </div>
                        </div>
                        <div className="accountDetailRow">
                            <img src={matic} alt="maticLogo" width={25} />
                            <div>
                                <div className="accountDetailHead"> Native Matic Tokens</div>
                                <div className="accountDetailBody">{ detail ? detail.data.tokens : 0} Matic</div>
                            </div>
                        </div>
                        <div className="balanceOptions">
                            <div className="extraOption">Set Username</div>
                            <div className="extraOption">Switch Accounts</div>
                        </div>
                    </>
            }
        </Card>
    );
}

export default AccountDetails;
