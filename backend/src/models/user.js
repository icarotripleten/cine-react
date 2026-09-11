const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
        default: []
    }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)