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
    const { name, email, password } = req.body;

    // Verifica se o e-mail já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'E-mail já está em uso' });
      return;
    }

    // Cria um novo usuário
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});

export default router;
