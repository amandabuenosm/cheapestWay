class PrioridadeDaFila {
    constructor() {
        this.itens = [];
    }

    enfileirar(elemento, prioridade) {
        this.itens.push({ elemento, prioridade });
        this.itens.sort((item1, item2) => item1.prioridade - item2.prioridade);
    }

    desenfileirar() {
        return this.itens.shift().elemento;
    }

    filavazia() {
        return this.itens.length === 0;
    }
}

module.exports = PrioridadeDaFila;