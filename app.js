const express = require('express');
const fs = require('fs');
const Grafopai = require('./utilitario/grafo');
const menorCaminho = require('./utilitario/dijkstra');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const grafoCapitais = new Grafopai();
grafoCapitais.leituraArqJSON('./utilitario/capitais.json');

async function calculoRota(origem, destino, precoComb, autonomia) {
    const { percurso } = menorCaminho(grafoCapitais.grafo, grafoCapitais.pedagio, origem, destino, precoComb, autonomia);

    // não encontrou o caminho
    if (percurso.length === 0) {
        return { percurso: [] };
    }

    // inicializar variáveis para somar os custos
    let KMdistancia = 0;
    let gasolinaTotal = 0;
    let pedagioTotal = 0;

    // calcular distânca, gasolina e pedágios no caminho
    for (let i = 0; i < percurso.length - 1; i++) {
        const cidadeAtual = percurso[i];
        const proximo = percurso[i + 1];
        const trecho = grafoCapitais.grafo.get(cidadeAtual).find(viz => viz.destino === proximo);

        KMdistancia += trecho.distancia;
        gasolinaTotal += (trecho.distancia / autonomia) * precoComb;

        // cálculo dos pedágios intermediários
        if (i > 0 && i < percurso.length - 1) {
            pedagioTotal += grafoCapitais.pedagio.get(cidadeAtual) || 0;
        }
    } return { percurso, KMdistancia, gasolinaTotal, pedagioTotal, total: gasolinaTotal + pedagioTotal };
}

// endpoint para retornar lista de capitais
app.get('/capitais', (req, res) => {
    res.json(Array.from(grafoCapitais.grafo.keys()));
})

// endpoint para receber parâmetros e retornar resultados do cálculo da rota
app.post('/calculo-rota', async (req, res) => {
    const {origem, destino, precoComb, autonomia} = req.body;
    const result = await calculoRota (origem, destino, precoComb, autonomia);
    res.json(result);
})

app.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000');
});