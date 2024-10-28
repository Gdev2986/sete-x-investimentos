import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';


const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Credenciais inválidas' });
      return;
    }

    // Verificar a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciais inválidas' });
      return;
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h', // O token expira em 1 hora
    });

    // Retornar o token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: (error as Error).message });
  }
};
