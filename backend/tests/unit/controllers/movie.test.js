const moviesService = require("../../../src/services/movies");

const { getMovies } = require('./../../../src/controllers/movies');

function criarFalsoRes() {
    return {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }
}

describe('getMovies (controller', () => {
    test('Responde 200 com o que a service devolve', async () => {
        const filmesFalsos = [{ id: 1, title: 'Filme 1', }];

        jest.spyOn(moviesService, 'listar').mockResolvedValue(filmesFalsos);

        const req = {};
        const res = criarFalsoRes();
        const next = jest.fn();

        await getMovies(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(filmesFalsos);
        expect(next).not.toHaveBeenCalled();
    })

    test('Repassa o erro para o next quando o service falha', async () => {
        const erro = new Error("Banco caiu");

        jest.spyOn(moviesService, 'listar').mockRejectedValue(erro);

        const req = {};
        const res = criarFalsoRes();
        const next = jest.fn();

        await getMovies(req, res, next);

        expect(next).toHaveBeenCalledWith(erro);
        expect(res.send).not.toHaveBeenCalled();
    })
})