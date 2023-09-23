
// Rutas Presets: host + /api/presets/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getPresets, crearPreset, actualizarPreset, eliminarPreset } = require('../controllers/presets');

const router = Router();


// Validación del JWT
router.use(validarJWT);

// Obtener presets
router.get('/', getPresets);


// Crear preset
router.post('/', crearPreset);


// Actualizar preset
router.put('/:id', actualizarPreset);


// Eliminar preset
router.delete('/:id', eliminarPreset);



module.exports = router;

