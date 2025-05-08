function dateFormatter(date) {
    const month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

    let formattedDate = "";
    for (let i = 8; i <= 9; i++) {
        formattedDate += date[i]; // retorna o dia
    }
    if (date[5] == 0) {
        const index = parseInt(date[6]);
        formattedDate += ` ${month[index - 1]}` // Adiciona o espaço entre as datas e o -1 é pra corrigir o índice do array
        return formattedDate; //Retorna a data já formatada
    }
    if (date[5] > 0) {
        const index = parseInt((date[6] + date[7])); // Soma os indices da string e transforma em inteiro pra dar o index do arr de meses
        formattedDate += ` ${month[index - 1]}`
        return formattedDate;
    }

}

export default dateFormatter;