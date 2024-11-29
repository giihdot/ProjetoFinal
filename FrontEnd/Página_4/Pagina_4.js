// TESTE BASE - PARA FAZER O NOSSO
// Função para buscar uma mensagem pelo número
function buscarMensagem() {
    // Obtém o número digitado pelo usuário
    const numero = document.querySelector(".barra-escrita").value;
  
    // Elementos da interface
    const errorMessage = document.getElementById("errorMessage");
    const mensagemInfo = document.getElementById("Mensagem_Info");
  
    // Reseta mensagens e esconde a seção inicial
    errorMessage.style.display = "none";
    mensagemInfo.style.display = "none";
  
    // Verifica se o número está no banco de dados
    if (mensagensDB[numero]) {
      const { tema, mensagem } = mensagensDB[numero];
      document.getElementById("pokemonHeight").innerText = tema;
      document.getElementById("pokemonHeight").innerText = mensagem;
      mensagemInfo.style.display = "block"; // Exibe a mensagem encontrada
    } else {
      // Exibe mensagem de erro se o número não existir
      errorMessage.style.display = "block";
      errorMessage.innerText = "Mensagem não encontrada. Tente outro número.";
    }
  }

  fetch("https://api.meubanco.com/mensagens/" + numero)
  .then(response => response.json())
  .then(data => {
    // Exibe a mensagem recebida do servidor
  })
  .catch(error => {
    console.error("Erro ao buscar mensagem:", error);
  });
