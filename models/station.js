const mongoose = require('mongoose');
const { Schema } = mongoose;

const stationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        stationNO: {
            type: Number,
            required: true,
        },
    },
    { collection: 'stations', versionKey: false, timestamps: true },
);

module.exports = mongoose.model('stations', stationSchema);