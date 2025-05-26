const Valores = {
    ΣΛ: 4,
    ΣΩ: 9,
    ΩΔ: 40,
    ΩΦ: 90,
    ΦΨ: 400,
    ΦΞ: 900,
    Σ: 1,
    Λ: 5,
    Ω: 10,
    Δ: 50,
    Φ: 100,
    Ψ: 500,
    Ξ: 1000,
};

const ordenado = Object.entries(Valores).sort((a, b) => b[1] - a[1]);

const btn_Procesar = document.querySelector(".btn_procesar");
const contenedorResultados = document.querySelector(".resultadosEntero");
const inputNumero = document.getElementById("numero");
const inputArchivo = document.getElementById("inputArchivo");
const contenderoArchivo = document.querySelector(".resultadosArchivos");
const btn_Archivo = document.getElementById("btnCargarArchivo");



function convertir_numero_glifico(numero) {
    let numero_glifico = "";
    for (const [clave, valor] of ordenado) {
        while (valor <= numero ) {
            numero -= valor;
            numero_glifico += clave;
        }
    }
    return numero_glifico;
}

btn_Procesar.addEventListener("click", () => {
    const valor = Number(inputNumero.value.trim());

    if(valor>0 && valor <4000){
        const resultado = convertir_numero_glifico(valor);
        contenedorResultados.innerHTML = `<h2>El número glífico de ${valor} es: ${resultado}</h2>`;  
    }else{
        contenedorResultados.innerHTML = `<h2>Por favor, ingrese un número entre 1 y 3999.</h2>`;
    }
        

});

btn_Archivo.addEventListener("click", () => {
    inputArchivo.click();
});

inputArchivo.addEventListener("change", async (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
        const contenido = await leerArchivoPrecargado(archivo);
        guardar_numeros(contenido);
        convertirNumerosGlificosAdmitidos();
    }
});

async function leerArchivoPrecargado(archivo) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.onload = function (e) {
            resolve(e.target.result);
        };
        lector.onerror = function () {
            reject(new Error("No se pudo leer el archivo"));
        };
        lector.readAsText(archivo);
    });
}

function guardar_numeros(contenido) {
    numerosAdmitidos = [];
    numerosFueraRango = [];
    noNumericos = [];

    const array_numeros = contenido.split("\n");
    for (const numero of array_numeros) {
        const numero_limpio = numero.trim();
        
             // Ignorar líneas vacías 
        if (!numero_limpio) continue;

        if (numero_limpio === "0") {
            console.log("Iteracion detenida por el numero 0")
            break; // Detener completamente la iteración
        }

        if (isNaN(numero_limpio)) {
            noNumericos.push(numero_limpio);
        } else if (Number(numero_limpio) < 1 || Number(numero_limpio) > 3999) {
            numerosFueraRango.push(numero_limpio);
        } else {
            numerosAdmitidos.push(Number(numero_limpio));
        }
        
        
    }
}

function descargarArchivo(nombre, contenido) {
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombre;
    enlace.click();
}

function convertirNumerosGlificosAdmitidos() {
    let resultados = [];

    for (const numero of numerosAdmitidos) {
        const numeroConvertido = convertir_numero_glifico(numero);
        resultados.push(`${numero}: ${numeroConvertido}`);
    }

    contenderoArchivo.innerHTML = "";

    if (resultados.length > 0) {
        contenderoArchivo.innerHTML += ` <div>
        <h2>Resultados</h2><pre>${resultados.join(
            "\n"
        )}</pre>  </div>`;
    }

    if (numerosFueraRango.length > 0) {
        contenderoArchivo.innerHTML += `<div>
        <h2>Números fuera de rango <br>(1-3999)</h2><pre>${numerosFueraRango.join(
            ", ")}</pre> </div>`;
    }

    if (noNumericos.length > 0) {
        contenderoArchivo.innerHTML += `<div>
        <h2>Valores no numéricos</h2><pre>${noNumericos.join(
            ", "
        )}</pre> </div>`;
    }


    let contenidoArchivo = "";
    if (resultados.length > 0) {
        contenidoArchivo += `Resultados:\n${resultados.join("\n")}\n\n`;
    }
    if (numerosFueraRango.length > 0) {
        contenidoArchivo += `Números fuera de rango (1-3999):\n${numerosFueraRango.join(", ")}\n\n`;
    }
    if (noNumericos.length > 0) {
        contenidoArchivo += `Valores no numéricos:\n${noNumericos.join(", ")}\n`;
    }

    descargarArchivo("salidaglifos.txt", contenidoArchivo);
}

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    // Remover clase activa de todas
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    // Activar la pestaña seleccionada
    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

