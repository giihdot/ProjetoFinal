// --------------------------------------------------------------------------
// ------------------------ SEÇÃO DE MENSAGENS ----------------------------
// --------------------------------------------------------------------------

// URL da API para buscar e adicionar mensagens
const apiUrl = "http://localhost:3000/mensagem"; 

// Função assíncrona para buscar uma mensagem da API
async function buscarMensagem() {
  try {
    const response = await fetch(apiUrl); // Fazendo a requisição à API
    if (!response.ok) {
      throw new Error("Mensagem não encontrada"); // Lança um erro se a resposta não for bem-sucedida
    }
    const data = await response.json();  // Converte a resposta em JSON
    console.log("Dados", data);  // Exibe os dados no console
 
// Exibe a mensagem e o tema no HTML
    document.getElementById("Mensagem_ID").innerHTML =  data[0].mensagem;
    document.getElementById("Mensagem_Info").innerHTML = data[0].tema;

    

    document.getElementById("Mensagem_Info").style.display = "block";  // Mostra a área com o texto

    document.getElementById("errorMessage").style.display = "none";  // Esconde a área de erro

  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro
    document.getElementById("errorMessage").innerHTML = error.message;
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("Mensagem_Info").style.display = "none";  // Esconde o bloco de mensagem em caso de erro
  }
}


//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------


// Função assíncrona para adicionar uma nova mensagem via API
async function addMensagem() {
  try {
    const mensagemInput = document.getElementById("Cria_Mensagem"); // Obtém o valor do campo de mensagem
    const temaInput = document.getElementById("Cria_Tema"); // Obtém o valor do campo de Tema
    const Mensagem = mensagemInput.value.trim();  // Remove espaços extras
    const Tema = temaInput.value.trim();  // Remove espaços extras
     console.log (Mensagem)
     console.log (Tema)


  // Valida os campos para garantir que estão preenchidos
  if (!Mensagem || !Tema) {
    alert("Por favor, preencha o campo de mensagem.");  // Exibe um alerta se o campo estiver vazio
    return;
  }

  // Fazendo a requisição POST para adicionar a mensagem na API
  const response = await fetch ((`${apiUrl}/criar`), {
    method: "POST",  // Método POST para adicionar dados
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({Mensagem, Tema}) // Corpo da requisição com os dados em formato JSON
  });


    if (response.ok) {
      alert("Mensagem e Tema adicionados com sucesso!");  // Exibe sucesso
      mensagemInput.value = "";  // Limpa os campos após sucesso
      temaInput.value = "";  // Limpa os campos após sucesso

      
      // Exibir ABAIXO, QUAL FOI A MENSAGEM E TEMA DIGITADOS 
      const Joga_Mensagem = document.getElementById ("Exibir_Mensagem")
      Joga_Mensagem.innerHTML = Mensagem;
      const Joga_Tema = document.getElementById ("Exibir_Tema")
      Joga_Tema.innerHTML = Tema;

      

    } else {
      const error = await response.json();  // Se falhar, captura o erro retornado pela API
      alert(`Erro ao adicionar mensagem e tema: ${error.message}`);  // Exibe o erro
    }
  } catch (error) {
    alert(error.message);  // Exibe erro caso algo dê errado com a requisição
  }
}

