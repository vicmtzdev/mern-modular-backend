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

        evento.user = req.uid;

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
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id',
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(401).json({
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
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id',
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento',
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(401).json({
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