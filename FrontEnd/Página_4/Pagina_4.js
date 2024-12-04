// --------------------------------------------------------------------------
// ------------------------ SEÇÃO DE MENSAGENS ----------------------------
// --------------------------------------------------------------------------

// URL da API para buscar e adicionar mensagens
const apiUrl = "http://localhost:5000/mensagem"; 

// Função para mostrar um "spinner" enquanto os dados são carregados
function showLoading(target) {
  target.innerHTML = '<div class="spinner show"></div>'; // Exibe um "spinner" de carregamento
}


// Função assíncrona para buscar uma mensagem da API
async function buscarMensagem() {
  try {
    const response = await fetch(`http://localhost:5000/mensagem`); // Fazendo a requisição à API
    if (!response.ok) {
      throw new Error("Mensagem não encontrada"); // Lança um erro se a resposta não for bem-sucedida
    }
    const data = await response.json();  // Converte a resposta em JSON
    console.log("Dados", data);  // Exibe os dados no console

    // Exibe a mensagem e o tema no HTML
    document.getElementById("Mensagem_ID").innerHTML =  data[0].Mensagem;
    document.getElementById("Mensagem_Info").innerHTML = data[0].Tema;

    document.getElementById("Mensagem_Info").style.display = "block";  // Mostra a área com o texto
    document.getElementById("errorMessage").style.display = "none";  // Esconde a área de erro

  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro
    document.getElementById("errorMessage").innerHTML = error.message;
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("Mensagem_Info").style.display = "none";  // Esconde o bloco de mensagem em caso de erro
  }
}

// Função assíncrona para adicionar uma nova mensagem via API
async function addMensagem() {
  const mensagemInput = document.querySelector(".barraa-escrita"); // Obtém o valor do campo de mensagem
  const Mensagem = mensagemInput.value.trim();  // Remove espaços extras

  // Valida os campos para garantir que estão preenchidos
  if (!Mensagem) {
    alert("Por favor, preencha o campo de mensagem.");  // Exibe um alerta se o campo estiver vazio
    return;
  }

  try {
    // Fazendo a requisição POST para adicionar a mensagem na API
    const response = await fetch(`http://localhost:5000/mensagem`, {
      method: "POST",  // Método POST para adicionar dados
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({Mensagem}) // Corpo da requisição com os dados em formato JSON
    });

    if (response.ok) {
      alert("Mensagem adicionada com sucesso!");  // Exibe sucesso
      mensagemInput.value = "";  // Limpa os campos após sucesso
    } else {
      const error = await response.json();  // Se falhar, captura o erro retornado pela API
      alert(`Erro ao adicionar mensagem: ${error.message}`);  // Exibe o erro
    }
  } catch (error) {
    alert(error.message);  // Exibe erro caso algo dê errado com a requisição
  }
}

