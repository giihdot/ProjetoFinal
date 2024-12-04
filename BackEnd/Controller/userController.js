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
    const { palavra } = req.params; // Extrai o ID dos parâmetros da URL
  
    userModel.getHistoriaByPalavra(palavra, (err, dados) => {
      if (err) return  res.status(500).send("Erro ao buscar historia"); // Erro no servidor
        res.json(dados); // Retorna os dados da história em formato JSON
      
    });
  };
