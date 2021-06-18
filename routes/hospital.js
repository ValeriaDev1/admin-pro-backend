/*Ruta /api/hospitals*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validationJWT } = require('../middlewares/validar-JWT');
const {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
} = require('../controllers/hospital')
const router = Router();
router.get('/', getHospitals);

router.post('/', [
    validationJWT,
    check('nombre', 'El nombre de hospital obligatorio').not().isEmpty(),
    validarCampos
], createHospitals);


router.put('/:id', [], updateHospitals);

router.delete('/:id', deleteHospitals);

module.exports = router;