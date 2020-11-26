
function autenticar() {
    // passo1 - recuperar dados digitados
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("DEBUG = digitados: " + txtLogin + " / " + txtSenha)


    // passo 2 - mostrar o objeto de requisição para back-end
    var msgBody = {
        email: txtLogin,
        racf: txtLogin,
        senha: txtSenha
    };


    // passo 3 - mostrar o cabecalho da requisição
    var cabecalho = {
        method: "POST",
        body: JSON.stringify(msgBody),
        headers: {
            "content-type": "application/json"
        }
    };

    // passo 4 - enviar a requisição para o back-end
    fetch("http://localhost:8080/login",cabecalho).then(resposta => trataResposta(resposta));
}

function trataResposta(resposta){
    if (resposta.status == 200){
        resposta.json().then(user => efetivaLogin(user))
    }else if (resposta.status == 401){
        //document.getElementsById("unauthorized").style.display = "true"
        document.getElementById("msg").innerHTML = `<div class="alert alert-danger" role="alert">
        Senha incorreta
      </div>`;

    }else if (resposta.status == 404){
        document.getElementById("msg").innerHTML = `<div class="alert alert-danger" role="alert">
        Usuario nao encontrado
      </div>`;
    }else{
        document.getElementById("msg").innerHTML = `<div class="alert alert-danger" role="alert">
        Erro desconhecido
      </div>`;

    }
}

function efetivaLogin(user){
    console.log("usuario recebido");
    console.log(user);
    localStorage.setItem("userSCHED",JSON.stringify(user));
    // redirecionar para pagina relatorio
    window.location = "relatorio.html";
}