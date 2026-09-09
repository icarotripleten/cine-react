const authService = require('./../services/auth')

async function signup(req, res) {
    try {
        await authService.signup(req.body)

        return res.status(201).send({ message: 'Usuário criado com sucesso!' })
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: error.message })
    }
}

async function signin(req, res) {
    try {
        const token = await authService.signin(req.body)

        return res.status(200).send({ token })
    } catch (error) {
        console.log('error', error);
        return res.status(500).send({ message: error.message })
    }
}

module.exports = { signup, signin }