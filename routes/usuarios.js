/*Ruta /api/usuarios*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUser, createUsers, updateUsers, deleteUser } = require('../controllers/usuarios');
const { validationJWT } = require('../middlewares/validar-JWT');
const router = Router();
router.get('/', validationJWT, getUser);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password requerido').not().isEmpty(),
    check('email', 'El email no es valido ').isEmail(),
    validarCampos,

], createUsers);


router.put('/:id', [
    validationJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido ').isEmail(),
    check('role', 'El rol no es valido ').not().isEmpty(),
    validarCampos
], updateUsers);

router.delete('/:id', validationJWT, deleteUser);

module.exports = router;