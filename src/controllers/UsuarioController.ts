import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../config/auth';
import { Mailer } from '../config/mailer';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

class UsuarioController {

  public async criarUsuario(req: Request, res: Response) {

    const { nome, dataNasc, email, senha} = req.body;
    const { hash, salt } = auth.generatePassword(senha);

    try {
      const usuario = await prisma.usuario.create({
        data: {
          nome: nome,
          dataNasc: dataNasc,
          email: email,
          hash : hash,
          salt: salt
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
    const {hash, salt} = auth.generatePassword(senha)
    try {
      const usuario = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          nome: nome,
          email: email,
          hash,
          salt
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
  public async login(request: Request, response: Response) {


    try {
        
        const {email, senha} = request.body;

        const user = await prisma.usuario.findUnique({
            where:{ email: email}
        });

        if(!user)
            response.status(400).json({message:"usuário não existe"})

        const {hash, salt} = user as {hash: string, salt: string}

        if(!auth.checkPassword(senha, hash, salt)){
            response.status(400).json({message:"Senha incorreta"})
        }
        const token = auth.generateJWT(user);

        response.status(201).json({message:"Token enviado" ,token: token})

    } catch (error) {
        response.status(500).json({message: "Server Error"})

    }}

  public async testAuthetication(request : Request , response : Response){
    const email = request.user

    if(!email){
      response.status(401).json({message: "Acesso não autorizado"})
    }

    response.status(201).json({message: "Acesso autorizado!", email})
  }

  public async sendEmail(request: Request, response: Response) {
    const { recipient, subject, message } = request.body;

    try {
      Mailer.sendEmail(recipient, subject, message);
      response.status(201).json({ message: 'Email sent' });
    } catch (error) {
      response.status(500).json({ message: 'Server Error', error });
    }
  }
}
export const usuarioController = new UsuarioController();