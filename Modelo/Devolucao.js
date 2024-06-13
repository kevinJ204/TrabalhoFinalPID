export default class Devolucao {
    constructor(id, aluno, titulo, data, dao) {
        this.id = id;
        this.aluno = aluno;
        this.titulo = titulo;
        this.data = data;
        this.dao = dao;
    }

    getId() {
        return this.id;
    }

    getAluno() {
        return this.aluno;
    }

    getTitulo() {
        return this.titulo;
    }

    getData() {
        return this.data;
    }

    setId(id) {
        this.id = id;
    }

    async gravar(conexao) {
        await this.dao.gravar(conexao, this);
    }

    async atualizar(conexao) {
        await this.dao.atualizar(conexao, this);
    }

    async excluir(conexao) {
        await this.dao.excluir(conexao, this);
    }

    static async consultar(conexao, termoDePesquisa, dao) {
        return await dao.consultar(conexao, termoDePesquisa);
    }
}
