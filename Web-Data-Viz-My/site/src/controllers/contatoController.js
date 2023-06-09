var contatoModel = require("../models/contatoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA contatoController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function listar(req, res) {
    contatoModel.listar().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo index.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    console.log(req.body.emailServer);
    console.log(nome)
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
       // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    contatoModel.cadastrar(nome, email)
    .then(
        function (resposta){
        res.status(200)
        .send("Carro criado com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function recuperarIdUsuario(req, res) {
    var nome = req.body.nomeServer;
    console.log(nome);
    
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    contatoModel.recuperarIdUsuario(nome)
    .then(
        function (resposta){
        res.status(200)
        .send("Consegui pegar o valor do usuario");
        console.log(resposta)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
        console.log(nome)
    })
}

module.exports = {
    testar,
    listar,
    cadastrar,
    recuperarIdUsuario
}