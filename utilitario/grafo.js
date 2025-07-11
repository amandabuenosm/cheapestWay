const fs = require('fs');

class Grafopai {
    constructor() {
        this.vert = new Map();
    }

    // função para adicionar vértice
    adicionaVert(nome, pedagio) {
        this.vert.set(nome, { pedagio, vizinhos: new Map() });
    }

    // função para adicionar aresta
    adicionaAresta(origemviagem, destinoviagem, distancia) {
        this.vert.get(origemviagem).vizinhos.set(destinoviagem, distancia);
        this.vert.get(destinoviagem).vizinhos.set(origemviagem, distancia);
    }

    leituraArqJSON(rota) {
        const dados = JSON.parse(fs.readFileSync(rota, 'utf8'));

        for (const dadoselecionado of dados) {
            for (const cidade in dadoselecionado) {
                const { toll, neighbors } = dadoselecionado[cidade];
                
                if (!this.vert.has(cidade)) {
                    this.adicionaVert(cidade, toll);
                }

                for (const vizinhoselecionado in neighbors) {
                    if (!this.vert.has(vizinhoselecionado)) {
                        this.adicionaVert(vizinhoselecionado, 0);
                    }
                    this.adicionaAresta(cidade, vizinhoselecionado, neighbors[vizinhoselecionado]);
                }
            }
        }
    }

    exibicao() {
        for (const [cidade, informacoes] of this.vert) {
            console.log(`${cidade} (Pedágio total: R$${informacoes.pedagio}) ->`);
            for (const [vizinhoselecionado, distancia] of informacoes.vizinhos) {
                console.log(`   - ${vizinhoselecionado} (${distancia} km)`);
            }
        }
    }
}

module.exports = Grafopai;