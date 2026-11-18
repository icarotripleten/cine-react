const { extrairToken } = require('../../src/utils/extrairToken');

describe('Teste de token', () => {
    test.each([
        ['cabecalho ausente', undefined],
        ['string vazia', ""],
        ['outro schema', "Basic 1203912312"],
        ['schema errado', "Token 1203912312"],
        ['schema errado', "Bearer "],
    ])('devolve null quando: %s', (_descricao, cabecalho) => {
        expect(extrairToken(cabecalho)).toBeNull();
    })
})

