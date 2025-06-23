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
app.get('/capitais', (req, res) => {
    const listadecidades = Array.from(grafofilho.vert.keys());
    res.json(listadecidades);
})

// adicionar endpoint para cálculo da rota
app.post('/calculo-rota', (req, res) => {
    const {origem, destino, precogasolina, autonomia} = req.body;

    const result = dijkstra(grafofilho, origem, destino, precogasolina, autonomia);
    res.json(result);
})

// adicionar rota para iniciar servidor