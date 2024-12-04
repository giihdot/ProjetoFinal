// model/userModel.js
const createConnection = require("../db.js"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// Função para buscar todos as mensagens no banco de dados
exports.getAllMensagens = (callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  // Evento de conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }

    const query = `SELECT * FROM MensagensCurtas`; // Consulta SQL para buscar todos os usuários
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null); // Trata erros de execução da consulta
      }

      if (rowCount === 0) {
        return callback(null, []); // Retorna um array vazio se não houver registros
      }
    });

    // Variável para armazenar os resultados da consulta
    const mensagem = [];

    // Evento 'row' para capturar todas as linhas de resultados
    request.on("row", (columns) => {
      mensagem.push({
        id: columns[0].value, // Captura o valor da primeira coluna (ID)
        mensagem: columns[1].value, // Captura o valor da segunda coluna (mensagem)
        tema: columns[2].value, // Captura o valor da terceira coluna (tema)
        
      });
    });

    // Evento 'requestCompleted' para retornar os resultados da consulta após a execução
    request.on("requestCompleted", () => {
      callback(null, mensagem); // Retorna o array de resultados
    });

    // Executa a consulta SQL no banco de dados
    connection.execSql(request);
  });

  // Inicia a conexão com o banco de dados
  connection.connect();
};

// Função para criar um nova mensagem
exports.createMensagem = (data, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados

  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }

    // Consulta SQL para inserir um novo usuário na tabela Users
    const query = `INSERT INTO MensagensCurtas (Mensagem, Tema) VALUES (@Mensagem, @Tema)`; // O campo 'id' é auto-incrementado

    const request = new Request(query, (err) => {
      if (err) {
        return callback(err); // Chama a função callback com erro se houver falha
      } else {
        callback(null, { message: "Mensagem inserida com sucesso!" }); // Retorna uma mensagem de sucesso
      }
    });

    // Adiciona os parâmetros necessários para a inserção
    request.addParameter("Mensagem", TYPES.VarChar, data.Mensagem);
    request.addParameter("Tema", TYPES.VarChar, data.Tema);
    

    // Executa a consulta SQL para inserção no banco de dados
    connection.execSql(request);
  });

  // Inicia a conexão com o banco de dados
  connection.connect();
};



// Função para buscar um usuário pelo ID
exports.getMensagemById = (id, callback) => {
  if (isNaN(id) || id <= 0) {
    return callback(new Error("ID inválido"), null);
  }

  const connection = createConnection(); // Cria a conexão com o banco de dados

  // Evento de conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }

    const query = `SELECT * FROM MensagensCurtas WHERE ID = @id;` // Consulta SQL para buscar o usuário pelo ID
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null); // Trata erros de execução da consulta
      }

      if (rowCount === 0) {
        return callback(null, null); // Retorna null se não encontrar o usuário
      }
    });

    // Variável para armazenar o resultado da consulta
    let mensagem = null;

    // Evento 'row' para capturar o resultado da consulta
    request.on("row", (columns) => {
      mensagem = {
        id: columns[0].value, // Captura o valor da primeira coluna (ID)
        mensagem: columns[1].value, // Captura o valor da segunda coluna (mensagem)
        tema: columns[2].value, // Captura o valor da terceira coluna (tema)
        
      };
    });

    // Evento 'requestCompleted' para retornar o resultado após a execução
    request.on("requestCompleted", () => {
      callback(null, mensagem); // Retorna o resultado encontrado ou null
    });

    // Adiciona o parâmetro para o ID
    request.addParameter("ID", TYPES.Int, id);

    // Executa a consulta SQL no banco de dados
    connection.execSql(request);
  });

  // Inicia a conexão com o banco de dados
  connection.connect();
};