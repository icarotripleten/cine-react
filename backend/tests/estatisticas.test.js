const { calcularMedia } = require('./../src/utils/calcularMedia');

describe('Calcular media das notas', () => {
    test('Devole 0 para uma lista vazia', () => {
        expect(calcularMedia([])).toBe(0);
    })

    test('Calcula a media das notas', () => {
        const filmes = [{ nota: 8 }, { nota: 6 }];

        expect(calcularMedia(filmes)).toBe(7);
    })
})