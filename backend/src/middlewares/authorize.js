module.exports = (roleNecessario) => (req, res, next) => {
    if (!req.user || !req.user.role || req.user.role != roleNecessario) {
        return res.status(403).send({ message: 'Usuário sem permissão!' });
    }

    next();
}