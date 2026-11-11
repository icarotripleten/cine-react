const Movie = require('../src/models/movie');

async function criarFilme(dados = {}) {
    return Movie.create({ titulo: 'Filme de teste', ano: 2020, nota: 7, ...dados });
}

module.exports = { criarFilme };