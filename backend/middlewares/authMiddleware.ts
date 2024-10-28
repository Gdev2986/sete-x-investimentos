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
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Buscando o usuário completo do banco de dados
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Armazena o usuário completo na requisição
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware específico para verificar o role "admin"
export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (user?.role !== 'admin') {
    res.status(403).json({ error: 'Acesso restrito para administradores' });
    return;
  }

  next();
};
