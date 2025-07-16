// listagem das capitais no datalist
fetch('/capitais')
    .then(res => res.json())
    .then(dados => {
        const datalist = document.getElementById('capitais');
        dados.forEach(cidade => {
            const opcao = document.createElement('option');
            opcao.value = cidade;
            datalist.appendChild(opcao);
        });
    });

// dados do formulário
document.getElementById('formulario-rotas').addEventListener('submit', async (e) => {
    e.preventDefault();
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    const precoComb = parseFloat(document.getElementById('precoComb').value);
    const autonomia = parseFloat(document.getElementById('autonomia').value);

    const res = await fetch('/calculo-rota', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ origem, destino, precoComb, autonomia })
    });

    const dados = await res.json();
    const result = document.getElementById('resultFormula');

    if (!dados.percurso || dados.percurso.length < 2) {
        result.innerHTML = '<p class="error">Rota Inexistente</p>';
    } else {
        result.innerHTML = `
            <p><strong>Rota: </strong> ${dados.percurso.join(' => ')}</p>
            <p><strong>Pedágio Total </strong> ${dados.pedagioTotal.toFixed(2)}</p>
            <p><strong>Custo Total da Viagem: </strong> ${dados.total.toFixed(2)}</p>
        `;
    }
});