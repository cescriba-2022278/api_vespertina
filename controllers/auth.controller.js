const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar.jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findone({correo});

        if(!usuario){
            return res.status(400).json({
                msg: "Correo inexistente"
            });
        };

        if(!usuario.estado){
            return res.status(400).json({
                msg: "El usuario no existe"
            });
        };

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword){       
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        };
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            msg: "Bienvenido"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "comuniquese con el administrador"
        });
    };
};

module.exports = {
    login
}