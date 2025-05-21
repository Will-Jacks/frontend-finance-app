import "./MonthCard.css";
function MonthCard({ month, handleClick }) {
    return (
        <div className="month-card">
            <h3 onClick={handleClick}>{month}</h3>
        </div>
    )
}

export default MonthCard