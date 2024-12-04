// // TESTE BASE - PARA FAZER O NOSSO
// Função para buscar a história por uma palavra do texto
async function buscarHist() {
    const historiaId = document.querySelector('.barra-escrita').value.trim();
    const loadingMessage = document.getElementById('loadingHist');
    const errorMessage = document.getElementById('errorHist');
    const historiaInfo = document.getElementById('Hist_Info');
    const temaSpan = document.getElementById('Hist_Tema');
    const mensagemSpan = document.getElementById('Hist_Mensagem');
    const imagemElement = document.getElementById('Hist_Imagem'); // Elemento da imagem

    // Limpa mensagens anteriores
    errorMessage.style.display = 'none';
    if (historiaInfo) historiaInfo.style.display = 'none';

    if (!historiaId || isNaN(historiaId) || historiaId < 1 || historiaId > 15) {
        errorMessage.textContent = "Por favor, insira um número válido entre 1 e 15.";
        errorMessage.style.display = 'block';
        return;
    }

    loadingMessage.style.display = 'block';

    try {
        const response = await fetch(`http://localhost:5000/historias/${historiaId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar a história.');
        }

        // Atualiza os elementos com os dados recebidos
        temaSpan.textContent = data.tema || 'Tema não especificado';
        mensagemSpan.textContent = data.mensagem || 'Mensagem não encontrada';
        imagemElement.src = data.imagem_url || 'placeholder.png'; // Define a imagem ou um placeholder
        imagemElement.alt = data.tema || 'Imagem da história';

        historiaInfo.style.display = 'block';
    } catch (error) {
        errorMessage.textContent = error.message || 'Erro ao buscar a história.';
        errorMessage.style.display = 'block';
    } finally {
        loadingMessage.style.display = 'none';
    }
}
