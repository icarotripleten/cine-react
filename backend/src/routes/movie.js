const router = require('express').Router();

const movieController = require('./../controllers/movie')

const authorizeMiddleware = require('./../middlewares/authorize');

router.get('/', authorizeMiddleware('admin'), movieController.getMovies)
router.post('/', movieController.createMovie)
router.patch('/:id', movieController.updateMovie)
router.delete('/:id', movieController.deleteMovie)
// router.put('/', movieController.getOrders)

module.exports = router;