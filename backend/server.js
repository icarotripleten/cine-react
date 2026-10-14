require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const {
  PORT = 3000,
  MONGO_URI = "mongodb://localhost:27017/cinereact",
} = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err.message));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
