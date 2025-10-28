// Actividad 8: Seguimiento de proyectos 
// Consigna: Crea un programa para gestionar proyectos. El programa debe 
// permitirte: 
// 1. Agregar un proyecto: Registrar un proyecto con su nombre y 
// estado (pendiente o en progreso). 
// 2. Listar los proyectos: Mostrar todos los proyectos registrados. 
// 3. Actualizar el estado de un proyecto: Cambiar el estado de un 
// proyecto a "finalizado" o "en progreso". 
// Pistas: 
// • Usa un archivo JSON para guardar los proyectos. 
// • Si el archivo no existe, comienza con un arreglo vacío. 
// • Cada proyecto debe tener un ID único. 

const fs = require('fs');
let readline = require('readline');
let ARCHIVO = 'proyectos.json';

function cargarProyectos() {
    if (fs.existsSync(ARCHIVO)) {
        let data = fs.readFileSync(ARCHIVO, 'utf-8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

function guardarProyectos(proyectos) {
    fs.writeFileSync(ARCHIVO, JSON.stringify(proyectos, null, 4));
}

function agregarProyecto(rl) {
    let proyectos = cargarProyectos();
    rl.question('Ingrese el nombre del proyecto: ', (nombre) => {
        rl.question('Ingrese el estado (pendiente/en progreso): ', (estado) => {
            let nuevoId = proyectos.length > 0 ? proyectos[proyectos.length - 1].id + 1 : 1;

            let proyecto = {
                id: nuevoId,
                nombre: nombre.trim(),
                estado: estado.trim().toLowerCase()
            };

            proyectos.push(proyecto);
            guardarProyectos(proyectos);
            console.log(`Proyecto '${nombre}' agregado con éxito.\n`);
            mostrarMenu(rl);
        });
    });
}

function listarProyectos(rl) {
    let proyectos = cargarProyectos();
    if(proyectos.length === 0) {
        console.log('No hay proyectos registrados.\n');
    } else {
        console.log('\n Lista de proyectos: ');
        proyectos.forEach((proyecto) => {
            console.log(`ID: ${proyecto.id} | Nombre: ${proyecto.nombre} | Estado: ${proyecto.estado}`);
        });
        console.log();
    }
    mostrarMenu(rl);
}

function actualizarEstado(rl) {
    let proyectos = cargarProyectos();
    if (proyectos.length === 0) {
        console.log('No hay proyectos para actualizar.\n');
        mostrarMenu(rl);
        return;
    }

    listarProyectosSinMenu();
    rl.question('Ingrese el ID del proyecto a actualizar: ', (idStr) => {
        let id = parseInt(idStr);
        let proyecto = proyectos.find((proyecto) => proyecto.id === id);

        if (!proyecto) {
            console.log('No se encontró un proyecto con ese ID.\n');
            mostrarMenu(rl);
            return;
        }

        rl.question('Nuevo estado (en progreso/finalizado): ', (nuevoEstado) => {
            nuevoEstado = nuevoEstado.trim().toLowerCase();
            if (!['en progreso', 'finalizado'].includes(nuevoEstado)) {
                console.log('Estado no válido.\n');
            } else {
                proyecto.estado = nuevoEstado;
                guardarProyectos(proyectos);
                console.log(`Estado del proyecto '${proyecto.nombre}' actualizado a '${nuevoEstado}'.\n`);
            }
             mostrarMenu(rl);
        });
    });
}

function listarProyectosSinMenu() {
    let proyectos = cargarProyectos();
    if (proyectos.length > 0) {
        console.log('\n Lista de proyectos: ');
        proyectos.forEach((proyecto) => {
            console.log(`ID: ${proyecto.id} | Nombre: ${proyecto.nombre} | Estado: ${proyecto.estado}`);
        });
        console.log();
    }
}

function mostrarMenu(rl) {
    console.log('  GESTIÓN DE PROYECTOS  ');
    console.log('1. Agregar proyecto');
    console.log('2. Listar proyectos');
    console.log('3. Actualizar estado');
    console.log('4. Salir');

    rl.question('Seleccione una opción: ', (opcion) => {
        switch (opcion.trim()) {
            case '1':
                agregarProyecto(rl);
                break;
                case '2':
                    listarProyectos(rl);
                    break;
                    case '3':
                        actualizarEstado(rl);
                        break;
                        case '4':
                            console.log('Saliendo del programa.');
                            rl.close();
                            break;
                            default:
                                console.log('Opción inválida. Intente nuevamente.\n');
                                mostrarMenu(rl);
                                break;
        }
    });
}

function iniciar() {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    mostrarMenu(rl);
}

iniciar();