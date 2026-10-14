require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./src/models/movie");
const filmes = require("./src/data/movies.json");

const { MONGO_URI = "mongodb://localhost:27017/cinereact" } = process.env;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await Movie.deleteMany({});
    await Movie.insertMany(filmes);
    console.log(`Seed concluido: ${filmes.length} filmes inseridos.`);
  } catch (err) {
    console.error("Erro no seed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
