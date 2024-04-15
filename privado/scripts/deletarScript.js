window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var devolucaoJSON = urlParams.get('devolucao');
    var devolucao = JSON.parse(devolucaoJSON);
    document.getElementById('devolucaoId').value = devolucao.id;
    document.getElementById('devolucaoAluno').value = devolucao.aluno;
    document.getElementById('devolucaoTitulo').value = devolucao.titulo;
    document.getElementById('devolucaoData').value = devolucao.data;
};
function deletarDevolucao() {
    var devolucaoId = document.getElementById('devolucaoId').value;

    fetch('http://localhost:3000/devolucoes/' + devolucaoId, {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" }
    })
    .then(response => {
        if (response.ok) {
            mensagem.innerHTML = `<p class="text-success">Devolucao deletada com sucesso!</p>`
        } else {
            mensagem.innerHTML = `<p class="text-danger">Erro ao deletar devolucao: ${response.status}</p>`
        }
    })
    .catch(error => {
        mensagem.innerHTML = `<p class="text-danger">Erro ao enviar solicitação: ${error}</p>`
    });
}
