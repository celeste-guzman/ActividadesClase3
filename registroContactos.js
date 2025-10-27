// Actividad 5: Registro de contactos 
// Consigna: Crea un programa que permita registrar contactos con 
// nombre, teléfono y correo electrónico. El programa debe permitirte: 
// 1. Agregar un contacto: Registrar un nuevo contacto. 
// 2. Listar los contactos: Mostrar todos los contactos registrados. 
// 3. Eliminar un contacto: Eliminar un contacto de la lista. 
// Pistas: 
// • Usa un archivo JSON para guardar los contactos. 
// • Si el archivo no existe, comienza con un arreglo vacío. 

const fs = require('fs');
let archivo = 'contactos.json';

function obtenerContactos() {
    try {
        let datos = fs.readFileSync(archivo, 'utf8'); 
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
}

function guardarContactos(contactos) {
    fs.writeFileSync(archivo, JSON.stringify(contactos, null, 2));
}

function agregarContacto(nombre, telefono, correo) {
    let contactos = obtenerContactos();
    let existe = contactos.find(c => c.nombre.toLowerCase() === nombre.toLowerCase() || c.telefono === telefono);
    if (existe) {
        console.log(`El contacto '${nombre}' ya está registrado.`);
        return;
    }

    let nuevoContacto = {
        id: contactos.length > 0 ? contactos[contactos.length - 1].id + 1 : 1,
        nombre,
        telefono,
        correo
    };

    contactos.push(nuevoContacto);
    guardarContactos(contactos);
    console.log(`Contacto '${nombre}' agregado con éxito.`);
}

function listarContactos() {
    let contactos = obtenerContactos();
    if (contactos.length === 0) {
        console.log('No hay contactos registrados.');
        return;
    }

    console.log('Lista de contactos:');
    contactos.forEach(contacto => {
        console.log(`${contacto.id}. ${contacto.nombre} — Tel: ${contacto.telefono} — Email: ${contacto.correo}`);
    });
}

function eliminarContacto(id) {
    let contactos = obtenerContactos();
    let indice = contactos.findIndex(contacto => contacto.id === id);
    if (indice === -1) {
        console.log(`No se encontró ningún contacto con ID ${id}.`);
        return;
    }

    let eliminado = contactos.splice(indice, 1)[0];
    guardarContactos(contactos);
    console.log(`Contacto '${eliminado.nombre}' eliminado con éxito.`);
}

agregarContacto('Juan Pérez', '123456789', 'juanperez@gmail.com');
agregarContacto('Ana Gómez', '987654321', 'ana.gomez@hotmail.com');
agregarContacto('Carlos Ruiz', '555555555', 'carlos.ruiz@outlook.com');

listarContactos();

eliminarContacto(2);

listarContactos();
