// Actividad 4: Control de inventario 
// Consigna: Crea un programa para llevar el control de un inventario. El 
// programa debe permitirte: 
// 1. Agregar un producto: Registrar un producto con su nombre y 
// cantidad disponible. 
// 2. Listar los productos: Mostrar todos los productos registrados. 
// 3. Actualizar la cantidad de un producto: Modificar la cantidad de 
// un producto en el inventario. 
// Pistas: 
// • Usa un archivo JSON para guardar los productos. 
// • Si el archivo no existe, comienza con un arreglo vacío. 
// • Cada producto debe tener un ID único que se pueda utilizar para 
// actualizar su cantidad.

const fs = require('fs');
let archivo = 'inventario.json';

function obtenerProductos() {
    try {
        let datos = fs.readFileSync(archivo, 'utf8');
        return JSON.parse(datos);
    } catch (error) {
        return[];
    }
}

function guardarProductos(productos) {
    fs.writeFileSync(archivo, JSON.stringify(productos, null, 2));
}

function agregarProducto(nombre, cantidad) {
    let productos = obtenerProductos();
    let existe = productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
    if(existe) {
        console.log(`El producto '${nombre}' ya está registrado.`);
        return;
    }

    let nuevoProducto = {
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
        nombre,
        cantidad
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);
    console.log(`Producto '${nombre}' agregado con catidad ${cantidad}.`);
}

function listarProductos() {
    let productos = obtenerProductos();
    if (productos.length === 0) {
        console.log('El inventario está vacío.');
    } else {
        console.log('Inventario actual: ');
        productos.forEach(producto => {
            console.log(`${producto.id}. ${producto.nombre} — Cantidad: ${producto.cantidad} `); 
        });
    }
}

function actualizarCantidad(id, nuevaCantidad) {
    let productos = obtenerProductos();
    let producto = productos.find(producto => producto.id === id);
    if(!producto){
        console.log(`No se encntró ningún producto con ID ${id}.`);
        return;
    }

    producto.cantidad = nuevaCantidad;
    guardarProductos(productos);
    console.log(`Cantidad del producto '${producto.nombre}' actualizada a ${nuevaCantidad}.`);
}

agregarProducto('Manzanas', 50);
agregarProducto('Peras', 23);
agregarProducto('Bananas', 70);

listarProductos();

actualizarCantidad(2, 45);

listarProductos();