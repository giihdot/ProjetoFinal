const apiUrl = "http://localhost:3000/mensagem"; // URL centralizada

async function buscarMensagem() {
  const mensagemInfo = document.getElementById("Mensagem_Info");
  try {
    showLoading(mensagemInfo);
    const response = await fetch(apiUrl); 
    if (!response.ok) {
      throw new Error("Mensagem não encontrada");
    }
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error("Nenhuma mensagem encontrada");
    }
    
    document.getElementById("Mensagem_ID").innerHTML = data[0];
    document.getElementById("Mensagem_Info").innerHTML = data[0].Tema;
    mensagemInfo.style.display = "block";
    document.getElementById("errorMessage").style.display = "none";
  } catch (error) {
    document.getElementById("errorMessage").innerHTML = error.message;
    document.getElementById("errorMessage").style.display = "block";
    mensagemInfo.style.display = "none";
  }
}

async function addMensagem() {
  const mensagemInput = document.querySelector(".barraa-escrita");
  const Mensagem = mensagemInput.value.trim();

  if (!Mensagem) {
    alert("Por favor, preencha o campo de mensagem.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: Mensagem })
    });

    if (response.ok) {
      alert("Mensagem adicionada com sucesso!");
      mensagemInput.value = "";
    } else {
      const error = await response.json();
      alert(`Erro ao adicionar mensagem: ${error.message}`);
    }
  } catch (error) {
    alert(error.message || "Erro desconhecido ao processar a requisição");
  }
}

