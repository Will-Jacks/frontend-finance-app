import { useState } from "react";
import "./userInfo.css";
function UsersInfo() {
    const [liviaValue, setLiviaValue] = useState(localStorage.getItem("livia-gain-value") || 0);
    const [williamValue, setWilliamValue] = useState(localStorage.getItem("william-gain-value") || 0);
    const [username, setUsername] = useState(localStorage.getItem("username") || "Fulano");

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
        </div>
    );
}

export default UsersInfo;