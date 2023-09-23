const { response } = require('express');


const getPresets = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getPresets',
    })

}


const crearPreset = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crearPreset',
    })

}


const actualizarPreset = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarPreset',
    })

}


const eliminarPreset = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'eliminarPreset',
    })

}


module.exports = {
    getPresets,
    crearPreset,
    actualizarPreset,
    eliminarPreset,
}