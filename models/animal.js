const { Schema, model } = require('mongoose');

const AnimalShema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    tipo:{
        type: String,
        require: [true, 'El tipo de animal es obligatorio']
    },
    especie:{
        type: String,
        require: [true, 'La especie es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Animal', AnimalShema);