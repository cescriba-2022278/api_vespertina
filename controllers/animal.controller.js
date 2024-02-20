const bcryptjs = require('bcryptjs');
const Animal = require('../models/animal');
const {response} = require('express');

 const animalesGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, animales] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,animales
    });
}

const getAnimalById = async (req, res) => {
    const {id} = req.params;
    const animal = await Animal.findOne({_id: id});

    res.status(200).json({
        animal
    });
}

const putAnimales = async(req, res = response) => {
    const {id} = req.params;
    const { _id, especie, role, google, ...resto } = req.body;

    if(especie){
        const salt = bcryptjs.genSaltSync();
        resto.especie = bcryptjs.hashSync(especie, salt);
    }

    const animal = await Animal.findByIdAndUpdate(id , resto);

    res.status(200).json({
        msg:"Actualizado correctamente",
        animal
    });
}

const animalesDelete = async (req, res) => {
    const {id} = req.params;
    const animal = await Animal.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg:'Eliminado Correctamente',
    });
}

const animalesPost = async(req, res) => {
    const { nombre, especie, role } = req.body;
    const animal = new Animal({ nombre, especie, role });

    const salt = bcryptjs.genSaltSync();
    animal.especie = bcryptjs.hashSync(especie, salt);

    await animal.save();
    res.status(202).json({
        animal
    });
}

module.exports = {
    animalesPost,
    animalesGet,
    getAnimalById,
    putAnimales,
    animalesDelete
}