const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./src/app");
const Movie = require("./src/models/movie");
const filmes = require("./src/data/movies.json");

const { PORT = 3001 } = process.env;

async function init() {
  const mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await Movie.insertMany(filmes);

  app.listen(PORT, () => {
    console.log(`API de E2E em http://localhost:${PORT} (banco em memoria)`);
  });
}

init();