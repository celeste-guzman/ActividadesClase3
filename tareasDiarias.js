// Actividad 7: Control de tareas diarias 
// Consigna: Crea un programa para gestionar tus tareas diarias. El 
// programa debe permitirte: 
// 1. Agregar una tarea diaria: Registrar una nueva tarea con su 
// descripción y estado. 
// 2. Listar las tareas diarias: Mostrar todas las tareas con su estado. 
// 3. Marcar una tarea como completada: Cambiar el estado de una 
// tarea de "pendiente" a "completada". 
// Pistas: 
// • Usa un archivo JSON para guardar las tareas. 
// • El estado de cada tarea puede ser "pendiente" o "completada". 
// • Si el archivo no existe, comienza con un arreglo vacío. 

const fs = require('fs');
let archivo = 'tareas.json';

function obtenerTareas() {
    try {
        let datos = fs.readFileSync(archivo, 'utf8');
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
}

function guardarTareas(tareas) {
    fs.writeFileSync(archivo, JSON.stringify(tareas, null, 2));
}

function agregarTarea(descripcion) {
    let tareas = obtenerTareas();
    let nuevaTarea = {
        id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
        descripcion,
        estado: 'pendiente'
    };

    tareas.push(nuevaTarea);
    guardarTareas(tareas);
    console.log(`Tarea agregada: '${descripcion}' (Estado: pendiente)`);
}

function listarTareas() {
    let tareas = obtenerTareas();

    if (tareas.length === 0) {
        console.log('No hay tareas registradas.');
        return;
    }

    console.log('Lista de tareas diarias: ');
    tareas.forEach(tarea => {
        console.log(`${tarea.id}. ${tarea.descripcion} — Estado: ${tarea.estado}`);
    });
}

function completarTarea(id) {
    let tareas = obtenerTareas();
    let tarea = tareas.find(tarea => tarea.id === id);

    if(!tarea) {
        console.log(`No se encontró una tarea con ID ${id}.`);
        return;
    }

    if(tarea.estado === 'completada') {
        console.log(`La tarea '${tarea.descripcion}' ya está completada.`);
        return;
    }

    tarea.estado = 'completada';
    guardarTareas(tareas);
    console.log(`Tarea '${tarea.descripcion}' marcada como completada.`);
}

agregarTarea('Lavar los platos');
agregarTarea('Estudiar Node.js');
agregarTarea('Sacar la basura');

listarTareas();

completarTarea(2);

listarTareas();