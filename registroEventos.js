// Actividad 9: Registro de eventos 
// Consigna: Crea un programa para registrar eventos. El programa debe 
// permitirte: 
// 1. Agregar un evento: Registrar un evento con nombre, fecha y 
// lugar. 
// 2. Listar los eventos: Mostrar todos los eventos registrados. 
// 3. Eliminar un evento: Eliminar un evento de la lista. 
// Pistas: 
// • Usa un archivo JSON para guardar los eventos. 
// • Si el archivo no existe, comienza con un arreglo vacío. 
// • Cada evento debe tener un ID único.

const fs = require('fs');

let readline = require('readline');
let ARCHIVO = 'eventos.json';

function cargarEventos() {
    if (fs.existsSync(ARCHIVO)) {
        let data = fs.readFileSync(ARCHIVO, 'utf-8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

function guardarEventos(eventos) {
    fs.writeFileSync(ARCHIVO, JSON.stringify(eventos, null, 4));
}

function agregarEvento(rl) {
    let eventos = cargarEventos();

    rl.question('Ingrese el nombre del evento: ', (nombre) => {
        rl.question('Ingrese la fecha del evento (DD/MM/AAAA): ', (fecha) => {
            rl.question('Ingrese el lugar del evento: ', (lugar) => {
                let nuevoId = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1;

                let evento = { 
                    id: nuevoId,
                    nombre: nombre.trim(),
                    fecha: fecha.trim(),
                    lugar: lugar.trim()
                };

                eventos.push(evento);
                guardarEventos(eventos);
                console.log(`Evento '${nombre}' agregado con éxito.\n`);
                mostrarMenu(rl);
            });
        });
    });
}

function listarEventos(rl) {
    let eventos = cargarEventos();
    if (eventos.length === 0) {
        console.log('No hay eventos registrados.\n');
    } else {
        console.log('\n Lista de eventos: ');
        eventos.forEach((evento) => {
            console.log(`ID: ${evento.id} | Nombre: ${evento.nombre} | Fecha: ${evento.fecha} | Lugar: ${evento.lugar}`);
        });
        console.log();
    }
    mostrarMenu(rl);
}

function eliminarEvento(rl) {
    let eventos = cargarEventos();

    if (eventos.length === 0) {
        console.log('No hay eventos para eliminar.\n');
        mostrarMenu(rl);
        return;
    }

    listarEventosSinMenu();

    rl.question('Ingrese el ID del evento que desea eliminar: ', (idStr) => {
        let id = parseInt(idStr);
        let indice = eventos.findIndex((evento) => evento.id === id);

        if (indice === -1) {
            console.log('No se encontró un evento con ese ID.\n');
        } else {
            let eliminado = eventos.splice(indice, 1)[0];
            guardarEventos(eventos);
            console.log(`Evento '${eliminado.nombre}' eliminado con éxito.\n`);
        }
        mostrarMenu(rl);
    });
} 

function listarEventosSinMenu() {
    let eventos = cargarEventos();
    if (eventos.length > 0) {
        console.log('\n Lista de eventos: ');
        eventos.forEach((evento) => {
            console.log(`ID: ${evento.id} | Nombre: ${evento.nombre} | Fecha: ${evento.fecha} | Lugar: ${evento.lugar} `);
        });
        console.log();
    }
}

function mostrarMenu(rl) {
    console.log('  REGISTRO DE EVENTOS  ');
    console.log('1. Agregar evento');
    console.log('2. Listar eventos');
    console.log('3. Eliminar evento');
    console.log('4. Salir');

    rl.question('Seleccione una opción: ', (opcion) => {
        switch (opcion.trim()) {
            case '1':
                agregarEvento(rl);
                break;
                case '2':
                    listarEventos(rl);
                    break;
                    case '3':
                        eliminarEvento(rl);
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