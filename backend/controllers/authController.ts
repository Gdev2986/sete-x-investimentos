import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import config from '../config/appConfig';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validar se email e senha foram fornecidos
  if (!email || !password) {
    res.status(400).json({ message: 'Email e senha são obrigatórios' });
    return;
  }

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
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    // Retornar o token e algumas informações do usuário
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error); // Log para depuração
    res.status(500).json({ message: 'Erro no servidor', error: (error as Error).message });
  }
};
