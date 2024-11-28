// Seleciona todas as imagens do slider
const imagens = document.querySelectorAll("#slider img");

// Variável para controlar qual imagem está sendo exibida no momento
let imagemAtual = 0;

// Função para mostrar uma imagem específica
function mostrarImagem(index) {
    // Primeiro, escondemos todas as imagens
    imagens.forEach(img => img.style.display = "none");
    // Depois, exibimos a imagem com o índice indicado
    imagens[index].style.display = "block";
}

// Função para ir para a próxima imagem
function proximaImagem() {
    // Incrementa o índice da imagem atual e volta para o início se chegar ao final
    imagemAtual = (imagemAtual + 1) % imagens.length;
    mostrarImagem(imagemAtual);
}

// Função para ir para a imagem anterior
function imagemAnterior() {
    // Decrementa o índice da imagem atual e volta para o final se for negativo
    imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
    mostrarImagem(imagemAtual);
}

// Exibe a primeira imagem quando a página carrega
mostrarImagem(imagemAtual);

// Configura a troca automática de imagens a cada 2 segundos
let intervalo = setInterval(proximaImagem, 2000)

// Seleciona os botões de navegação
const botaoProximo = document.getElementById("nextBtn");
const botaoAnterior = document.getElementById("prevBtn");

// Adiciona o evento de clique ao botão "Próximo"
botaoProximo.addEventListener("click", () => {
    clearInterval(intervalo)
    proximaImagem(); // Mostra a próxima imagem ao clicar
    intervalo = setInterval(proximaImagem, 2000)
});

// Adiciona o evento de clique ao botão "Anterior"
botaoAnterior.addEventListener("click", () => {
    clearInterval(intervalo)
    imagemAnterior(); // Mostra a imagem anterior ao clicar
    intervalo = setInterval(imagemAnterior, 2000)
});