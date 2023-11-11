const { response } = require('express');
const Evento = require('../models/Evento');

const getEvento = async (req, res = response) => {

    const eventos = await Evento.findOne();

    res.json({
        machineIsHeating: eventos.machineIsHeating,
        machineIsWorking: eventos.machineIsWorking,
        machineIsTakingOut: eventos.machineIsTakingOut,
        referenceTemperature: eventos.referenceTemperature,
    });

}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });

    }

}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id',
            });
        }


        const nuevoEvento = {
            ...req.body,
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal',
        });

    }

}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id',
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
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
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}