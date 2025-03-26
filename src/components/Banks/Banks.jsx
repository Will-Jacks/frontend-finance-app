import { useEffect, useState } from "react";
import { client, topic } from "../../connection";


export default function Banks(props) {

    const [bankData, setBankData] = useState([]);

    useEffect(() => {

        client.subscribe(`${topic}-allbanks-response`);
        if (props.message) {
            client.publish(`${topic}-filtro-allbanks`, props.message);
        }
        client.on('message', (topic, payload) => {
            console.log(payload.toString());
            const data = JSON.parse(payload.toString());
            console.log(data)
            setBankData(data);
        });

    }, []);
    return (
        <>
            <div>
                <h2>{props.title}</h2>
                {
                    Object.entries(bankData).length > 0 ? Object.entries(bankData).map(([comprador, total]) => (
                        <p key={comprador}>
                            {comprador}: {total.toFixed(2)}
                        </p>
                    )) : (
                        <p>Sem dados disponíveis no momento.</p>
                    )
                }
            </div>
        </>
    )
}