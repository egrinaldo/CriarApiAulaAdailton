// COMANDO PARA CRIAR A API 'npm init'
// FIRE SYSTEM PARA SIMULAR A CRIAÇÃO DE UM BANCO DE DADOS

const express = require('express');
const fs = require('fs');
const { request } = require('http');

const app = express();
const arquivo = 'jogos.json';

app.listen(3000, () => {
    console.log('API de jogo em execucao na porta 3000')

    // verificando se o arquivo existe
    fs.access(arquivo, fs.constants.F_OK, (err) =>{
        if(err){
            // ELE IRÁ VERIFICAR SE O ARQUIVO JÁ POSSUI ALGUM ARQUIVO SE NÃO ELE IRÁ CRIAR 
            console.log(`${arquivo} does not exist`);
            // ELE IRÁ CRIAR OS DADOS ID NOME ANO CATEGORIA NA TABELA OU JSON OU LINHA
            console.log(`Create file ${arquivo}`);
            let jogosIniciais = [
                {id: 1, nome:'Super Mario world', ano: 1990, categoria:'Plataforma'},
                {id: 1, nome:'Half-Life 2', ano: 2004, categoria:'Plataforma'}
            ];
            let data = JSON.stringify(jogosIniciais);
            fs.writeFileSync(arquivo,data);
        }
    });
});

app.get('/jogos', (request, response) => {
    //  ESTE FS.READFILESYNC IRÁ TRAZER A INFORMAÇÃO QUE FOI CRIADA NO CAMPO ACIMA
    let data = fs.readFileSync(arquivo);
    let jogos = JSON.parse(data);
    // response.send(jogos);

    if (request.query.categoria) {
        let jogosFiltrados = jogos.filter(jogo) => jogo.categoria === request.query.categoria)
        response.send(jogosFiltrados);
    }
   response.send(jogos);
});