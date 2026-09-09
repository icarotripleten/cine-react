const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    ano: { type: Number, required: true },
    genero: { type: String, required: true },
    nota: { type: Number },
    poster: { type: String }
}, { versionKey: false })

module.exports = mongoose.model('Movie', movieSchema)