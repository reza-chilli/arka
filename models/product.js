const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
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
    },
    { collection: 'products', versionKey: false, timestamps: true },
);

module.exports = mongoose.model('products', productSchema);