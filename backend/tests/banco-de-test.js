const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

async function conectar() {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    // garante os indices (email unico) ANTES do 1o teste
    await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
}

async function limpar() {
    const colecoes = Object.values(mongoose.connection.collections);
    await Promise.all(colecoes.map((colecao) => colecao.deleteMany({})));
}

async function desconectar() {
    await mongoose.disconnect();
    await mongod.stop();
}

module.exports = { conectar, limpar, desconectar }