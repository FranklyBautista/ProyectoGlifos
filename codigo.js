const Valores = {
"ΣΛ": 4,
"ΣΩ": 9,
  //"ΛΩ": 5,
"ΩΔ": 40,
"ΩΦ": 90,
  //"ΔΦ": 50,
"ΦΨ": 400,
"ΦΞ": 900,
"Σ": 1,
"Λ": 5,
"Ω": 10,
"Δ": 50,
"Φ": 100,
"Ψ": 500,
"Ξ": 1000
};

const btn_Procesar = document.querySelector(".btn_procesar")
const contenedorResultados = document.querySelector(".resultados")
const inputNumero = document.getElementById("numero")
const inputArchivo = document.getElementById("archivo")
const contenderoArchivo = document.querySelector(".resultadosArchivos")
const btn_Archivo = document.querySelector(".btn_procesarArchivos")


const ordenado = Object.entries(Valores).sort((a, b) => b[1] - a[1]);

// Mostrar los resultados
/* for (const [clave, valor] of ordenado) {
console.log(`${clave}: ${valor}`);
} */
let valor = inputNumero.value

function convertir_numero_glifico(numero){
    let numero_glifico = ""
    for(const [clave,valor] of ordenado){
        while (valor <= numero){
            numero -= valor;
            numero_glifico += clave;
        }
    }

    return numero_glifico;
}


function plasmarNumeroGlificoHtml(){
    btn_Procesar.addEventListener("click", ()=>{
        contenedorResultados.innerHTML= `<h2>El numero glifico de ${inputNumero.value} es: ${convertir_numero_glifico(inputNumero.value)}</h2>`
    })
}




/* let numero = prompt("Introduce un numero: ")

console.log(`El nummero glifico de ${numero} es: ${convertir_numero_glifico(numero)}`) */



async function leerArchivoPrecargado(ruta) {
    try {
        const response = await fetch("glifos.txt");
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo");
        }
        const contenido = await response.text();
        return contenido;
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return null;
    }
}



    let numerosAdmitidos= []
    let numerosFueraRango = []
    let noNumericos = []

async function guardar_numeros() {
    const numeros = await leerArchivoPrecargado(); // Espera el contenido real
    if (!numeros) {
        console.error("No se pudo obtener el contenido.");
        return;
    }
    const array_numeros = numeros.split("\n"); // Divide por líneas
    for (const numero of array_numeros){
        const numero_limpio = numero.trim();
        if (numero_limpio){
            if(numero_limpio >0 && numero_limpio<4000){
                numerosAdmitidos.push(numero_limpio);
            }else if (isNaN(numero_limpio)){
                noNumericos.push(numero_limpio);
            }else{
                numerosFueraRango.push(numero_limpio);
            }
            
        }
    }
}



function convertirNumerosGlificosAdmitidos(){
    let resultados = [];
    for (const numero of numerosAdmitidos){
        const numeroConvertido=convertir_numero_glifico(numero);
        resultados.push(`${numero}: ${numeroConvertido}`);
    }

    contenderoArchivo.innerHTML+= `<h2>${resultados.join("\n")}"</h2>`;

    if (numerosFueraRango.length > 0) {
        contenderoArchivo.innerHTML+= `<h2> Números fuera de rango (1-3999):${numerosFueraRango.join(" , ")}</h2>`;
    }
    if (noNumericos.length > 0) {
       contenderoArchivo.innerHTML+= `<h2> Valores no numericos:${noNumericos.join(" , ")}</h2>`;
    }
}

async function main() {
    await guardar_numeros();
    convertirNumerosGlificosAdmitidos();
    plasmarNumeroGlificoHtml();
}

main()








