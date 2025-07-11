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
    for (const cidade of grafofilho.vert.keys()) {
        listadistancias.set(cidade, Infinity);
        nosAnteriores.set(cidade, null);
    }

    listadistancias.set(origem, 0);
    fila.enfileirar(origem, 0);

    while(!fila.filavazia()) {
        const noAtual = fila.desenfileirar();
        if (nosVisitados.has(noAtual)) continue;
        nosVisitados.add(noAtual);

        if (!grafofilho.vert.has(noAtual)) continue;
        const { vizinhos } = grafofilho.vert.get(noAtual);

        for (const [vizinho, distancia] of vizinhos) {
            const custoAcalcular = calculoCustoViagem(distancia, precogasolina, autonomia, grafofilho.vert.get(noAtual).pedagio);

            const novadistancia = listadistancias.get(noAtual) + custoAcalcular;

            if (novadistancia < listadistancias.get(vizinho)) {
                listadistancias.set(vizinho, novadistancia);
                nosAnteriores.set(vizinho, noAtual);
                fila.enfileirar(vizinho, novadistancia);
            }
        }
    }

    // criar o caminho final
    const percurso = [];
    let atual = destino;

    if (listadistancias.get(destino) === Infinity) {
        return { percurso: [], custoAcalcular: Infinity };
    }

    while (atual) {
        percurso.unshift(atual);
        atual = nosAnteriores.get(atual);
    }

    return { percurso, custoAcalcular: listadistancias.get(destino) };
}

module.exports = codeDijkstra;