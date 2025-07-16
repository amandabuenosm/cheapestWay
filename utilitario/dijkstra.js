const PrioridadeDaFila = require('./ordem');

function menorCaminho(grafo, pedagio, origem, destino, precogasolina, autonomia) {
    const listadistancias = new Map();
    const nosAnteriores = new Map();
    const nosVisitados = new Set();
    const fila = new PrioridadeDaFila();

    for (const cidade of grafo.keys()) {
        listadistancias.set(cidade, Infinity);
    }
    listadistancias.set(origem, 0);
    fila.enfileirar(origem, 0);

    while (!fila.filavazia()) {
        const noAtual = fila.desenfileirar();

        if (nosVisitados.has(noAtual)) continue;
        nosVisitados.add(noAtual);

        if (noAtual === destino) break;

        for (let vizinho of grafo.get(noAtual)) {
            const valorGasolina = (vizinho.distancia / autonomia) * precogasolina;
            const pedagioIntermediario = pedagio.get(vizinho.destino) || 0;
            const novoCusto = listadistancias.get(noAtual) + valorGasolina + pedagioIntermediario;

            if (novoCusto < listadistancias.get(vizinho.destino)) {
                listadistancias.set(vizinho.destino, novoCusto);
                nosAnteriores.set(vizinho.destino, noAtual);
                fila.enfileirar(vizinho.destino, novoCusto);
            }
        }
    }

    if (!nosAnteriores.has(destino)) {
        return { percurso: [], custo: Infinity };
    }

    let percurso = [];
    let atual = destino;
    while (atual) {
        percurso.unshift(atual);
        atual = nosAnteriores.get(atual);
    }

    return { percurso, custo: listadistancias.get(destino), nosAnteriores };
}

module.exports = menorCaminho;
