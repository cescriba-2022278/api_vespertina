const { Schema, model } = require('mongoose');

const AnimalShema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    especie:{
        type: String,
        require: [true, 'La especie es obligatoria'],
        uniqued: true
    },
    role:{
        type: String,
        require: true,
        enum: ["AEROTERRESTRE", "TERRESTRE", "ACUATICO"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default:  false
    }
});

module.exports = model('Animal', AnimalShema);