const express = require('express');
const fs = require('fs');
const Grafopai = require('./utilitario/grafo');
const dijkstra = require('./utilitario/dijkstra');

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
    const {origem, destino, precoComb, autonomia} = req.body;
precoComb
    const result = dijkstra(grafofilho, origem, destino, precoComb, autonomia);
    console.log(result);

    res.json(result);
})

// rota para iniciar servidor
app.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000');
});