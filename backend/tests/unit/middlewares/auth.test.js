const SECRET = 'dev-secret-cinereact';

const jwt = require('jsonwebtoken');
const auth = require('./../../../src/middlewares/auth');
const { UnauthorizedError } = require('../../../src/errors');

function reqCom(authorization) {
    return { headers: authorization ? { authorization } : {} }
}

describe('Middle Auth', () => {
    test('Sem cabeçalho de autorização chama next com erro 401', () => {
        const next = jest.fn();
        const res = {};

        auth(reqCom(undefined), res, next);

        const erro = next.mock.calls[0][0];

        expect(erro).toBeInstanceOf(UnauthorizedError);
        expect(erro.message).toBe('Token nao enviado');
    })

    test('Com token valido preenche req.user e chama next() sem erro', () => {
        const token = jwt.sign({ _id: '123', role: 'admin' }, SECRET);

        const req = reqCom(`Bearer ${token}`);
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toMatchObject({ _id: '123', role: 'admin' });
        expect(next).toHaveBeenCalledWith();
    })
});