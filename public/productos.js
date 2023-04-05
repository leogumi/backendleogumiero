// Importar dependencias
const mongoose = require('mongoose');

// Definir el schema
const PelotaSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    imagen: String,
});

// Exportar el modelo
module.exports = mongoose.model('Pelota', PelotaSchema);

module.exports = {
    productos: [
        {
            nombre: "Spalding",
            marca: "Spalding",
            modelo: "NBA Game Ball",
            precio: 149.99,
            descripcion: "Pelota de baloncesto oficial de la NBA",
            imagen: "./fotos/spaldingnba.jpg"
        },
        // otros productos aquí
    ]
};
