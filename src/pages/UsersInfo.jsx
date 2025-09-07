import { useState } from "react";
import "./userInfo.css";
import { useEffect } from "react";
import useMQTT from "../hooks/useMQTT";
import { MQTT_TOPIC } from "../context/MQTTContext";
function UsersInfo() {
    const { client } = useMQTT();
    const [liviaValue, setLiviaValue] = useState(localStorage.getItem("livia-gain-value") || "0");
    const [williamValue, setWilliamValue] = useState(localStorage.getItem("william-gain-value") || "0");
    const [username, setUsername] = useState(localStorage.getItem("username") || "Fulano");

    const [totalRenda, setTotalRenda] = useState(0);
    const [percentLivia, setPercentLivia] = useState(50);
    const [percentWilliam, setPercentWilliam] = useState(50);

    function handleValue(buyer, e) {
        const newValue = e.target.value;
        if (buyer === "William") {
            setWilliamValue(newValue);
            localStorage.setItem('william-gain-value', newValue);
            return;
        }
        if (buyer === "Lívia") {
            setLiviaValue(newValue);
            localStorage.setItem('livia-gain-value', newValue);
            return;
        }
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
            ganhosLivia: liviaValue,
            ganhosWilliam: williamValue
        }
        client.publish(`${MQTT_TOPIC}-post-ganhos-trigger`, JSON.stringify(formattedData));
    }

    useEffect(() => {
        // Converte os valores para número, tratando casos de campo vazio ou inválido (resultado será 0)
        const rendaLivia = parseFloat(liviaValue.replace(',', '.')) || 0;
        const rendaWilliam = parseFloat(williamValue.replace(',', '.')) || 0;

        const total = rendaLivia + rendaWilliam;
        setTotalRenda(total);

        if (total > 0) {
            setPercentLivia((rendaLivia / total) * 100);
            setPercentWilliam((rendaWilliam / total) * 100);
        } else {
            // Se o total for 0, divide a barra igualmente
            setPercentLivia(50);
            setPercentWilliam(50);
        }

    }, [liviaValue, williamValue]);

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
                            <label className="input-label">Renda de Lívia</label>
                            <input
                                className="input-field"
                                type="text"
                                inputMode="decimal"
                                pattern="[0-9]*[.,]?[0-9]*"
                                placeholder="R$ 0,00"
                                value={liviaValue}
                                onChange={(e) => handleValue("Lívia", e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="input-label">Renda de William</label>
                            <input
                                className="input-field"
                                type="text"
                                inputMode="decimal"
                                pattern="[0-9]*[.,]?[0-9]*"
                                placeholder="R$ 0,00"
                                value={williamValue}
                                onChange={(e) => handleValue("William", e)}
                                required
                            />
                        </div>
                        <button className="submit-button" type="submit">Atualizar Renda</button>
                    </form>
                </div>

                <div className="summary-section">
                    <h3 className="summary-title">Resumo da Renda Mensal</h3>
                    <div className="total-income">
                        <span>Total</span>
                        <strong>
                            {totalRenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </strong>
                    </div>
                    <div className="contribution-bar">
                        <div
                            className="bar-livia"
                            style={{ width: `${percentLivia}%` }}
                            title={`Lívia: ${percentLivia.toFixed(1)}%`}
                        ></div>
                        <div
                            className="bar-william"
                            style={{ width: `${percentWilliam}%` }}
                            title={`William: ${percentWilliam.toFixed(1)}%`}
                        ></div>
                    </div>
                    <div className="legend">
                        <div className="legend-item">
                            <span className="dot livia-dot"></span> Lívia
                        </div>
                        <div className="legend-item">
                            <span className="dot william-dot"></span> William
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersInfo;