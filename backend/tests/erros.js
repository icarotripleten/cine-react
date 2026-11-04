const { NotFoundError } = require('../src/errors');

describe('Classes de erro', () => {
    test('NotFoundError tem statusCode 404 e mensagem recebida', () => {
        const erro = new NotFoundError('Filme não encontrado');

        expect(erro.statusCode).toBe(404);
        expect(erro.message).toBe('Filme não encontrado')
    })

    test('NotFoundError tem statusCode 404 e mensagem recebida', () => {
        const erro = new NotFoundError('Filme não encontrado');

        expect(erro.statusCode).toBe(404);
        expect(erro.message).toBe('Filme não encontrado')
    })

    // test('NotFoundError tem statusCode 404 e mensagem recebida', () => {
    //     const erro = new NotFoundError('Filme não encontrado');

    //     expect(erro.statusCode).toBe(404);
    //     expect(erro.message).toBe('Filme não encontrado')
    // })

    // test('NotFoundError tem statusCode 404 e mensagem recebida', () => {
    //     const erro = new NotFoundError('Filme não encontrado');

    //     expect(erro.statusCode).toBe(404);
    //     expect(erro.message).toBe('Filme não encontrado')
    // })
})

describe('Erro 2', () => {
    test('NotFoundError tem statusCode 401 e mensagem recebida', () => {
        const erro = new NotFoundError('Filme não encontrado');

        expect(erro.statusCode).toBe(404);
        expect(erro.message).toBe('Filme não encontrado')
    })

    test('NotFoundError tem statusCode 401 e mensagem recebida', () => {
        const erro = new NotFoundError('Filme não encontrado');

        expect(erro.statusCode).toBe(404);
        expect(erro.message).toBe('Filme não encontrado')
    })

    // test('NotFoundError tem statusCode 404 e mensagem recebida', () => {
    //     const erro = new NotFoundError('Filme não encontrado');

    //     expect(erro.statusCode).toBe(404);
    //     expect(erro.message).toBe('Filme não encontrado')
    // })

    // test('NotFoundError tem statusCode 404 e mensagem recebida', () => {
    //     const erro = new NotFoundError('Filme não encontrado');

    //     expect(erro.statusCode).toBe(404);
    //     expect(erro.message).toBe('Filme não encontrado')
    // })
})