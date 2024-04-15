var urlParams = new URLSearchParams(window.location.search);
var devolucaoJSON = urlParams.get('devolucao');
var devolucao = JSON.parse(devolucaoJSON);

window.onload = function() {
    document.getElementById('devolucaoId').value = devolucao.id;
    document.getElementById('devolucaoAluno').value = devolucao.aluno;
    document.getElementById('devolucaoTitulo').value = devolucao.titulo;
    document.getElementById('devolucaoData').value = formatarData(devolucao.data);
};

function editarDevolucao() {
    const mensagem = document.getElementById('mensagem');

    if (!devolucaoJSON) {
        mensagem.innerHTML = `<p class="text-danger">ID da devolucao ausente na URL.</p>`;
        return;
    }

    const Data = document.getElementById('devolucaoData').value;

    const devolucaoAtualizado = {
        id: devolucao.id,
        aluno: document.getElementById('devolucaoAluno').value,
        titulo: document.getElementById('devolucaoTitulo').value,
        data: Data,
    };
    fetch('http://localhost:3000/devolucoes/' + devolucao.id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(devolucaoAtualizado)
    })
    .then(response => {
        if (response.ok) {
            mensagem.innerHTML = `<p class="text-success">Devolucao atualizada com sucesso!</p>`;
        } else {
            mensagem.innerHTML = `<p class="text-danger">Erro ao atualizar devolucao: ${response.status}</p>`;
        }
    })
    .catch(error => {
        mensagem.innerHTML = `<p class="text-danger">Erro ao enviar solicitação: ${error}</p>`;
    });
}
function formatarData(data) {
    const partes = data.split('/');
    
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    
    const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    
    return dataFormatada;
}
function formatarHorarioParaString(horario, data) {
    const dataDevolucao = data.split('/');
    const horarioNormal = horario.split(' ');
    const partes = horarioNormal[0].split(':');
    const hora = partes[0];
    const minutos = partes[1];
    const segundos = partes[2];

    const dataFormatada = `${dataDevolucao[2]}-${dataDevolucao[1]}-${dataDevolucao[0]}`;

    const horarioFormatado = `${hora.padStart(2, '0')}:${minutos.padStart(2, '0')}:${segundos.padStart(2, '0')}`;

    const horarioCompletoFormatado = `${dataFormatada} ${horarioFormatado}`;

    return horarioCompletoFormatado;
}