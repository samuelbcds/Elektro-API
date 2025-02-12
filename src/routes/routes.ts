import Router from 'express';
import {pedidoController}  from '../controllers/PedidoController';
import {usuarioController} from '../controllers/UsuarioController';
import passport from 'passport';
import { UserValidator } from '../config/validator';
import { ResultValidator } from './ValidateResults';
import { PedidoValidator } from '../config/validator';
import { photoUpload } from '../config/uploader';
const router = Router();

// Rotas para Pedidos
router.post('/pedidos', PedidoValidator.validatePedido("create"), ResultValidator.validateResult, pedidoController.criarPedido);
router.get('/usuarios/:usuarioId/pedidos', pedidoController.listarPedidos); 
router.put('/pedidos/:id', PedidoValidator.validatePedido("update"), ResultValidator.validateResult, pedidoController.atualizarPedido); 
router.delete('/pedidos/:id', pedidoController.deletarPedido);

// Rotas para Usuários
router.post('/usuarios', UserValidator.validateUser("create"), ResultValidator.validateResult, usuarioController.criarUsuario);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.get('/usuarios', usuarioController.listarUsuarios); 
router.put('/usuarios/:id', UserValidator.validateUser("update"), ResultValidator.validateResult, usuarioController.atualizarUsuario); 
router.delete('/usuarios/:id', usuarioController.deletarUsuario);
router.get('/test',passport.authenticate("jwt", { session: false }), usuarioController.testAuthetication)
router.post('/login',usuarioController.login)
router.post('/sendEmail',usuarioController.sendEmail)

router.post('/image',photoUpload.single("image"))

export default router;