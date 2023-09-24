
// Rutas Presets: host + /api/presets/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getPresets, crearPreset, actualizarPreset, eliminarPreset } = require('../controllers/presets');

const router = Router();


// Validación del JWT
router.use(validarJWT);

// Obtener presets
router.get('/', getPresets);


// Crear preset
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('amount', 'La cantidad es obligatoria').not().isEmpty().isNumeric(),
        check('temperature', 'La temperatura es obligatoria').not().isEmpty().isNumeric(),
        check('time', 'El tiempo es obligatorio').not().isEmpty().isNumeric(),
        check('photo', 'La foto es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearPreset
);


// Actualizar preset
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('amount', 'La cantidad es obligatoria').not().isEmpty().isNumeric(),
        check('temperature', 'La temperatura es obligatoria').not().isEmpty().isNumeric(),
        check('time', 'El tiempo es obligatorio').not().isEmpty().isNumeric(),
        check('photo', 'La foto es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    actualizarPreset
);


// Eliminar preset
router.delete('/:id', eliminarPreset);



module.exports = router;

