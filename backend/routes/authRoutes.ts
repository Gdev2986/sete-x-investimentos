import { Router, Request, Response, NextFunction } from 'express';
import { login } from '../controllers/authController';
import User from '../models/user';

const router = Router();

// Rota de login
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await login(req, res);
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});

// Rota de registro
router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Dados recebidos no registro:', req.body); // Log dos dados recebidos
    const { firstName, lastName, username, email, contact, password } = req.body;

    // Verifica se o e-mail ou username já estão em uso
    const existingUser = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });

    if (existingUser || existingUsername) {
      res.status(400).json({
        message: 'E-mail ou nome de usuário já estão em uso',
      });
      return;
    }

    // Cria um novo usuário
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      contact,
      password,
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error); // Log do erro
    next(error);
  }
});


export default router;
