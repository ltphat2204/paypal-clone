import { useContext, useEffect, useMemo, useState } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber } from "antd";
import { Contract } from "ethers";
import Abi from "../artifacts/abi.json";
import { WalletContext } from "../contexts/Wallet";
import axios from "axios";
import { RequestsType } from "../interface/Requests";
import { shortenAdress } from "../utils/Wallet";


function RequestAndPay() {
    const [payModal, setPayModal] = useState(false);
    const [requestModal, setRequestModal] = useState(false);
    const [requestAmount, setRequestAmount] = useState(5);
    const [requestAddress, setRequestAddress] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [requests, setRequests] = useState<RequestsType[]>([]);
    const wallet = useContext(WalletContext);
    const contract = useMemo(() => new Contract(
        "0x09D61f31a112274dC4b5ED31cfb8514FcaA072b8",
        Abi,
        wallet?.wallet.signer
    ), [wallet]);

    const showPayModal = () => {
        setPayModal(true);
    };
    const hidePayModal = () => {
        setPayModal(false);
    };
    const processPayment = async () => {
        await contract.payRequest(0, { value: BigInt(requests[0].amount) / BigInt(1e6) });
        hidePayModal();
    }

    const showRequestModal = () => {
        setRequestModal(true);
    };
    const hideRequestModal = async () => {
        setRequestModal(false);
    };
    const processRequest = async () => {
        await contract.createRequest(requestAddress, requestAmount, requestMessage);
        hideRequestModal();
    }

    useEffect(() => {
        const getRequests = async () => {
            const res = await axios.get("http://localhost:8080/payment-request", {
                params: {
                    userAddress: wallet?.wallet.address
                }
            });
            setRequests(res.data.requests);
        }

        if (wallet && wallet.wallet.address) {
            getRequests();
        }
    }, [wallet])

    return (
        <>
            <Modal
                title="Confirm Payment"
                open={payModal}
                onOk={() => {
                    processPayment();
                }}
                onCancel={hidePayModal}
                okText="Proceed To Pay"
                cancelText="Cancel"
            >
                {requests.length &&
                <>
                    <h2>Sending payment to {requests[0].name}</h2>
                    <p>Wallet address: {shortenAdress(requests[0].from)}</p>
                    <h3>Amount: {requests[0].amount} Matic</h3>
                    <p>Message: {requests[0].message}</p>
                </>
                }
            </Modal>
            <Modal
                title="Request A Payment"
                open={requestModal}
                onOk={() => {
                    processRequest();
                }}
                onCancel={hideRequestModal}
                okText="Proceed To Request"
                cancelText="Cancel"
            >
                <p>Amount (Matic)</p>
                <InputNumber value={requestAmount} onChange={(val) => setRequestAmount(Number(val))}/>
                <p>From (address)</p>
                <Input placeholder="0x..." value={requestAddress} onChange={(val) => setRequestAddress(val.target.value)}/>
                <p>Message</p>
                <Input placeholder="Lunch Bill..." value={requestMessage} onChange={(val) => setRequestMessage(val.target.value)}/>
            </Modal>
            <div className="requestAndPay">
                <div
                    className="quickOption"
                    onClick={() => {
                        showPayModal();
                    }}
                >
                    <DollarOutlined style={{ fontSize: "26px" }} />
                    Pay
                    <div className="numReqs">{requests.length}</div>
                </div>
                <div
                    className="quickOption"
                    onClick={() => {
                        showRequestModal();
                    }}
                >
                    <SwapOutlined style={{ fontSize: "26px" }} />
                    Request
                </div>
            </div>
        </>
    );
}

export default RequestAndPay;
