import "./RemainingValue.css";
function RemainingValue({ buyersSum }) {

    function formattingStringLivia() {
        const localStorageData = localStorage.getItem("livia-gain-value");
        return Number(localStorageData - buyersSum[0].toFixed(2)) || 0;
    }

    function formattingStringWilliam() {
        const localStorageData = localStorage.getItem("william-gain-value");
        return Number(localStorageData - buyersSum[1].toFixed(2)) || 0;
    }
    return (
        <div className="main-container">
            <h3>Valor restante:</h3>
            <p>Lívia: R$ {formattingStringLivia()}</p>
            <p>William: R$ {formattingStringWilliam()}</p>
        </div> // Faz a subtração de acordo com o valor que está no localstorage, caso não exista, ele coloca zero;
    );
}

export default RemainingValue