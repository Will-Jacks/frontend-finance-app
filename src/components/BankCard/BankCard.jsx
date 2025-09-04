import './BankCard.css';

function BankCard({ banco, compradores }) {
    const bancoClass = banco.toLowerCase();

    const total = Object.values(compradores).reduce((acc, valor) => acc + valor, 0);

    return (
        <div className={`account-card ${bancoClass}`}>
            <h2 className="card-title">{banco}</h2>
            {Object.entries(compradores).map(([comprador, valor]) => (
                <div key={comprador} className="card-details">
                    <span>{comprador}:</span>
                    <span>R$ {valor.toFixed(2)}</span>
                </div>
            ))}
            <div className="card-divider"></div>
            <div className="card-total">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default BankCard;
