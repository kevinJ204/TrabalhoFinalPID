import conexao from '../Persistencia/Conexao.js';
import DevolucaoDAO from '../Persistencia/DevolucaoDAO.js';
import Devolucao from "../Modelo/Devolucao.js";

export default class DevolucaoCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const aluno = dados.aluno;
            const titulo = dados.titulo;
            const data = dados.data;

            if (aluno && titulo && data) {
                const dao = new DevolucaoDAO();
                const devolucao = new Devolucao(0, aluno, titulo, data, dao);

                try {
                    const connection = await conexao.getConnection();
                    await devolucao.gravar(connection);
                    resposta.status(201);
                    resposta.json({
                        "status": true,
                        "mensagem": "Devolucao gravada com sucesso!",
                        "id_devolucao": devolucao.getId()
                    });
                    connection.release(); // Release the connection back to the pool
                } catch (erro) {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível armazenar a devolucao! " + erro.message
                    });
                }
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da devolucao, conforme documentação da API"
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar devolucao!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = requisicao.params.id;
            const aluno = dados.aluno;
            const titulo = dados.titulo;
            const data = dados.data;

            if (id && id > 0 && aluno && titulo && data) {
                const dao = new DevolucaoDAO();
                const devolucao = new Devolucao(id, aluno, titulo, data, dao);

                try {
                    const connection = await conexao.getConnection();
                    await devolucao.atualizar(connection);
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Devolucao atualizada com sucesso!"
                    });
                    connection.release(); // Release the connection back to the pool
                } catch (erro) {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível atualizar a devolucao! " + erro.message
                    });
                }
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da devolucao, conforme documentação da API"
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar devolucao!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "DELETE") {
            const id = requisicao.params.id;

            if (id && id > 0) {
                const dao = new DevolucaoDAO();
                const devolucao = new Devolucao(id, null, null, null, dao);

                try {
                    const connection = await conexao.getConnection();
                    await devolucao.excluir(connection);
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Devolucao excluída com sucesso!"
                    });
                    connection.release(); // Release the connection back to the pool
                } catch (erro) {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível excluir a devolucao! " + erro.message
                    });
                }
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe o id da devolucao que deseja excluir, conforme documentação da API"
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir uma devolucao!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "GET") {
            const termoDeQuery = requisicao.params.termo || "";
            const dao = new DevolucaoDAO();

            try {
                const connection = await conexao.getConnection();
                const devolucoes = await Devolucao.consultar(connection, termoDeQuery, dao);
                resposta.status(200);
                resposta.json(devolucoes);
                connection.release(); // Release the connection back to the pool
            } catch (erro) {
                resposta.status(500);
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possível consultar as devolucoes! " + erro.message
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar as devolucoes!"
            });
        }
    }
}
