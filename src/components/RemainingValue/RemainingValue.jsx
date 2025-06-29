import "./RemainingValue.css";
function RemainingValue({ buyersSum }) {
    return (
        <div className="main-container">
            <h3>Valor restante:</h3>
            <p>Lívia: R$ {localStorage.getItem("livia-gain-value") != null ? ((buyersSum[0].toFixed(2) - Number(localStorage.getItem("livia-gain-value"))).toFixed(2) * -1) : 0}</p>
            <p>William: R$ {localStorage.getItem("william-gain-value") != null ? ((buyersSum[1].toFixed(2) - Number(localStorage.getItem("william-gain-value"))).toFixed(2) * -1) : 0}</p>
        </div> // Faz a subtração de acordo com o valor que está no localstorage, caso não exista, ele coloca zero;
    );
}

export default RemainingValue