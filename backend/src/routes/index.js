const router = require('express').Router();

const movieRoute = require('./movie');
const authRoute = require('./auth');

const authMiddleware = require('./../middlewares/auth');

router.use('/movies', authMiddleware, movieRoute);
router.use('/auth', authRoute);

module.exports = router;