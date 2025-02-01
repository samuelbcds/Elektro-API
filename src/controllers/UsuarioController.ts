import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

class UsuarioController {

  public async criarUsuario(req: Request, res: Response) {
    try {
      const { nome, dataNasc, email, senha } = req.body;
      const usuario = await prisma.usuario.create({
        data: {
          nome: nome,
          dataNasc: dataNasc,
          email: email,
          senha: senha,
        },
      });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao criar usuário',
        error: String(error),
      });
    }
  }


  public async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao listar usuários',
        error: String(error),
      });
    }
  }


  public async buscarUsuarioPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id)
      const usuario = await prisma.usuario.findUnique({
        where: { id : userId },
      });

      if (!usuario) {
        res.status(404).json({
          mensagemErr: 'Usuário não encontrado',
        });
      }
      res.status(200).json(usuario);}
     catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao buscar usuário',
        error: String(error),
      });
      }
  }


  public async atualizarUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
      const usuario = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          nome: nome,
          email: email,
          senha: senha,
        },
      });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao atualizar usuário',
        error: String(error),
      });
    }
  }


  public async deletarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.usuario.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({
        mensagemErr: 'Erro ao deletar usuário',
        error: String(error),
      });
    }
  }
}

export const usuarioController = new UsuarioController();