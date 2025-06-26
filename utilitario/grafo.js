const fs = require('fs');

class Grafopai {
    construtor() {
        this.vert = new Map();
    }

    // função para adicionar vértice
    adicionaVert(nome, custopedagio) {
        this.vert.set(nome, { custopedagio, vizinhos: new Map() });
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
                const { ctapedagio, vizinhanca } = dadoselecionado[cidade];
                this.adicionaVert(cidade, ctapedagio);

                // adicionar condições de inclusão de arestas e vértices
                for (const vizinhoselecionado in vizinhanca) {
                    this.adicionaVert(vizinhoselecionado, 0);
                    this.adicionaAresta(cidade, vizinhoselecionado, vizinhanca[vizinhoselecionado]);
                }
            }
        }
    }

    // adicionar função de exibição do pedágio
    exibicao() {
        for (const [cidade, informacoes] of this.vert) {
            console.log(`${cidade} (Pedágio total: R$${informacoes.custopedagio}) ->`);
            for (const [vizinhoselecionado, distancia] of informacoes.vizinhanca) {
                console.log(`   - ${vizinhoselecionado} (${distancia} km)`);
            }
        }
    }
}

module.exports = Grafopai;