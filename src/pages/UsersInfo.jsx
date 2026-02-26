import { useState } from "react";
import "./userInfo.css";
import { useEffect } from "react";
import useMQTT from "../hooks/useMQTT";
import { MQTT_TOPIC } from "../context/MQTTContext";
function UsersInfo() {
    const { client } = useMQTT();
    const [username, setUsername] = useState(localStorage.getItem("username") || "Fulano");

    const [income, setIncome] = useState(localStorage.getItem("income-value") || 0);

    function handleValue(e) {
        const newValue = e.target.value;
        setIncome(newValue);
        localStorage.setItem('income-value', newValue);
    }

    function handleUsername(e) {
        const trimmedUsername = (e.target.value).trim();
        if (trimmedUsername) {
            const capitalizedUsername = trimmedUsername.charAt(0).toUpperCase() + trimmedUsername.slice(1);
            setUsername(capitalizedUsername);
            localStorage.setItem('username', capitalizedUsername);
        } else {
            setUsername("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const actualMonth = (new Date().getMonth() + 1);
        const actualYear = (new Date().getFullYear());
        const formattedData = {
            mes: actualMonth,
            ano: actualYear,
            renda: income
        }
        client.publish(`${MQTT_TOPIC}-post-ganhos-trigger`, JSON.stringify(formattedData));
    }

    return (
        <div className="user-info-container">
            <div className="user-info-card">
                <div className="form-section">
                    <h2 className="card-title">Informações e Renda</h2>
                    <div className="name-group">
                        <label className="input-label">Seu nome</label>
                        <input
                            className="input-field"
                            type="text"
                            value={username}
                            onChange={handleUsername}
                            placeholder="Digite seu nome"
                        />
                    </div>
                    <form className="income-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="input-label">Renda</label>
                            <input
                                className="input-field"
                                type="text"
                                inputMode="decimal"
                                pattern="[0-9]*[.,]?[0-9]*"
                                placeholder="R$ 0,00"
                                value={income}
                                onChange={(e) => handleValue(e)}
                                required
                            />
                            <h1>Renda: ${income}</h1>
                        </div>
                        <button className="submit-button" type="submit">Atualizar Renda</button>
                    </form>
                </div>


            </div>
        </div>
    );
}

export default UsersInfo;