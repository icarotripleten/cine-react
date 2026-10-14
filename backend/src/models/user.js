const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, default: "Cinefilo", minlength: 2, maxlength: 40 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "E-mail invalido"],
    },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
      default: [],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
