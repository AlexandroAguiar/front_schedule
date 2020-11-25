
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
    fetch("http://localhost:8080/login",cabecalho).then(resposta => console.log(resposta));
}