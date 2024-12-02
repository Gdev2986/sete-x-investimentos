import { Router, Request, Response, NextFunction } from 'express';
import { login } from '../controllers/authController';
import User from '../models/user';

const router: Router = Router();

// Rota de login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

// Rota de registro
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já está em uso' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    next(error);
  }
});

export default router;
