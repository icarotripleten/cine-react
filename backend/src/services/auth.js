const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

async function signup({ email, password, name, role }) {
    const userExists = await User.findOne({ email });

    if (userExists) throw new Error('Usuário já cadastrado!');

    const hash = await bcrypt.hash(password, 10);

    return User.create({ email, password: hash, name, role });
}

async function signin({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) throw new Error('Email ou senha incorretos!');

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) throw new Error('Email ou senha incorretos!');

    return jwt.sign({ _id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "1d" })
}

module.exports = { signup, signin }