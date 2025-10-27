// Actividad 6: Gestión de un diario personal 
// Consigna: Crea un programa que te permita gestionar un diario 
// personal. El programa debe permitirte: 
// 1. Agregar una entrada al diario: Registrar una nueva entrada con 
// la fecha y el texto. 
// 2. Listar las entradas: Mostrar todas las entradas registradas. 
// 3. Eliminar una entrada: Eliminar una entrada específica por su ID. 
// Pistas: 
// • Usa un archivo JSON para guardar las entradas del diario. 
// • Cada entrada tendrá una fecha y un texto. 
// • Si el archivo no existe, comienza con un arreglo vacío. 

const fs = require('fs');
let archivo = 'diario.json';

function obtenerEntradas() {
    try {
        let datos = fs.readFileSync(archivo, 'utf8');
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
}

function guardarEntradas(entradas) {
    fs.writeFileSync(archivo, JSON.stringify(entradas, null, 2));
}

function agregarEntrada(texto) {
    let entradas = obtenerEntradas();

    let nuevaEntrada = {
        id: entradas.length > 0 ? entradas[entradas.length - 1].id + 1 : 1,
        fecha: new Date().toLocaleString(),
        texto
    };

    entradas.push(nuevaEntrada);
    guardarEntradas(entradas);
    console.log(`Nueva entrada agregada con ID ${nuevaEntrada.id}.`);
}

function listarEntradas() {
    let entradas = obtenerEntradas();

    if (entradas.length === 0) {
        console.log('No hay entradas en el diario.');
        return;
    }

    console.log('Entradas del diario: ');
    entradas.forEach(entrada => {
        console.log(`\n ID: ${entrada.id}\n Fecha: ${entrada.fecha}\n Texto: ${entrada.texto}\n`);
    });
}

function eliminarEntrada(id) {
    let entradas = obtenerEntradas();
    let indice = entradas.findIndex(entrada => entrada.id === id);

    if (indice === -1) {
        console.log(`No se encontró ninguna entrada con ID ${id}.`);
        return;
    }

    let eliminada = entradas.splice(indice, 1)[0];
    guardarEntradas(entradas);
    console.log(`Entrada con ID ${eliminada.id} eliminada con éxito.`);
}

agregarEntrada('Estoy aprendiendo a usar Node.js para manejar archivos JSON.');
agregarEntrada('Fue un día productivo, pero me cuesta todavía entender.');
listarEntradas();
eliminarEntrada(1);
listarEntradas();