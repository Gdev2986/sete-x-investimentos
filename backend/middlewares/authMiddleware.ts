import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/appConfig';
import User from '../models/user';

interface JwtPayload {
  id: string;
}

// Middleware de autenticação geral
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.header('Authorization');

  // Valida o cabeçalho Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Decodifica o token JWT
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Busca o usuário no banco
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Armazena o usuário na requisição com tipagem correta
    req.user = { id: user.id.toString(), role: user.role };
    next();
  } catch (error) {
    console.error('Erro ao validar token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;

  // Verifica se o usuário está autenticado
  if (!user) {
    res.status(401).json({ error: 'Autenticação necessária' });
    return;
  }

  // Verifica o papel do usuário
  if (user.role !== 'admin') {
    res.status(403).json({ error: 'Acesso restrito para administradores' });
    return;
  }

  next();
};
