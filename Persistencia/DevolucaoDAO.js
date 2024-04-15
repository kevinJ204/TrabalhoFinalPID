import conectar from './Conexao.js';
import Devolucao from '../Modelo/Devolucao.js';

export default class DevolucaoDAO {
    async gravar(devolucao){
        if (devolucao instanceof Devolucao){
            const conexao = await conectar();
            const sql = `INSERT INTO devolucao (aluno, titulo, data) values (?, ?, ?)`;
            const parametros = [
                devolucao.getAluno(),
                devolucao.getTitulo(),
                devolucao.getData()
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            devolucao.setId(resultados.insertId);
        }
    }

    async atualizar(devolucao){
        if (devolucao instanceof Devolucao){
            const conexao = await conectar();
            const sql = `UPDATE devolucao SET aluno = ?,
                         titulo = ?, data = ? WHERE id = ?`;
            const parametros = [
                devolucao.getAluno(),
                devolucao.getTitulo(),
                devolucao.getData(),
                devolucao.getId()
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(devolucao){
        if (devolucao instanceof Devolucao){
            const conexao = await conectar();
            const sql = `DELETE FROM devolucao WHERE id = ?`;
            const parametros = [
                devolucao.getId()
            ]
            await conexao.execute(sql,parametros);
        }
    }
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(parseInt(termoDePesquisa))){
            sql = `SELECT * FROM devolucao WHERE aluno LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM devolucao WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        let listaDevolucoes = [];
        for (const registro of registros){
            const devolucao = new Devolucao(
                registro.id,
                registro.aluno,
                registro.titulo,
                registro.data.toLocaleDateString('pt-BR')
            );
            listaDevolucoes.push(devolucao);
        }
        return listaDevolucoes;
    }
}