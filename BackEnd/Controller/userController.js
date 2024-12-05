// userController.js
const userModel = require("../Model/userModel"); // Importa o model para interagir com o banco

// Função para lidar com a requisição de listagem de mensagens
exports.getAleatoriaMensagem = (req, res) => {
  userModel.getAleatoriaMensagem((err, Mensagem) => {
    if (err) {
      res.status(500).send("Erro ao buscar mensagem!"); // Retorna um erro 500 se algo deu errado
    } else {
      res.json(Mensagem); // Retorna as mensagens em formato JSON
    }
  });
};

exports.createMensagem = (req, res) => {
  const { Mensagem } = req.body;
  const { Tema } = req.body;


  userModel.createMensagem({ Mensagem, Tema }, (err) => {
    if (err) {
      res.status(500).send("Erro ao criar mensagem!"); // Retorna um erro 500 se algo deu errado
    } else {
      res.status(201).send("Mensagem criado com sucesso!");
    }
  });
};

// Função para buscar um história por palavra
exports.getHistoriaByPalavra = (req, res) => {
  const { palavra } = req.params;

  userModel.getHistoriaByPalavra(palavra, (err, dados) => {
    if (err) {
      return res.status(500).send("Erro ao buscar história");
    }
    if (!dados || dados.length === 0) {
      return res.status(404).json({ message: "Nenhuma história encontrada" });
    }
    res.json(dados); // Envia os dados em formato JSON
  });
};
