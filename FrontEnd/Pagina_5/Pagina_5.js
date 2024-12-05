async function searchHistory() {
    const palavraChaveInpunt = document.getElementById("inputHistory");
    const palavraChave = palavraChaveInpunt.value.trim();
    const historyList = document.getElementById("historyList");

    historyList.innerHTML = `<h1>Histórias com "${palavraChave}":</h1>`;

    const response = await fetch (` http://localhost:3000/historia/${palavraChave}`);
    if (!response.ok) {
        alert("Erro ao buscar usuários :(");
        return;
    } else {

    const historias = await response.json();

    historyList.innerHTML = "";

    historias.forEach((historia)=> {
     const historiaItem = document.createElement("div");
     historyList.className = "user-item";
     historyList.innerHTML = `
       <div>
           <h3>${historias.Historia}</h3>
           <img src="${historias.ImagemURL}"/>
        </div>
        `
      historyList.appendChild(historiaItem);
     
    });

}}


// async function searchHistory() {
//     const palavra = document.getElementById("inputHistory").value.trim();

//     if (!palavra) {
//         alert("Digite uma palavra para buscar histórias.");
//         return;
//     }


//     fetch(`http://localhost:3000/historia/${palavra}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new error("Erro ao buscar história.");
//             }
//             return response.json();
//         })
//         .then(historias => {
//             const bloco = document.getElementById("blocoHistorias");
//             bloco.innerHTML = "";  

//             if (historias.length === 0) {
//                 bloco.innerHTML = `<p>Nenhuma história encontrada com a palavra :( ${palavra}</p>`;
//                 return;
//             }

//             // Adiciona cada história ao bloco
//             historias.forEach(Historia => {
//                 const historiaElement = document.createElement("nav");
//                 historiaElement.classList.add("historia-item");
//                 historiaElement.innerHTML = `
//                     <h3>História ${Historia.ID}</h3>
//                     <br>
//                     <p>${Historia.Historia}</p>
//                     <img src=${Historia.ImagemURL} alt=Imagem da história width="40%" height="40%">`;
//                 bloco.appendChild(historiaElement);
//                 console.log(Historia.ImagemURL)
//             });
//         })

//         .catch(error => {
//             console.error("Erro:", error);
//             console.log(error)
//             alert("Ocorreu um erro ao buscar histórias :(");
//         });
// };
