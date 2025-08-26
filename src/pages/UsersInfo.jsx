import { useState } from "react";

function UsersInfo() {
    const [liviaValue, setLiviaValue] = useState(localStorage.getItem("livia-gain-value") || 0);
    const [williamValue, setWilliamValue] = useState(localStorage.getItem("william-gain-value") || 0);

    function handleValue(buyer, e) {
        const newValue = e.target.value;
        if (buyer === "William") {
            setWilliamValue(newValue);
            //localStorage.setItem('william-gain-value', newValue);
            return;
        }
        if (buyer === "Lívia") {
            setLiviaValue(newValue);
            //localStorage.setItem('livia-gain-value', newValue);
            return;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const actualMonth = (new Date().getMonth() + 1);
        const actualYear = (new Date().getFullYear());
        const formattedData = {
            mes: actualMonth,
            ano: actualYear,
            ganhosLivia: liviaValue,
            ganhosWilliam: williamValue
        }
        client.publish(`${MQTT_TOPIC}-get-ganhos-trigger`, JSON.stringify(formattedData));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Renda</h2>
                <p>Lívia </p><input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.,]?[0-9]*"
                    placeholder="Digite aqui"
                    value={liviaValue}
                    onChange={(e) => handleValue("Lívia", e)}
                    required
                />
                <p>William </p><input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.,]?[0-9]*"
                    placeholder="Digite aqui"
                    value={williamValue}
                    onChange={(e) => handleValue("William", e)}
                    required
                />
                <button type="submit">Atualizar</button>
            </form>
        </>
    );
}

export default UsersInfo;