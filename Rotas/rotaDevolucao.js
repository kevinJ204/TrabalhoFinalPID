
import { Router } from 'express';
import DevolucaoCtrl from '../Controles/devolucaoCtrl.js';

const rotaDevolucao = new Router();
const devCtrl = new DevolucaoCtrl();

rotaDevolucao
.get('/', devCtrl.consultar)
.get('/:termo', devCtrl.consultar)
.post('/', devCtrl.gravar)
.put('/:id', devCtrl.atualizar)
.patch('/:id', devCtrl.atualizar)
.delete('/:id', devCtrl.excluir);


export default rotaDevolucao;