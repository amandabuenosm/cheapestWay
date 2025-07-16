const fs = require('fs');

class Grafopai {
    constructor() {
        // armazenar conexões entre as cidades + valores dos pedágios
        this.grafo = new Map();
        this.pedagio = new Map();
    }

    // função de leitura do arquivo JSON
    leituraArqJSON(rota) {
        const dados = JSON.parse(fs.readFileSync(rota, 'utf8'));

        for (const dadoselecionado of dados) {
            for (const cidade in dadoselecionado) {
                const { toll, neighbors } = dadoselecionado[cidade];

                // iniciar lista de cidades vizinhas e gravar valor do pedágio
                this.grafo.set(cidade, []);
                this.pedagio.set(cidade, toll);

                // adicionar cidades vizinhas com suas distâncias
                for (const vizinhoselecionado in neighbors) {
                    this.grafo.get(cidade).push({ destino: vizinhoselecionado, distancia: neighbors[vizinhoselecionado]});
                }
            }
        }
    }
}

module.exports = Grafopai;