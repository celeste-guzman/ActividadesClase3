// Actividad 1: Registro de libros favoritos 
// Consigna: ¡Hola! Hoy serás una bibliotecaria digital. Debes crear un 
// programa que permita registrar libros favoritos en un archivo JSON. 
// Implementa las siguientes funciones: 
// 1. Agregar un libro: Se debe agregar un libro a la lista de favoritos. 
// Para esto, el libro tendrá solo un campo: su nombre. 
// 2. Listar los libros: Muestra todos los libros registrados. 
// Pistas: 
// • Usa un archivo JSON para guardar los libros. 
// • Si el archivo no existe, comienza con un arreglo vacío. 

const fs = require('fs');
let archivo = 'librosFavoritos.json';

function obtenerLibros() {
    try {
        const datos = fs.readFileSync(archivo, 'utf8');
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
}

function guardarLibros(libros) {
    fs.writeFileSync(archivo, JSON.stringify(libros, null, 2));
}

function agregarLibro(nombreLibro) {
    let libros = obtenerLibros();
    let existe = libros.find(libro => libro.nombre.toLowerCase() === nombreLibro.toLowerCase());
    if(existe){
        console.log(`El libro '${nombreLibro}' ya está en tu lista de favoritos.`);
        return;
    }
    libros.push({nombre: nombreLibro});
    guardarLibros(libros);
    console.log(`Libro '${nombreLibro}' agregado con éxito.`);
}

function listarLibros() {
    let libros = obtenerLibros();
    if(libros.length === 0) {
        console.log('No tienes libros registrados todavia.');
    } else {
        console.log('Tus libros favoritos: ');
        libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.nombre}`);
        });
    }
}

agregarLibro("El señor de los anillos.");
agregarLibro("El Hobbit.");
listarLibros();