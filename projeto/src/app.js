const express = require('express')
const path = require('path')
const routesPedidos = require('./routes/routesPedidos')

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'Public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/pedidos', routesPedidos)

module.exports = app