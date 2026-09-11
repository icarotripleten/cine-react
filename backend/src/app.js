require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express()
const port = 3001
const routes = require('./routes')

mongoose.connect('mongodb://localhost:27017/cinereactdb')
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
    })
    .catch((err) => {
        console.log('Erro ao conectar com o banco de dados!', err);
    })

app.use(cors());
app.use(express.json())

app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})