import { useState } from "react";
import "./userInfo.css";
import { useEffect } from "react";
function UsersInfo() {
    const [liviaValue, setLiviaValue] = useState(localStorage.getItem("livia-gain-value") || "");
    const [williamValue, setWilliamValue] = useState(localStorage.getItem("william-gain-value") || "");
    const [username, setUsername] = useState(localStorage.getItem("username") || "Fulano");

    const [totalRenda, setTotalRenda] = useState(0);
    const [percentLivia, setPercentLivia] = useState(50);
    const [percentWilliam, setPercentWilliam] = useState(50);

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
        //  client.publish(`${MQTT_TOPIC}-get-ganhos-trigger`, JSON.stringify(formattedData));
    }

    return (
        <div className="body">
            <div className="container">
                <div className="name-section">
                    <h2 className="section-title">Nome</h2>
                    <input
                        className="input-field"
                        type="text"
                        value={username}
                        onChange={(e) => handleUsername(e)}
                    />
                </div>
                <form className="income-form" onSubmit={handleSubmit}>
                    <h2 className="section-title">Renda</h2>
                    <div className="form-group">
                        <p className="input-label">Lívia</p>
                        <input
                            className="input-field"
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*[.,]?[0-9]*"
                            placeholder="Digite aqui"
                            value={liviaValue}
                            onChange={(e) => handleValue("Lívia", e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <p className="input-label">William</p>
                        <input
                            className="input-field"
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*[.,]?[0-9]*"
                            placeholder="Digite aqui"
                            value={williamValue}
                            onChange={(e) => handleValue("William", e)}
                            required
                        />
                    </div>
                    <button className="submit-button" type="submit">Atualizar</button>
                </form>
            </div>
            <div className="summary-section">
                <h3 className="summary-title">Renda</h3>
                <p className="date-context">
                    Referente a {new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </p>
                <div className="total-income">
                    <span>Renda Total</span>
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
    );
}

export default UsersInfo;