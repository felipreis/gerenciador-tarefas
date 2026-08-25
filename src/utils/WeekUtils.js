function getStartOfWeek(date){
    const data = new Date(date);

   const diaAtual = data.getDay(); // retorna um número de 0 a 6 representando o dia da semana (0 é domingo)
   let diasVoltar = diaAtual - 1;
   if(diasVoltar < 0) {diasVoltar = 6}; // caso de domingo

    data.setDate( data.getDate() - diasVoltar)
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);

    return data;
}

function getEndOfWeek(date){
    const inicio = getStartOfWeek(date);
    inicio.setDate(inicio.getDate() + 6);
    inicio.setHours(23);
    inicio.setMinutes(59);
    inicio.setSeconds(59);
    inicio.setMilliseconds(999);
    return inicio;

}

export default {
    getStartOfWeek,
    getEndOfWeek
}