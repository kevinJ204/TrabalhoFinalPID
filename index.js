import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import cookieParser from 'cookie-parser';
import rotaDevolucao from './Rotas/rotaDevolucao.js';


const host='localhost';
const porta = 3000;

const app = express();
app.use(express.json()); 
app.use(cookieParser());

app.use((req, res, next) => {
    res.cookie('SameSite', 'None', {
        secure: true,
        sameSite: 'None'
    });
    next();
});

app.use(express.urlencoded({extended: true}));

app.use('/devolucoes',rotaDevolucao);

app.use(session({
    secret: 'chaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 1000 * 15
    }
}))

app.post('/login', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario && senha && usuario === 'Teste' && senha === 'teste') {
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/pagInicial.html');
    }
    else{
        resposta.redirect('/login.html');
    }
});

app.use(express.static(path.join(process.cwd(), 'publico')));
app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
})