// esta pseudo libreria que hice se encarga de manejar los importes para que tengan el formato solicitado

// recibe un texto con numeros (10000) o ya formateado ($1.0000*) y lo convierte en el formato correcto => $10.000
export function currencyFormatter(value){  
    let formateado = currencyCleanFormat(value);  

    if (formateado === "" || formateado === "$") // value = "" o "$" => ""
        formateado = "";
    else 
        formateado = "$" + pointFormatter(formateado);

    return formateado;
}

export function pointFormatter(value) {
    let formateado = value;
    if (3 < value.length){
        let parteIzq = formateado.substr(0, value.length - 3);
        let parteDer = formateado.substr(-3);
        formateado = pointFormatter(parteIzq) + "." + parteDer;
    }
    return formateado;
}

export function currencyCleanFormat(value) {
    let cleaned = value;
    cleaned = cleaned.replace(/\$|\./g, ""); // le saca el $ y todos los puntos
    return cleaned;
}

// * lo que representa eso es que ya fue formateado cuando ingresaron 1000 y metieron un 0 nuevo, por eso se concatena y se ve asi