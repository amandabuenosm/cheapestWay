class PrioridadeDaFila {
    constructor() {
        this.itens = [];
    }

    // adiciona os elementos conforme sua prioridade no array e realizar ordenação crescente
    enfileirar(elemento, prioridade) {
        this.itens.push({ elemento, prioridade });
        this.itens.sort((item1, item2) => item1.prioridade - item2.prioridade);
    }

    // remove o primeiro item da fila e retorna o elemento
    desenfileirar() {
        return this.itens.shift().elemento;
    }

    // se a fila for vazia, retorna true
    filavazia() {
        return this.itens.length === 0;
    }
}

module.exports = PrioridadeDaFila;