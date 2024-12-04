// TESTE BASE - PARA FAZER O NOSSO
// Função para buscar a mensagem pelo ID
// async function mostrarMensagemAleatoria() {
//     // Captura os elementos HTML que serão usados para exibir as mensagens e o estado de carregamento
//     const loadingMessage = document.getElementById('loadingMessage');  // Elemento para mostrar o carregamento
//     const errorMessage = document.getElementById('errorMessage');  // Elemento para exibir mensagens de erro
//     const mensagemInfo = document.getElementById('Mensagem_Info');  // Seção onde a mensagem será exibida
//     const temaSpan = document.getElementById('Mensagem_ID');  // Elemento para exibir o tema da mensagem
//     const mensagemSpan = document.getElementById('Mensagem_ID');  // Elemento para exibir o conteúdo da mensagem

//     // Limpa quaisquer mensagens ou seções exibidas anteriormente
//     errorMessage.style.display = 'none';  // Oculta a mensagem de erro, se estava visível
//     mensagemInfo.style.display = 'none';  // Oculta a seção de mensagens, se estava visível

//     loadingMessage.style.display = 'block'; // Exibe o indicador de carregamento enquanto os dados são buscados

//     try {
//         // Realiza uma requisição assíncrona GET para buscar as mensagens no backend
//         // Substitua pela URL da sua API, que retorna uma lista de mensagens
//         const response = await fetch('http://localhost:5000/api/mensagens'); 

//         // Converte a resposta JSON para um objeto JavaScript
//         const mensagens = await response.json();

//         // Verifica se a resposta da requisição foi bem-sucedida (status HTTP 200-299)
//         if (!response.ok) {
//             // Caso a resposta não tenha sido bem-sucedida, lança um erro
//             throw new Error('Erro ao buscar as mensagens do servidor.');
//         }

//         // Seleciona uma mensagem aleatória do banco de dados
//         const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

//         // Atualiza os elementos na página com os dados da mensagem aleatória
//         temaSpan.textContent = mensagemAleatoria.tema; // Atualiza o conteúdo do tema com a mensagem aleatória
//         mensagemSpan.textContent = mensagemAleatoria.mensagem; // Atualiza o conteúdo da mensagem com a mensagem aleatória

//         // Torna visível a seção de informações da mensagem
//         mensagemInfo.style.display = 'block'; 

//     } catch (error) {
//         // Se ocorrer um erro durante a requisição ou o processamento dos dados, exibe uma mensagem de erro
//         errorMessage.textContent = error.message || 'Erro ao mostrar a mensagem.';  // Define o texto da mensagem de erro
//         errorMessage.style.display = 'block';  // Torna visível a mensagem de erro
//     } finally {
//         // Este bloco será executado independentemente de haver erro ou não
//         loadingMessage.style.display = 'none';  // Esconde o indicador de carregamento após o processo ter terminado
//     }
// }

// Função para buscar uma mensagem aleatória
async function mostrarMensagemAleatoria() {
    // Seleciona os elementos HTML relevantes
    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const mensagemInfo = document.getElementById("Mensagem_Info");
    const mensagemID = document.getElementById("Mensagem_ID");
  
    // Exibe a mensagem de carregamento
    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";
    mensagemInfo.style.display = "none";
  
    try {
      // Faz uma requisição para obter uma mensagem aleatória
      const response = await fetch("/api/mensagens/aleatoria"); // Endpoint fictício para obter mensagens
  
      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        throw new Error("Erro ao buscar mensagem: " + response.statusText);
      }
  
      // Converte a resposta para JSON
      const data = await response.json();
  
      // Atualiza os elementos HTML com os dados da mensagem recebida
      mensagemID.textContent = data.Mensagem;
      mensagemInfo.style.display = "block";
    } catch (error) {
      // Exibe a mensagem de erro em caso de falha
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } finally {
      // Oculta a mensagem de carregamento independentemente do sucesso ou falha
      loadingMessage.style.display = "none";
    }
  }
  


// -----------------------------------------------------

//Função para criar mensagem
async function fetchMessage() {
    const inputField = document.querySelector('.barraa-escrita');
    const message = inputField.value.trim();
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const messageSection = document.getElementById('Criação');
    const messageDisplay = document.getElementById('Cria_Mensagem');

    // Limpa mensagens anteriores
    errorMessage.style.display = 'none';
    messageSection.style.display = 'none';

    if (!message) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Por favor, digite uma mensagem válida.';
        return;
    }

    // Exibe mensagem de carregamento
    loadingMessage.style.display = 'block';

    try {
        // Envia a mensagem para o servidor (simulação de API)
        const response = await fetch('https://seu-servidor.com/api/mensagens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensagem: message }),
        });

        const result = await response.json();

        if (response.ok) {
            // Atualiza a exibição da mensagem
            messageDisplay.textContent = result.mensagem;
            messageSection.style.display = 'block';
        } else {
            throw new Error(result.error || 'Erro ao salvar a mensagem.');
        }
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Erro: ${error.message}`;
    } finally {
        // Oculta mensagem de carregamento
        loadingMessage.style.display = 'none';
        // Limpa o campo de entrada
        inputField.value = '';
    }
}

