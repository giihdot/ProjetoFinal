// TESTE BASE - PARA FAZER O NOSSO
// Função para buscar a mensagem pelo ID
async function mostrarMensagemAleatoria() {
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const mensagemInfo = document.getElementById('Mensagem_Info');
    const temaSpan = document.getElementById('Mensagem_ID');
    const mensagemSpan = document.getElementById('Mensagem_ID');

    // Limpa mensagens anteriores
    errorMessage.style.display = 'none';
    mensagemInfo.style.display = 'none';

    loadingMessage.style.display = 'block'; // Exibe o carregamento

    try {
        // Realiza uma requisição GET para buscar as mensagens no backend
        const response = await fetch('http://localhost:5000/api/mensagens'); // Substitua pela URL da sua API
        const mensagens = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao buscar as mensagens do servidor.');
        }

        // Seleciona uma mensagem aleatória do banco de dados
        const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

        // Exibe os dados da mensagem aleatória
        temaSpan.textContent = mensagemAleatoria.tema;
        mensagemSpan.textContent = mensagemAleatoria.mensagem;
        mensagemInfo.style.display = 'block'; // Exibe a mensagem na tela
    } catch (error) {
        errorMessage.textContent = error.message || 'Erro ao mostrar a mensagem.';
        errorMessage.style.display = 'block';
    } finally {
        loadingMessage.style.display = 'none'; // Esconde o carregamento
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

