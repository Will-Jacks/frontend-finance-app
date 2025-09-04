import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";
import "./RemainingValue.css";
import { useEffect, useState } from "react";
function RemainingValue({ buyersSum }) {
    const { client } = useMQTT();
    const [payload, setPayload] = useState();
    const [willRemainingBalance, setWillRemainingBalance] = useState(0);
    const [liviaRemainingBalance, setLiviaRemainingBalance] = useState(0);

    useEffect(() => {
        if (!client) { return; }

        function handlePayload(topic, payload) {
            if (topic == `${MQTT_TOPIC}-income-data-response`) {
                const parsePayload = JSON.parse(payload.toString());
                setPayload(parsePayload);
            };
        };

        client.subscribe(`${MQTT_TOPIC}-income-data-response`);
        client.publish(`${MQTT_TOPIC}-get-month-income`, ".");
        client.on("message", handlePayload);

        return () => {
            client.off('message', handlePayload);
            client.unsubscribe(`${MQTT_TOPIC}-income-data-response`);
        }
    }, [client]);

    useEffect(() => {
        calculateRemainingBalance();
    }, [payload]);

    function calculateRemainingBalance() {
        if (payload) {
            setLiviaRemainingBalance(Number(payload.ganhosLivia) - Number(buyersSum[0]));
            setWillRemainingBalance(Number(payload.ganhosWilliam) - Number(buyersSum[1]));
        }
    }

    return (
        <div className="remaining-balance">
            <h3>Valor restante:</h3>
            <div className="balance-item">
                <span>Lívia:</span>
                <span>R$ {liviaRemainingBalance}</span>
            </div>
            <div className="balance-item">
                <span>William:</span>
                <span>R$ {willRemainingBalance}</span>
            </div>
        </div>
    );
}

export default RemainingValue