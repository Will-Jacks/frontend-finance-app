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
        <div className="remaining-balance">
            <h3>Valor restante:</h3>
            <div className="balance-item">
                <span>Lívia:</span>
                <span>R$ {formattingStringLivia()}</span>
            </div>
            <div className="balance-item">
                <span>William:</span>
                <span>R$ {formattingStringWilliam()}</span>
            </div>
        </div>
    );
}

export default RemainingValue