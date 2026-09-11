const router = require('express').Router();

const movieRoute = require('./movie');
const authRoute = require('./auth');
const userRoute = require('./user');

const authMiddleware = require('./../middlewares/auth');

router.use('/auth', authRoute);
router.use('/movies', authMiddleware, movieRoute);
router.use('/users', authMiddleware, userRoute);

module.exports = router;