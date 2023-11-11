const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    machineIsHeating: {
        type: Boolean,
        required: true,
    },

    machineIsWorking: {
        type: Boolean,
        required: true,
    },

    machineIsTakingOut: {
        type: Boolean,
        required: true,
    },

    referenceTemperature: {
        type: Number,
        required: true,
    },


});

EventoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);