// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// Rota GET para listar todos os mensagens
router.get("/mensagem", userController.getMensagem);

// Rota POST para criar um nova mensagem
router.post("/mensagem", userController.createMensagem);

// Rota Get para buscar uma mensagem pelo ID
router.get("/mensagem/:id", userController.getMensagemById);

module.exports = router;