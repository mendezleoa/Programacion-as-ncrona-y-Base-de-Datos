const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', usuarioSchema);