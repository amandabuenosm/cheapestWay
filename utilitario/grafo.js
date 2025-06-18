const fs = require('fs');

class Grafopai {
    construtor() {
        this.vert = new Map();
    }

    // função para adicionar vértice

    // função para adicionar aresta

    leituraArqJSON(rota) {
        const dados = JSON.parse(fs.readFileSync(caminho, 'utf8'));

        for (const dadoselecionado of dados) {
            for (const cidade in dadoselecionado) {
                const { ctapedagio, vizinhos } = dadoselecionado[cidade];

                // adicionar condições de inclusão de arestas e vértices
            }
        }
    }
}