const express = require('express');
const fs = require('fs');
const Grafopai = require('./utilitario/grafo');
const menorCaminho = require('./utilitario/dijkstra');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const grafoCapitais = new Grafopai();
grafoCapitais.leituraArqJSON('./utilitario/capitais.json');

// criar o caminho final
async function calculoRota(origem, destino, precoComb, autonomia) {
    const { nosAnteriores } = menorCaminho(grafoCapitais.grafo, grafoCapitais.pedagio, origem, destino, precoComb, autonomia);

    if (!nosAnteriores.has(destino)) {
        return { percurso: [] };
    }

    let percurso = [];
    let atual = destino;
        
    while (atual) {
        percurso.unshift(atual);
        atual = nosAnteriores.get(atual);
    }

    let KMdistancia = 0;
    let gasolinaTotal = 0;
    let pedagioTotal = 0;

    for (let i = 0; i < percurso.length - 1; i++) {
        const cidadeAtual = percurso[i];
        const proximo = percurso[i + 1];
        const trecho = grafoCapitais.grafo.get(cidadeAtual).find(viz => viz.destino === proximo);

        KMdistancia += trecho.distancia;
        gasolinaTotal += (trecho.distancia / autonomia) * precoComb;

        if (i > 0 && i < percurso.length - 1) {
        pedagioTotal += grafoCapitais.pedagio.get(cidadeAtual) || 0;
        }
    } return { percurso, KMdistancia, gasolinaTotal, pedagioTotal, total: gasolinaTotal + pedagioTotal };
}

// adicionar endpoint para retornar lista de capitais
app.get('/capitais', (req, res) => {
    res.json(Array.from(grafoCapitais.grafo.keys()));
})

// adicionar endpoint para cálculo da rota
app.post('/calculo-rota', async (req, res) => {
    const {origem, destino, precoComb, autonomia} = req.body;
    const result = await calculoRota (origem, destino, precoComb, autonomia);
    res.json(result);
})

// rota para iniciar servidor
app.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000');
});