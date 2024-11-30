// TESTE BASE - PARA FAZER O NOSSO
// Função para buscar a mensagem pelo ID
async function buscarMensagem() {
  const mensagemId = document.querySelector('.barra-escrita').value; // Obtém o ID digitado pelo usuário
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const mensagemInfo = document.getElementById('Mensagem_Info');
  const temaSpan = document.getElementById('Mensagem_ID'); // Ajustar para IDs corretos
  const mensagemSpan = document.getElementById('Mensagem_ID'); // Ajustar para IDs corretos

  // Limpa mensagens anteriores
  errorMessage.style.display = 'none';
  mensagemInfo.style.display = 'none';

 // Verifica se o ID da mensagem é inválido:
// - mensagemId está vazio (não foi digitado nada)
// - mensagemId não é um número (isNaN verifica se a entrada não é um número)
// - mensagemId é menor que 1 ou maior que 30 (fora do intervalo permitido)
if (!mensagemId || isNaN(mensagemId) || mensagemId < 1 || mensagemId > 30) {
  // Exibe uma mensagem de erro informando ao usuário que o número digitado é inválido
  errorMessage.textContent = "Por favor, insira um número válido entre 1 e 30.";
  errorMessage.style.display = 'block'; // Mostra o elemento de erro na tela
  return; // Interrompe a execução da função para que o código não continue
}


  loadingMessage.style.display = 'block';

  try {
      // Faz a chamada para o backend para buscar a mensagem
      const response = await fetch(`http://localhost:3000/mensagens/${mensagemId}`); // URL do backend
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Erro ao buscar a mensagem.');
      }

      // Exibe os dados retornados
      temaSpan.textContent = data.tema || 'Não especificado';
      mensagemSpan.textContent = data.mensagem || 'Não especificado';
      mensagemInfo.style.display = 'block';
  } catch (error) {
      errorMessage.textContent = error.message || 'Erro ao buscar a mensagem.';
      errorMessage.style.display = 'block';
  } finally {
      loadingMessage.style.display = 'none';
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

