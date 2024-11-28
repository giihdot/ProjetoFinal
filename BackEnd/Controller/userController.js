// userController.js
const userModel = require("../Model/userModel"); // Importa o model para interagir com o banco

// Função para lidar com a requisição de listagem de mensagens
exports.getMensagem = (req, res) => {
  userModel.getAllMensagens((err, Mensagem) => {
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



exports.getMensagemById = (req, res) => {
  const { id } = req.params;

  userModel.getMensagemById(parseInt(id), (err, Mensagem) => {
    if (err) {
      return res.status(400).send("Erro ao buscar mensagem!"); // Retorna um erro 500 se algo deu errado
    }

    if (!Mensagem) {
      return res.status(404).send("Erro ao buscar mensagem!"); // Retorna um erro 500 se algo deu errado
    }

    res.status(200).json(Mensagem);
  });
};