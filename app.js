// app.js
const express = require('express');
const fs = require('fs');
const Grafopai = require('./grafo');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const grafofilho = new Grafopai();
grafofilho.leituraArqJSON('./utilitario/capitais.json');

// adicionar endpoint para retornar lista de capitais

// adicionar endpoint para cálculo da rota

// adicionar rota para iniciar servidor