import { Card, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import matic from "../matic.png";
import { WalletContextType } from "../interface/Wallet";
import { WalletContext } from "../contexts/Wallet";
import { UserContext } from "../contexts/User";
import { useContext, useState, useMemo } from "react";
import { connectWallet, shortenAdress } from "../utils/Wallet";
import { UserContextType } from "../interface/User";
import { Spin } from "antd";
import { Contract } from "ethers";
import Abi from "../artifacts/abi.json";


function AccountDetails() {
    const user = useContext<WalletContextType | null>(WalletContext);
    const detail = useContext<UserContextType | null>(UserContext);
    const [nameModal, setNameModal] = useState(false);
    const [name, setName] = useState("");
    const wallet = useContext(WalletContext);
    const contract = useMemo(() => new Contract(
        "0x09D61f31a112274dC4b5ED31cfb8514FcaA072b8",
        Abi,
        wallet?.wallet.signer
    ), [wallet]);

    const hideNameModal = () => {
        setNameModal(false);
        setName("")
    }
    const processSetName = async () => {
        await contract.addName(name);
        wallet?.connect(await connectWallet());
        hideNameModal();
    }

    return (
        <Card title="Account Details" style={{ width: "100%" }}>
            {
                detail === null || detail.data.name === "" ?
                    <div className="accountDetailRow" style={{ justifyContent: "center" }}>
                        <Spin size="large"/>
                    </div> :
                    <>
                        <Modal
                            title="Set Username"
                            open={nameModal}
                            onOk={() => {
                                processSetName();
                            }}
                            onCancel={hideNameModal}
                            okText="Proceed To Set Username"
                            cancelText="Cancel"
                        >
                            <p>Name:</p>
                            <Input placeholder="Somewhat" value={name} onChange={e => setName(e.target.value)}/>
                        </Modal>
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
                            <div className="extraOption" onClick={() => setNameModal(true)}>Set Username</div>
                            <div className="extraOption">Switch Accounts</div>
                        </div>
                    </>
            }
        </Card>
    );
}

export default AccountDetails;
