import { Card, Table } from "antd";
import { HistoryType } from "../interface/History";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { WalletContext } from "../contexts/Wallet";

const columns = [
    {
        title: "Payment Subjet",
        dataIndex: "subject",
        key: "subject"
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type"
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address"
    },

    {
        title: "Message",
        dataIndex: "message",
        key: "message"
    },
    {
        title: "Amount",
        key: "amount",
        render: (_: undefined, record: HistoryType) => (
            <div
                style={record.type === "Send" ? { color: "red" } : { color: "green" }}
            >
                {record.type === "Send" ? "-" : "+"}
                {record.amount} Matic
            </div>
        )
    }
];

function RecentActivity() {
    const [history, setHistory] = useState<HistoryType[]>([]);
    const wallet = useContext(WalletContext);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:8080/history", {
                params: {
                    userAddress: wallet?.wallet.address
                }
            });
            setHistory(res.data.history);
        }
        getData();
    }, [wallet])

    return (
        <Card title="Recent Activity" style={{ width: "100%", minHeight: "663px" }}>
            {history &&
                <Table
                    dataSource={history}
                    columns={columns}
                    pagination={{ position: ["bottomCenter"], pageSize: 8 }}
                />
            }
        </Card>
    );
}

export default RecentActivity;
