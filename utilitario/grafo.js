const fs = require('fs');

class Grafopai {
    constructor() {
        this.grafo = new Map();
        this.pedagio = new Map();
    }

    leituraArqJSON(rota) {
        const dados = JSON.parse(fs.readFileSync(rota, 'utf8'));

        for (const dadoselecionado of dados) {
            for (const cidade in dadoselecionado) {
                const { toll, neighbors } = dadoselecionado[cidade];

                this.grafo.set(cidade, []);
                this.pedagio.set(cidade, toll);

                for (const vizinhoselecionado in neighbors) {
                    this.grafo.get(cidade).push({ destino: vizinhoselecionado, distancia: neighbors[vizinhoselecionado]});
                }
            }
        }
    }
}

module.exports = Grafopai;