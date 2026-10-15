const express = require("express");
const router = express.Router()
const controllerPedidos = require('../controller/controllerPedidos')

router.get('/', controllerPedidos.buscarPedidos)
router.post('/', controllerPedidos.cadastrarPedidos)
router.put('/:id', controllerPedidos.atualizarPedidos)
router.delete('/:id', controllerPedidos.deletarPedidos)

module.exports = router