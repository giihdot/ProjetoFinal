// // TESTE BASE - PARA FAZER O NOSSO
// Função para buscar a história por uma palavra do texto
async function buscarHist() {
    // Captura a palavra-chave digitada pelo usuário no campo de entrada (barra-escrita)
    const palavraChave = document.querySelector('.barra-escrita').value.trim();

    // Referências dos elementos HTML que vão exibir os dados ou mensagens de erro
    const loadingMessage = document.getElementById('loadingHist'); // Mensagem de carregamento
    const errorMessage = document.getElementById('errorHist'); // Mensagem de erro
    const historiaInfo = document.getElementById('Hist_Info'); // Seção de informações da história
    const temaSpan = document.getElementById('Hist_Tema'); // Elemento para exibir o tema da história
    const mensagemSpan = document.getElementById('Hist_Mensagem'); // Elemento para exibir a mensagem da história
    const imagemElement = document.getElementById('Hist_Imagem'); // Elemento para exibir a imagem da história

    // Limpa as mensagens de erro e esconde a seção de informações da história
    errorMessage.style.display = 'none'; // Oculta mensagem de erro, caso exista
    historiaInfo.style.display = 'none'; // Oculta a seção de história, caso existam dados anteriores

    // Verifica se a palavra-chave não foi fornecida
    if (!palavraChave) {
        // Exibe uma mensagem de erro se a palavra-chave não foi informada
        errorMessage.textContent = "Por favor, insira uma palavra para buscar a história.";
        errorMessage.style.display = 'block'; // Torna visível a mensagem de erro
        return; // Interrompe a execução da função, pois não há palavra-chave para buscar
    }

    // Exibe a mensagem de carregamento enquanto os dados estão sendo buscados
    loadingMessage.style.display = 'block';

    try {
        // Realiza a requisição ao backend para buscar a história com base na palavra-chave
        // A palavra-chave é enviada como um parâmetro na URL da requisição
        const response = await fetch(`http://localhost:5000/historias/buscar?palavra=${encodeURIComponent(palavraChave)}`);

        // Converte a resposta para um formato JSON
        const data = await response.json();

        // Verifica se a requisição foi bem-sucedida, caso contrário, lança um erro
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar a história.');
        }

        // Se não encontrar resultados (o array de dados retornado está vazio), exibe uma mensagem de erro
        if (data.length === 0) {
            errorMessage.textContent = 'Nenhuma história encontrada para a palavra-chave fornecida.';
            errorMessage.style.display = 'block'; // Exibe a mensagem de erro
            return; // Interrompe a execução se nenhum resultado for encontrado
        }

        // Seleciona a primeira história retornada na resposta (você pode modificar isso para exibir mais histórias)
        const historia = data[0]; 

        // Atualiza os elementos HTML com os dados da história encontrada
        temaSpan.textContent = historia.tema || 'Tema não especificado'; // Exibe o tema da história ou um texto padrão
        mensagemSpan.textContent = historia.mensagem || 'Mensagem não encontrada'; // Exibe a mensagem ou um texto padrão
        imagemElement.src = historia.imagem_url || 'placeholder.png';  // Atualiza a URL da imagem da história, se não houver imagem, usa um placeholder
        imagemElement.alt = historia.tema || 'Imagem da história';  // Atributo alt da imagem (usado para acessibilidade)

        // Exibe a seção de informações da história (tornando-a visível)
        historiaInfo.style.display = 'block';
    } catch (error) {
        // Se ocorrer um erro durante a requisição ou processamento, exibe a mensagem de erro
        errorMessage.textContent = error.message || 'Erro ao buscar a história.';
        errorMessage.style.display = 'block'; // Torna visível a mensagem de erro
    } finally {
        // Esconde a mensagem de carregamento após a conclusão da requisição (seja ela bem-sucedida ou com erro)
        loadingMessage.style.display = 'none';
    }
}

