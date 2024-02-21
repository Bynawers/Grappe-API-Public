const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Wine = new Schema(
  {
    name: { type: String, require: true },
    country: { type: String, require: true },
    region: { type: String, require: true },
    winery: { type: String, require: true },
    volume: { type: Number },
    year: { type: Number, require: true },
    rating: {
      rate: { type: Number },
      count: { type: Number },
    },
    natural: { type: Boolean },
    type: { type: String, require: true },
    grape: { type: String },
    taste: {
      acidity: { type: Number },
      fizziness: { type: Number },
      intensity: { type: Number },
      sweetness: { type: Number },
      tannin: { type: Number },
    },
    characteristics: [{ type: String }],
    temperature_service: {
      max: { type: Number },
      min: { type: Number },
    },
    image: { type: String },
    verified: { type: Boolean },
    type_taste: { type: String },
  },
  {
    collection: "wines",
    versionKey: false,
  }
);

module.exports = mongoose.model("Wine", Wine);
