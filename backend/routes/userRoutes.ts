import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar um novo usuário (apenas para testes)
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'E-mail já está em uso' });
      return;
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    next(error);
  }
});

// Obter todos os usuários (apenas administradores)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.findAll();
    
    const transformedUsers = users.map(user => ({
      id: user.id,
      nome: user.name,
      email: user.email,
      contato: '',
      totalAlocado: 0,
      saldoAtual: user.balance
    }));

    res.status(200).json(transformedUsers);
  } catch (error) {
    next(error);
  }
});

// Obter um único usuário por ID
router.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Atualizar informações de um usuário
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (req.user?.id !== id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Permissão negada' });
      return;
    }

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    res.status(200).json({ message: 'Informações atualizadas com sucesso', user });
  } catch (error) {
    next(error);
  }
});

// Excluir um usuário (apenas administradores)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    next(error);
  }
});

// Alterar role de um usuário (apenas administradores)
router.patch('/:id/role', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Role do usuário atualizado com sucesso', user });
  } catch (error) {
    next(error);
  }
});

// Obter perfil do usuário autenticado
router.get('/profile', authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
