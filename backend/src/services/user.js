const User = require('../models/user');

async function getUserInformation(userId) {
    return User.findById(userId);
}

module.exports = { getUserInformation };