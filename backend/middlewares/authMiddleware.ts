import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/appConfig';
import User from '../models/user';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

// Middleware de autenticação geral
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');

    // Verifica se o cabeçalho Authorization foi fornecido corretamente
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
      return;
    }

    const token = authHeader.replace('Bearer ', '');

    // Decodifica o token JWT
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Busca o usuário no banco de dados pelo ID
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Adiciona o usuário à requisição
    req.user = { id: user.id.toString(), role: user.role };

    // Passa para o próximo middleware
    next();
  } catch (error) {
    console.error('Erro ao validar token:', error);
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

// Middleware de verificação de administrador
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = req.user;

    // Verifica se o usuário está autenticado
    if (!user) {
      res.status(401).json({ error: 'Autenticação necessária' });
      return;
    }

    // Verifica se o usuário é um administrador
    if (user.role !== 'admin') {
      res.status(403).json({ error: 'Acesso restrito para administradores' });
      return;
    }

    // Passa para o próximo middleware
    next();
  } catch (error) {
    console.error('Erro no adminMiddleware:', error);
    res.status(500).json({ error: 'Erro inesperado' });
  }
};

export default {
  authMiddleware,
  adminMiddleware,
};
