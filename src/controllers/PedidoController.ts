import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PedidoController {
  
  public async criarPedido(req: Request, res: Response){
    try {
      const { usuarioId, dataPedido, status, valor } = req.body;
      const pedido = await prisma.pedido.create({
        data: {
          usuarioId: usuarioId,
          dataPedido: dataPedido,
          status: status,
          valor: valor,
        },
      });
      res.status(201).json(pedido); 
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao criar pedido',
        error: error,
      });
    }
  }

  
  public async listarPedidos(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;
      const pedidos = await prisma.pedido.findMany({
        where: { usuarioId: parseInt(usuarioId) },
      });
      res.status(200).json(pedidos); 
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao listar pedidos',
        error: error,
      });
    }
  }

  
  public async atualizarPedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const pedido = await prisma.pedido.update({
        where: { id: parseInt(id) },
        data: { status: status },
      });
      res.status(200).json(pedido); 
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao atualizar pedido',
        error: error,
      });
    }
  }

  
  public async deletarPedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.pedido.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();

    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao deletar pedido',
        error: error,
      });
    }
  }
}

export const pedidoController = new PedidoController();