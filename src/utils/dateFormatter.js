function dateFormatter(date) {
    const month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

    let formattedDate = "";
    for (let i = 0; i <= 1; i++) {
        formattedDate += date[i]; // retorna o dia
    }
    if (date[3] == 0) {
        const index = parseInt(date[4]);
        formattedDate += ` ${month[index - 1]}` // Adiciona o espaço entre as datas e o -1 é pra corrigir o índice do array
        return formattedDate; //Retorna a data já formatada
    }
    if (date[3] > 0) {
        const index = parseInt((date[3] + date[4])); // Soma os indices da string e transforma em inteiro pra dar o index do arr de meses
        formattedDate += ` ${month[index - 1]}`
        return formattedDate;
    }

}

export default dateFormatter;