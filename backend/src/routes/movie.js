const router = require('express').Router();

const movieController = require('./../controllers/movie')

const authorizeMiddleware = require('./../middlewares/authorize');

router.get('/', movieController.getMovies)
router.post('/', authorizeMiddleware('admin'), movieController.createMovie)
router.patch('/:id', authorizeMiddleware('admin'), movieController.updateMovie)
router.delete('/:id', authorizeMiddleware('admin'), movieController.deleteMovie)

module.exports = router;