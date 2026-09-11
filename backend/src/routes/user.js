const router = require('express').Router();

const userController = require('./../controllers/user')

router.get('/me', userController.getUserInformation)

module.exports = router;