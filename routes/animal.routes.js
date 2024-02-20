const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const{
    animalesPost, 
    animalesGet,
    getAnimalById,
    putAnimales,
    animalesDelete} = require('../controllers/animal.controller');
const { especieExistente, idExistente, esRoleValido } = require('../helpers/db-animalValidator');

const router = Router();

router.get("/", animalesGet);

router.get(
    "/:id", 
    [
        check('id','El id debe ser un número').isMongoId(),
        check('id').custom(idExistente),
        validarCampos
    ], getAnimalById);

router.put(
    "/:id", 
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(idExistente),
        check('role').custom(esRoleValido),
        validarCampos
    ], putAnimales);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(idExistente),
        validarCampos     
    ], animalesDelete);

router.post(
    "/",
    [
        check('nombre', 'El nombre no puede estar vacio').not().isEmpty(),
        check('especie').custom(especieExistente),
        check('role').custom(esRoleValido),
        validarCampos
    ], animalesPost);

module.exports = router;
