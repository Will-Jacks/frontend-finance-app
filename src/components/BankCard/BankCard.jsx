import './BankCard.css';

function BankCard({ banco, compradores }) {
    const bancoClass = banco.toLowerCase();

    const total = Object.values(compradores).reduce((acc, valor) => acc + valor, 0);

    return (
        <div className={`bank-card ${bancoClass}`}>
            <h2>{banco}</h2>
            {Object.entries(compradores).map(([comprador, valor]) => (
                <p key={comprador}>
                    {comprador}: R$ {valor.toFixed(2)}
                </p>
            ))}
            <hr style={{ marginTop: '12px', borderColor: '#444' }} />
            <p style={{ fontWeight: 'bold', marginTop: '8px', color: '#ddd' }}>
                Total: R$ {total.toFixed(2)}
            </p>
        </div>
    );
};

export default BankCard;
