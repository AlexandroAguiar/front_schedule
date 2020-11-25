function validaUser(){
    var user = localStorage.getItem("userSCHED");
    if (!user){  // se o objeto nao existe no LocalStorage, redireciona para o index
        window.location = "index.html";
    }
}