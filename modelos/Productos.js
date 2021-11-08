const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    nombre: {
        type: String
    },
    categoria: {
        type: String,
        default: 'Otro'
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        default: 0
    }
});

module.exports = model('Producto', productoSchema);