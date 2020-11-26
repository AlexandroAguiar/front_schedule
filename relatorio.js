function validaUser(){
    var user = localStorage.getItem("userSCHED");
    if (!user){  // se o objeto nao existe no LocalStorage, redireciona para o index
        window.location = "index.html";
    }

    var userObj = JSON.parse(user);
    console.log(userObj.nome);
    document.getElementById("fotoUser").innerHTML = `<img src="${userObj.linkFoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML = `<div class="card-header" width="100%">Perfil</div>
  <div class="card-body text-info" width="100%">
    <h5 class="card-title">Nome: ${userObj.nome}</h5>
    <p class="card-title">RACF: ${userObj.racf}</p>
    <p class="card-text">Email: ${userObj.email}</p>
  </div>
</div>`;
}