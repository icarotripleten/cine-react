const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token inválido!' });
    }

    const token = authorization.replace('Bearer ', "");

    let payload;

    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido!' });
    }

    req.user = payload;
    next();
}