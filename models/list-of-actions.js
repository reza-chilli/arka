const mongoose = require("mongoose");
const { Schema } = mongoose;

const actionsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "products",
      required: true,
    },
    station: {
      type: mongoose.Types.ObjectId,
      ref: "stations",
      required: true,
    },
    typeOfAction: {
      type: String,
      required: true,
      enum: ["qualitative", "quantitative"],
    },
    minimum: {
      type: Number,
      default: 0,
    },
    maximum: {
      type: Number,
      default: 0,
    },
    unitOfMeasurement: {
      type: String,
      default: "",
    },
  },
  { collection: "list-of-actions", versionKey: false, timestamps: true }
);

module.exports = mongoose.model("list-of-actions", actionsSchema);
