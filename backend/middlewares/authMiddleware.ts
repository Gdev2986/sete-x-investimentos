import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/appConfig';

interface JwtPayload {
  id: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' }); // Se não houver token, retorna 401
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload; // Verifica o token com a chave secreta
    (req as any).user = decoded; // Adiciona os dados do usuário no `req` para uso futuro
    next(); // Continua para a próxima função
  } catch (error) {
    return res.status(401).send({ error: 'Invalid token' }); // Se o token for inválido, retorna 401
  }
};
