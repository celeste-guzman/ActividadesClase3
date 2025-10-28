// Actividad 10: Gestión de compras 
// Consigna: Crea un programa que registre las compras realizadas. El 
// programa debe permitirte: 
// 1. Agregar una compra: Registrar una compra con su nombre y 
// precio. 
// 2. Listar las compras: Mostrar todas las compras registradas. 
// 3. Eliminar una compra: Eliminar una compra de la lista. 
// Pistas: 
// • Usa un archivo JSON para guardar las compras. 
// • Si el archivo no existe, comienza con un arreglo vacío. 
// • Cada compra debe tener un ID único.

const fs = require('fs');
let readline = require('readline');
let ARCHIVO = 'compras.json';

function cargarCompras() {
    if (fs.existsSync(ARCHIVO)) {
        let data = fs.readFileSync(ARCHIVO, 'utf-8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

function guardarCompras(compras) {
    fs.writeFileSync(ARCHIVO, JSON.stringify(compras, null, 4));
}

function agregarCompra(rl) {
    let compras = cargarCompras();

    rl.question('Ingrese el nombre del producto: ', (nombre) => {
        rl.question('Ingrese el precio: ', (precioStr) => {
            let precio = parseFloat(precioStr);

            if (isNaN(precio) || precio <= 0) {
                console.log('Precio no válido.\n');
                mostrarMenu(rl);
                return;
            }

            let nuevoId = compras.length > 0 ? compras[compras.length - 1].id + 1 : 1;

            let compra = {
                id: nuevoId,
                nombre: nombre.trim(),
                precio: precio.toFixed(2)
            };

            compras.push(compra);
            guardarCompras(compras);
            console.log(`Compra '${nombre}' registrada con éxito.\n`);
            mostrarMenu(rl);
        });
    });
}

function listarCompras(rl) {
    let compras = cargarCompras();

    if (compras.length === 0) {
        console.log('No hay compras registradas.\n');
    } else {
        console.log('\nLista de compras:');
        compras.forEach((compra) => {
            console.log(`ID: ${compra.id} | Producto: ${compra.nombre} | Precio: $${compra.precio}`);
        });

        let total = compras.reduce((acc, compra) => acc + parseFloat(compra.precio), 0);
        console.log(`\nTotal gastado: $${total.toFixed(2)}\n`);
    }

    mostrarMenu(rl);
}

function eliminarCompra(rl) {
    let compras = cargarCompras();

    if (compras.length === 0) {
        console.log('No hay compras para eliminar.\n');
        mostrarMenu(rl);
        return;
    }

    listarComprasSinMenu();

    rl.question('Ingrese el ID de la compra a eliminar: ', (idStr) => {
        let id = parseInt(idStr);
        let indice = compras.findIndex((compra) => compra.id === id);

        if (indice === -1) {
            console.log('No se encontró una compra con ese ID.\n');
        } else {
            let eliminada = compras.splice(indice, 1)[0];
            guardarCompras(compras);
            console.log(`Compra '${eliminada.nombre}' eliminada con éxito.\n`);
        }

        mostrarMenu(rl);
    });
}

function listarComprasSinMenu() {
    let compras = cargarCompras();
    if (compras.length > 0) {
        console.log('\n🛒 Lista de compras:');
        compras.forEach((compra) => {
            console.log(`ID: ${compra.id} | Producto: ${compra.nombre} | Precio: $${compra.precio}`);
        });
        console.log();
    }
}

function mostrarMenu(rl) {
    console.log('  GESTIÓN DE COMPRAS  ');
    console.log('1. Agregar compra');
    console.log('2. Listar compras');
    console.log('3. Eliminar compra');
    console.log('4. Salir');

    rl.question('Seleccione una opción: ', (opcion) => {
        switch (opcion.trim()) {
            case '1':
                agregarCompra(rl);
                break;
            case '2':
                listarCompras(rl);
                break;
            case '3':
                eliminarCompra(rl);
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