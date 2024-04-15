document.cookie = "nomeDoCookie=valorDoCookie; SameSite=None; Secure";
function cadastrarDevolucao() {
    const mensagem = document.getElementById('mensagem');
    let verificacao = '';
    const Data = document.getElementById('data').value;
    const devolucao = {
        aluno: document.getElementById('aluno').value,
        titulo: document.getElementById('titulo').value,
        data: formatarData(Data)
    };
    if (!(devolucao.aluno && devolucao.titulo && devolucao.data)) {
        if (!devolucao.aluno) {
            verificacao +=
                    `<div>
                        <p class="text-danger">Por favor, informe o aluno para devolucao!</p>
                    </div>`;
        }
        if (!devolucao.titulo) {
            verificacao +=
                    `<div>
                        <p class="text-danger">Por favor, informe o titulo para devolucao!</p>
                    </div>`;
        }
        if (!devolucao.data) {
            verificacao +=
                    `<div>
                        <p class="text-danger">Por favor, informe a data para devolucao!</p>
                    </div>`;
        }
        mensagem.innerHTML = verificacao;
    }
    else {
        fetch('http://localhost:3000/devolucoes/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(devolucao)
        })
        .then(response => {
            if (response.ok) {
                mensagem.innerHTML = `<p class="text-success">Devolucao criada com sucesso!</p>`;
            } else {
                mensagem.innerHTML = `<p class="text-danger">Erro ao atualizar devolucao: ${response.status}</p>`;
            }
        })
        .catch(error => {
            mensagem.innerHTML = `<p class="text-danger">Erro ao enviar solicitação: ${error}</p>`;
        });    
    }
}
function formatarData(data) {
    if (data === "") {
        return ""
    } else {
        const partes = data.split('-');
        
        const dia = partes[2];
        const mes = partes[1];
        const ano = partes[0];
        
        const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')} 00:00:00`;
        
        return dataFormatada;
    }
}
