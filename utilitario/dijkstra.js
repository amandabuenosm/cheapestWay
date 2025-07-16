const PrioridadeDaFila = require('./ordem');

function menorCaminho(grafo, pedagio, origem, destino, precogasolina, autonomia) {
    // armazenamento de custo até cada cidade {listadistancias} e o caminho percorrido {nosAnteriores}, 
    // além de evitar processar a mesma cidade {nosVisitados} e considerar a prioridade {fila}
    const listadistancias = new Map();
    const nosAnteriores = new Map();
    const nosVisitados = new Set();
    const fila = new PrioridadeDaFila();

    // inicializar a distância com infinito
    for (const cidade of grafo.keys()) {
        listadistancias.set(cidade, Infinity);
    } // cidade de origem e sua distância para ela mesmo igual a 0
    listadistancias.set(origem, 0);
    fila.enfileirar(origem, 0);

    while (!fila.filavazia()) {
        const noAtual = fila.desenfileirar(); // cidade de menor custo

        // ignora e identifica se a cidade já foi visitada, encerrar se chegar ao destino
        if (nosVisitados.has(noAtual)) continue;
        nosVisitados.add(noAtual);
        if (noAtual === destino) break; 

        // verificar os vizinhos da cidade atual, calcula os custos de gasolina e pedágio 
        for (let vizinho of grafo.get(noAtual)) {
            const valorGasolina = (vizinho.distancia / autonomia) * precogasolina;
            const pedagioIntermediario = pedagio.get(vizinho.destino) || 0;
            const novoCusto = listadistancias.get(noAtual) + valorGasolina + pedagioIntermediario;

            // se o caminho for melhor, o custo atualiza
            if (novoCusto < listadistancias.get(vizinho.destino)) {
                listadistancias.set(vizinho.destino, novoCusto);
                nosAnteriores.set(vizinho.destino, noAtual);
                fila.enfileirar(vizinho.destino, novoCusto);
            }
        }
    }

    // // não chegou ao destino
    if (!nosAnteriores.has(destino)) {
        return { percurso: [], custo: Infinity };
    }

    // reconstruir o caminho de trás para frente para retornar o caminho, custo e rota
    let percurso = [];
    let atual = destino;
    while (atual) {
        percurso.unshift(atual);
        atual = nosAnteriores.get(atual);
    }

    return { percurso, custo: listadistancias.get(destino), nosAnteriores };
}

module.exports = menorCaminho;
