import DevolucaoDAO from "../Persistencia/DevolucaoDAO.js";

export default class Devolucao {
    #id;
    #aluno;
    #titulo;
    #data;

    constructor(id=0, aluno="", titulo="", data=new Date()) {
        this.#id = id;
        this.#aluno = aluno;
        this.#titulo = titulo;
        this.#data = data;
    }

    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }
    getAluno() {
        return this.#aluno;
    }
    setAluno(aluno) {
        this.#aluno = aluno;
    }
    getTitulo() {
        return this.#titulo;
    }
    setTitulo(titulo) {
        this.#titulo = titulo;
    }
    getData() {
        return this.#data;
    }
    setData(data) {
        this.#data = data;
    }

    async gravar(){
        const dao = new DevolucaoDAO();
        await dao.gravar(this); 
    }

    async atualizar(){
        const dao = new DevolucaoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new DevolucaoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new DevolucaoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    toString(){
        return `Devolucao id: ${this.#id} -  aluno: ${this.#aluno}`;
    }

    toJSON(){
        return {
            "id": this.#id,
            "aluno": this.#aluno,
            "titulo": this.#titulo,
            "data": this.#data
        }
    }
}