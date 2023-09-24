const { Schema, model } = require('mongoose');

const PresetSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },

});

PresetSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Preset', PresetSchema);