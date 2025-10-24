// Actividad 3: Registro de tareas pendientes 
// Consigna: Crea un programa para gestionar tus tareas pendientes. El 
// programa debe permitirte: 
// 1. Agregar una tarea: Registrar una tarea pendiente con su 
// descripción. 
// 2. Listar las tareas: Mostrar todas las tareas registradas. 
// 3. Eliminar una tarea: Eliminar una tarea de la lista. 
// Pistas: 
// • Usa un archivo JSON para guardar las tareas. 
// • Si el archivo no existe, comienza con un arreglo vacío. 
// • Eliminar una tarea se puede hacer por su ID.

const fs = require('fs');
let archivo = 'tareas.json';

function obtenerTareas() {
    try {
        let datos = fs.readFileSync(archivo, 'utf8');
        return JSON.parse(datos);
    } catch(error) {
        return[];
    }
}

function guardarTareas(tareas) {
    fs.writeFileSync(archivo, JSON.stringify(tareas, null, 2));
}

function agregarTarea(descripcion) {
    let tareas = obtenerTareas();
    let nuevaTarea = {
        id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
        descripcion: descripcion
    };

    tareas.push(nuevaTarea);
    guardarTareas(tareas);
    console.log(`Tarea agregada: '${descripcion}'`);
}

function listarTareas() {
    let tareas = obtenerTareas();
    if (tareas.length === 0) {
        console.log('No hay tareas pendientes.')
    } else {
        console.log('Tareas pendientes: ');
        tareas.forEach(tarea => console.log(`${tarea.id}. ${tarea.descripcion}`));
    }
}

function eliminarTarea(id) {
    let tareas = obtenerTareas();
    let tareasRestantes = tareas.filter(tarea => tarea.id !== id);
    if(tareasRestantes.length === tareas.length) {
        console.log(`No se encontró una tarea con el ID ${id}.`);
        return;
    }

    guardarTareas(tareasRestantes);
    console.log(`Tarea con ID ${id} eliminada.`);
}

agregarTarea('Estudiar');
agregarTarea('Hacer ejercicio');
agregarTarea('Llamar a mamá');
agregarTarea('Alimentar a los perros y gatos');

listarTareas();

eliminarTarea(2);

listarTareas();