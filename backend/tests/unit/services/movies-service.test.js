jest.mock('./../../../src/models/movie', () => ({
    find: jest.fn(),
    findById: jest.fn()
}))

const Movie = require('./../../../src/models/movie');
const movieService = require('./../../../src/services/movies');

describe('moviesService.buscarPorId', () => {
    test('Devolve o filme quando ele existe', async () => {
        Movie.findById.mockResolvedValue({ id: '1', titulo: 'Matrix' })

        const filme = await movieService.buscarPorId('1');

        expect(filme.titulo).toBe('Matrix');
        expect(Movie.findById).toHaveBeenCalledWith('1');
    })
})