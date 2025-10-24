// Actividad 2: Seguimiento de series de televisión 
// Consigna: ¡Es hora de organizar tus series favoritas! Crea un programa 
// que permita: 
// 1. Registrar una serie: Se debe registrar una serie con su nombre y 
// la cantidad de temporadas. 
// 2. Listar las series: Muestra todas las series registradas. 
// 3. Actualizar las temporadas de una serie: Permite actualizar la 
// cantidad de temporadas de una serie. 
// Pistas: 
// • Usa un archivo JSON para almacenar la información de las series. 
// • Si el archivo no existe, comienza con un arreglo vacío. 
// • ¿Qué es fs.existsSync()? 
// • El método fs.existsSync() es parte del módulo fs (file system) en 
// Node.js. Este método se usa para comprobar si un archivo o 
// directorio existe en el sistema de archivos de manera sincrónica, lo 
// que significa que el código se ejecuta y espera a que la operación se 
// complete antes de continuar con el siguiente paso. 
// • Sintaxis: fs.existsSync(path);

// Importamos el módulo 'fs' para manejar el sistema de archivos
const fs = require('fs');

// Definimos la ruta del archivo JSON
const tempSeries = 'series.json';

// Función para cargar las series desde el archivo JSON
function cargarSeries() {
    if (fs.existsSync(tempSeries)) {
        const data = fs.readFileSync(tempSeries);
        return JSON.parse(data);
    }
    return [];
}
// Función para guardar las series en el archivo JSON
function guardarSeries(series) {
    fs.writeFileSync(tempSeries, JSON.stringify(series, null, 2));
}
// Función para registrar una serie
function registrarSerie(nombre, temporadas) {
    const series = cargarSeries();
    series.push({ nombre, temporadas });
    guardarSeries(series);
}
// Función para listar las series
function listarSeries() {
    const series = cargarSeries();
    series.forEach((serie, index) => {
        console.log(`${index + 1}. ${serie.nombre} - ${serie.temporadas} temporadas`);
    });
}
// Función para actualizar las temporadas de una serie
function actualizarTemporadas(index, nuevasTemporadas) {
    const series = cargarSeries();
    if (series[index]) {
        series[index].temporadas = nuevasTemporadas;
        guardarSeries(series);
    }
}
// Ejemplo de uso
registrarSerie('Si la vida te da mandarinas', 1);
registrarSerie('Los diarios de la boticaria', 2);
listarSeries();
actualizarTemporadas(0, 6);
listarSeries();