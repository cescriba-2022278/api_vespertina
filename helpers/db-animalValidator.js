const Role = require('../models/role');
const Animal = require('../models/animal');


const idExistente = async(id = '') =>{
    const existeId = await Animal.findOne({id});
    if (existeId){
        throw new Error(`El id ${ id } no se encuentra registrado en la base de datos`);
    }
}
 
module.exports = {
    idExistente
}