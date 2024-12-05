
async function BuscarHistoria() {
  const palavraInpunt = document.getElementById("inputHistoria");
  const palavraChave = palavraInpunt.value.trim();
  const historyList = document.getElementById("historyList");

  historyList.innerHTML = `<h2>Não existe nenhuma história com (${palavraChave})</h2>`;

  console.log (palavraChave);

  const response = await fetch (`http://localhost:3000/historia/${palavraChave}`);
  if (!response.ok) {
      alert("Erro ao buscar história :(");
      return;
  } else {


  const historias = await response.json();


  historias.forEach((Historia)=> {
   const historiaItem = document.createElement("section");
   historyList.innerHTML = `
     <section>
         <h3>${Historia.Historia}</h3>
         <img src="${Historia.ImagemURL}" style= "width: 35vw"; "height: 20vh"/>
      </section>
      `
    historyList.appendChild(historiaItem);
   
  });

}}