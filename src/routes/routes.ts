import Router from 'express';
import {pedidoController}  from '../controllers/PedidoController';
import {usuarioController} from '../controllers/UsuarioController';

const router = Router();

// Rotas para Pedidos
router.post('/pedidos', pedidoController.criarPedido);
router.get('/usuarios/:usuarioId/pedidos', pedidoController.listarPedidos); 
router.put('/pedidos/:id', pedidoController.atualizarPedido); 
router.delete('/pedidos/:id', pedidoController.deletarPedido);

// Rotas para Usuários
router.post('/usuarios', usuarioController.criarUsuario); 
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId); 
router.get('/usuarios', usuarioController.listarUsuarios); 
router.put('/usuarios/:id', usuarioController.atualizarUsuario); 
router.delete('/usuarios/:id', usuarioController.deletarUsuario); 

export default router;