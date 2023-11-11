
// Rutas Presets: host + /api/event/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/event');

const router = Router();


// Obtener evento
router.get('/', getEvento);


// Crear evento
router.post(
    '/',
    [
        check('machineIsHeating', 'Este bit es obligatorio').not().isEmpty().isBoolean(),
        check('machineIsWorking', 'Este bit es obligatorio').not().isEmpty().isBoolean(),
        check('machineIsTakingOut', 'Este bit es obligatorio').not().isEmpty().isBoolean(),
        check('referenceTemperature', 'La temperatura de referencia es obligatoria').not().isEmpty().isNumeric(),
        validarCampos,
    ],
    crearEvento
);


// Actualizar evento
router.put(
    '/:id',
    [
        check('machineIsHeating', 'Este bit es obligatorio').not().isEmpty().isBoolean(),
        check('machineIsWorking', 'Este bit es obligatorio').not().isEmpty().isBoolean(),
        check('machineIsTakingOut', 'Este bit es obligatorio').not().isEmpty().isBoolean(),
        check('referenceTemperature', 'La temperatura de referencia es obligatoria').not().isEmpty().isNumeric(),
        validarCampos,
    ],
    actualizarEvento
);


// Validación del JWT
router.use(validarJWT);

// Eliminar evento
router.delete('/:id', eliminarEvento);



module.exports = router;