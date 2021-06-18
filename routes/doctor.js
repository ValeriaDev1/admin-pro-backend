/*Ruta /api/doctors*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validationJWT } = require('../middlewares/validar-JWT');
const {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
} = require('../controllers/doctor')
const router = Router();
router.get('/', getDoctors);

router.post('/', [
    validationJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital es invalido ').not().isMongoId(),

], createDoctors);


router.put('/:id', [], updateDoctors);

router.delete('/:id', deleteDoctors);

module.exports = router;