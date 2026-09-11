const userService = require('./../services/user')

async function getUserInformation(req, res) {
    try {
        const user = await userService.getUserInformation(req.user._id)

        return res.status(200).send(user)
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: error.message })
    }
}

module.exports = { getUserInformation }