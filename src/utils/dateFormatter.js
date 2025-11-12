function dateFormatter(date) {
    const month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

    const dateObj = new Date(date + 'T00:00:00');

    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const formattedDay = String(day).padStart(2, '0');

    return `${formattedDay} ${month[monthIndex]}`;
}
export default dateFormatter;