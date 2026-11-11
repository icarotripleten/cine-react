const request = require('supertest');
const banco = require('../banco-de-test');
const dbHelper = require('./../db-helper');

const app = require('../../src/app');

beforeAll(banco.conectar);
afterEach(banco.limpar);
afterAll(banco.desconectar);

describe("GET /movies", () => {
    test("Deveria retornar 200 e uma lista vazia", async () => {
        const response = await request(app).get("/movies");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("Deveria retornar 200 e 2 filmes", async () => {
        await dbHelper.criarFilme({ titulo: "Filme 1" });
        await dbHelper.criarFilme({ titulo: "Filme 2" });

        const response = await request(app).get("/movies");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    test("Deveria retornar 200 e 1 filme", async () => {
        await dbHelper.criarFilme({ titulo: "Filme 2" });

        const response = await request(app).get("/movies");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
});

describe("GET /movies/:id", () => {
    test("Deveria retornar o filme Matrix", async () => {
        const filme = await dbHelper.criarFilme({ titulo: 'Matrix', ano: 1999 });

        const response = await request(app).get(`/movies/${filme.id}`)

        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe('Matrix');
    })
})