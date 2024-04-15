const div = document.getElementById('containerDevolucoes');

function consultarDevolucoes(termo) {
    div.innerHTML = '';

    fetch('http://localhost:3000/devolucoes/' + termo, {
        method: "GET",
        headers: { 'Content-Type': "application/json" }
    })
    .then(response => response.json())
    .then(devolucao => {
        let conteudo = '<div class="row">';
        
        devolucao.forEach(devolucao => {
            conteudo += `
            <div class="col-md-6">
                <div class="card mb-3" style="background-color: #001F3F; color: #f8f9fa;">
                    <div class="card-body">
                        <h2 class="card-title">${devolucao.aluno}</h2>
                        <h4 class="card-subtitle mb-2">${devolucao.titulo}</h4>
                        <p class="card-text">${devolucao.data}</p>
                        <button class="btn btn-dark editarBtn${devolucao.id}" style="background-color: #6C757D; border-color: #6C757D;">Editar</button>
                        <button class="btn btn-dark deletarBtn${devolucao.id}" style="background-color: #6C757D; border-color: #6C757D;">Deletar</button>
                    </div>
                </div>
            </div>`;
        });

        conteudo += '</div>';
        div.insertAdjacentHTML('beforeend', conteudo);

        devolucao.forEach(devolucao => {
            const editarBtn = div.querySelector('.editarBtn' + devolucao.id);
            const deletarBtn = div.querySelector('.deletarBtn' + devolucao.id);

            editarBtn.addEventListener('click', () => editarDevolucao(devolucao));
            deletarBtn.addEventListener('click', () => deletarDevolucao(devolucao));
        });
    })
    .catch(error => console.error('Erro ao consultar devolucao:', error));
}

function editarDevolucao(devolucao) {
    window.location.href = 'editar.html?devolucao=' + encodeURIComponent(JSON.stringify(devolucao));
}

function deletarDevolucao(devolucao) {
    window.location.href = 'deletar.html?devolucao=' + encodeURIComponent(JSON.stringify(devolucao));
}
