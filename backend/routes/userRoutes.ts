import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware'; // Middleware de autenticação JWT

const router = express.Router();

// Criar novo usuário (POST /users) - Não precisa de autenticação
router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar todos os usuários (GET /users) - Restrito a administradores
router.get('/users', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar um usuário específico (GET /users/:id) - Protegido apenas por autenticação
router.get('/users/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Atualizar um usuário (PUT /users/:id) - Protegido apenas por autenticação
router.put('/users/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Deletar um usuário (DELETE /users/:id) - Restrito a administradores
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

export default router;
