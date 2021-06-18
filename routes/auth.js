/*Ruta /api/login*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/', [
    check('password', 'Password requerido').not().isEmpty(),
    check('email', 'El email no es valido ').isEmail(),
    validarCampos,
], login);
module.exports = router;