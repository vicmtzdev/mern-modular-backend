const { response } = require('express');
const Preset = require('../models/Preset');

const getPresets = async (req, res = response) => {

    const presets = await Preset.find().populate('user', 'name');

    res.json({
        ok: true,
        presets,
    });

}


const crearPreset = async (req, res = response) => {

    const preset = new Preset(req.body);

    try {

        preset.user = req.uid;

        const presetGuardado = await preset.save();

        res.json({
            ok: true,
            preset: presetGuardado,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });

    }

}


const actualizarPreset = async (req, res = response) => {

    const presetId = req.params.id;
    const uid = req.uid;

    try {

        const preset = await Preset.findById(presetId);

        if (!preset) {
            return res.status(404).json({
                ok: false,
                msg: 'El preset no existe por ese id',
            });
        }

        if (preset.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

        const nuevoPreset = {
            ...req.body,
            user: uid,
        }

        const presetActualizado = await Preset.findByIdAndUpdate(presetId, nuevoPreset, { new: true });

        res.json({
            ok: true,
            preset: presetActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });

    }

}


const eliminarPreset = async (req, res = response) => {

    const presetId = req.params.id;
    const uid = req.uid;

    try {

        const preset = await Preset.findById(presetId);

        if (!preset) {
            return res.status(404).json({
                ok: false,
                msg: 'El preset no existe por ese id',
            });
        }

        if (preset.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento',
            });
        }


        await Preset.findByIdAndDelete(presetId);

        res.json({
            ok: true,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });

    }

}


module.exports = {
    getPresets,
    crearPreset,
    actualizarPreset,
    eliminarPreset,
}