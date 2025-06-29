const PrioridadeDaFila = require('./ordem');

function calculoCustoViagem(distancia, precogasolina, autonomia, pedagio) {
    const custogasolina = (distancia / autonomia) * precogasolina;
    return custogasolina + pedagio;
}

function codeDijkstra(grafofilho, origem, destino, precogasolina, autonomia) {
    const listadistancias = new Map();
    const nosAnteriores = new Map();
    const nosVisitados = new Set();
    const fila = new PrioridadeDaFila();

    // iniciar distâncias
    for (const cidadeselecionada of grafofilho.vert.keys()) {
        listadistancias.set(cidadeselecionada, Infinity);
        nosAnteriores.set(cidadeselecionada, null);
    }

    listadistancias.set(origem, 0);
    fila.enfileirar(origem, 0);

    while(!fila.filavazia()) {
        const noAtual = fila.desenfileirar();
        if (nosVisitados.has(noAtual)) continue;
        nosVisitados.add(noAtual);

        if (!grafofilho.vert.has(noAtual)) continue;
        const { vizinhanca } = grafofilho.vert.get(noAtual);

        for (const [vizinhoselecionado, distancia] of vizinhanca) {
            const custoAcalcular = calculoCustoViagem(distancia, precogasolina, autonomia, grafofilho.vert.get(vizinhoselecionado).pedagio);
            const novadistancia = listadistancias.get(noAtualatual) + custoAcalcular;

            if (novadistancia < listadistancias.get(vizinhoselecionado)) {
                listadistancias.set(vizinhoselecionado, novadistancia);
                nosAnterioreseriores.set(vizinhoselecionado, noAtualtual);
                fila.enfileirar(vizinhoselecionado, novadistancia);
            }
        }
    }

    // criar o caminho final
}

module.exports = codeDijkstra;