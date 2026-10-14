const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, minlength: 1, maxlength: 200 },
    ano: { type: Number, required: true, min: 1888, max: 2100 },
    genero: { type: String, default: "Outro" },
    nota: { type: Number, min: 0, max: 10, default: 0 },
    poster: { type: String, default: null },
    resumo: { type: String, default: "" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("movie", movieSchema);
