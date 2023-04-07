const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema(
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
        productCount: {
            type: Number,
            required: true,
        },
        firstSerialNumber: {
            type: Number,
            required: true,
        },
        lastSerialNumber: {
            type: Number,
            required: true,
        },
        fixedSerialNumber: {
            type: Number,
            required: true,
        }
    },
    { collection: 'projects', versionKey: false, timestamps: true },
);

module.exports = mongoose.model('projects', projectSchema);