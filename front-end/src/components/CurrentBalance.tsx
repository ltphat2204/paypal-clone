import { Card } from "antd";
import { useContext } from "react";
import { UserContextType } from "../interface/User";
import { UserContext } from "../contexts/User";

function CurrentBalance() {
    const detail = useContext<UserContextType | null>(UserContext);

    return (
        <Card title="Current Balance" style={{ width: "100%" }}>
            <div className="currentBalance">
                <div style={{ lineHeight: "70px", overflow: "clip", width: "375px" }}>${detail?.data.name ? detail.data.balance : 0}</div>
                <div style={{ fontSize: "20px" }}>Available</div>
            </div>
            <div className="balanceOptions">
                <div className="extraOption">Swap Tokens</div>
                <div className="extraOption">Bridge Tokens</div>
            </div>
        </Card>
    );
}

export default CurrentBalance;
