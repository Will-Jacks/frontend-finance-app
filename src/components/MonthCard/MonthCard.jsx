import "./MonthCard.css";
function MonthCard({ month, handleClick }) {
    return (
        <div className="month-card" onClick={handleClick}>
            <h3>{month}</h3>
        </div>
    )
}

export default MonthCard