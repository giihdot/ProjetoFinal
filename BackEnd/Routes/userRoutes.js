// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// Rota GET para listar todos os mensagens
router.get("/mensagem", userController.getAleatoriaMensagem);

// Rota POST para criar um nova mensagem
router.post("/mensagem/criar", userController.createMensagem);

// Rota Get para buscar uma mensagem pelo ID
router.get("/historia/:palavra", userController.getHistoriaByPalavra);

module.exports = router;