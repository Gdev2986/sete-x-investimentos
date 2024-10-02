import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/appConfig';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Compara a senha
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);  // Passa o erro para o middleware de tratamento de erros
  }
};
