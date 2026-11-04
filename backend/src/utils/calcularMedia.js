function calcularMedia(filmes) {
    const notas = filmes.map((filme) => filme.nota);

    if (notas.length === 0) {
        return 0;
    }

    const soma = notas.reduce((total, nota) => total + nota, 0);
    return Math.round((soma / notas.length));
}

module.exports = { calcularMedia };