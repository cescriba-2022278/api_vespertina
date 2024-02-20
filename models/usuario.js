const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({
    nombre:{
        type: String,
        require: [true,'El nombre es requerido'] 
    },
    correo:{
        type: String,
        require: [true,'El correo electronico es requerido'],
        uniqued: true
    },
    password:{
        type: String,
        required: [true,'La contraseña es requerida']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
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

module.exports = model('Usuario', UsuarioShema);