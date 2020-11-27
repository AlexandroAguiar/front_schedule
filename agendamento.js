function carregaAgencias(){
    // 

    /*
    pensando "estruturado"
    res = fetch("http://localhost:8080/agencias)
    lista = res.json();
    preenche(lista);
    */
    fetch("http://localhost:8080/agencias")
         .then(res => res.json())   // se eu receber uma resposta, vou ter q extrair o JSON da resposta
         .then(lista => preenche(lista)) // se der cert, passo isso para uma função que irá gerar dinamicamente meu select
}

function preenche(lista){

    var htmlSelect = `<select id="txtAgencia" class="form-control" oninput="montahoras()">`;

    for (i=0; i<lista.length; i++){
        var ag = lista[i]; // apenas para facilitar a manipulacao
        htmlSelect = htmlSelect + `<option value="${ag.id}">${ag.nome}</option>`;
    }
    htmlSelect = htmlSelect + `</select>`;
    document.getElementById("selectAgencia").innerHTML =htmlSelect;
    montahoras();
}

function montahoras(){
    var horaInicial = 10;
    var horaFinal   = 14;
    var htmlHora = `<select id="txtHoraInicio" class="form-control" oninput="gerahorafinal()">`;

    for (hora = horaInicial ; hora < horaFinal; hora++){
        htmlHora = htmlHora + `<option value="${hora}:00">${hora}:00</option>
                               <option value="${hora}:30">${hora}:30</option>`;
    }
    htmlHora = htmlHora + `<option value="${hora}:00">${hora}:00</option>
                         </select>`;
    document.getElementById("divHoraInicial").innerHTML = htmlHora;
}

function gerahorafinal(){
    var horaInicial = document.getElementById("txtHoraInicio").value;
    console.log("Hora selecionada = "+horaInicial);
    var hI = parseInt(horaInicial.substr(0,2));
    var mI = parseInt(horaInicial.substr(3,4));
    if (mI == 0){
        mI = 30;
    }
    else {
        mI = "00";
        hI = hI+1;
    }
    document.getElementById("txtHoraFim").value = hI+":"+mI;
}


function cadastrar(){
    var txtNomeCli  = document.getElementById("txtNome").value;
    var txtEmailCli = document.getElementById("txtEmail").value;
    var txtCelCli   = document.getElementById("txtTelefone").value;
    var txtDataCli  = document.getElementById("txtData").value;
    var txtAgencia  = document.getElementById("txtAgencia").value;
    var txtHoraIni  = document.getElementById("txtHoraInicio").value;
    var txtObs      = document.getElementById("txtObservacao").value;


    var msgBody = {
        nomeCliente : txtNomeCli,
        emailCliente : txtEmailCli,
        celularCliente : txtCelCli,
        dataAgendamento : txtDataCli,
        horaAgendamento : txtHoraIni,
        observacao : txtObs,
        agencia : {
            id : parseInt(txtAgencia)
        }
    };

    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "content-type" : "application/json"
        }
    };

    fetch("http://localhost:8080/novoagendamento",cabecalho)
        .then(res => trataResultado(res));
    
    window.location = "agendamento.html";
}

function validaDados(){

    var txtNomeCli  = document.getElementById("txtNome").value;
    var txtEmailCli = document.getElementById("txtEmail").value;
    var txtCelCli   = document.getElementById("txtTelefone").value;
    var txtDataCli  = document.getElementById("txtData").value;
    var txtAgencia  = document.getElementById("txtAgencia").value;
    var txtHoraIni  = document.getElementById("txtHoraInicio").value;
    
    if (txtNomeCli == "") {
        alert("O campo Nome do Cliente é obrigatório!!!");
        document.getElementById("txtNome").focus()
        return false;

    }

    if (txtEmailCli == "" || txtEmailCli.indexOf("@")== -1) {
        alert("Email não é válido");
        document.getElementById("txtEmail").focus();
        return false;

    }

    if (txtCelCli == "" || isNaN(txtCelCli)) {
        alert("Telefone não é válido");
        document.getElementById("txtTelefone").focus();
        return false;

    }

    if (txtAgencia == "" ) {
        alert("Agencia não pode ser em branco");
        document.getElementById("txtAgencia").focus();
        return false;

    }

    if (txtData == "" ) {
        alert("Data não pode ser em branco");
        document.getElementById("txtData").focus();
        return false;

    }


    if (txtHoraIni == "" ) {
        alert("Hora não pode ser em branco");
        document.getElementById("HoraInicio").focus();
        return false;

    }

    cadastrar()
}

function trataResultado(res){
    if (res.status == 201){
        alert("Solicitacao de agendamento Efetivada!")
    }
    else{
        alert("ERRO ao atender solicitacao");
    }
}
function validarDate(data){
    var d1 = new Date();
    d1.setDate(d1.getDate() + 1);
    var valida = Data.parse(data);
    alert(valida);
    if(valida<=d1){
        alert("Data invalida - Favor digitar data D+1");
    }
}

function limitDate(){
    var d1 = new Date();
    d1.setDate(d1.getDate() + 1);
    var amanha = formatDate(d1);
    
    document.getElementById("dataAgenda").innerHTML = `<input type="date" class="form-control" id="txtData" name="trip-start" min="${amanha}" value="${amanha}" onfocusout="validarDate(this.value)">`
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}