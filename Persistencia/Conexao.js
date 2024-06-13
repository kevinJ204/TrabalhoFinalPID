import mysql from 'mysql2/promise';

class Conexao {
    constructor() {
        if (!Conexao.instance) {
            this.pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'O123456K',
                port: 3306,
                database: 'backend',
                waitForConnections: true,
                connectionLimit: 10,
                maxIdle: 10,
                idleTimeout: 360000,
                queueLimit: 0,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0,
                });
            Conexao.instance = this;
        }
        return Conexao.instance;
    }
    async getConnection() {
        return await this.pool.getConnection();
    }
}
const instanciaConexao = new Conexao();
Object.freeze(instanciaConexao);
export default instanciaConexao;