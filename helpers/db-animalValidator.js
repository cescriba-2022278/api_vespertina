const Role = require('../models/role');
const Animal = require('../models/animal');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const especieExistente = async (especie = '') => {
    const existeEspecie = await Animal.findOne({especie})
    if(existeEspecie) {
        throw new Error(`El correo ${ especie } ya esta registrado`);
    }
}

const idExistente = async(id = '') =>{
    const existeId = await Animal.findOne({id});
    if (existeId){
        throw new Error(`El id ${ id } no se encuentra registrado en la base de datos`);
    }
}
 
module.exports = {
    esRoleValido,
    especieExistente,
    idExistente
}