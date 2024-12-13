import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar um novo usuário
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password, first_name, last_name, contact } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'E-mail já está em uso' });
      return;
    }

    const user = await User.create({ username, email, password, first_name, last_name, contact });
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
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact: user.contact,
      totalAlocado: user.total_allocated,
      saldoAtual: user.balance,
      permissao: user.role,
    }));

    res.status(200).json(transformedUsers);
  } catch (error) {
    next(error);
  }
});

// Obter um único usuário por ID
router.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
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
    const id = Number(req.params.id); // Convertemos o parâmetro para número
    const { username, email, password, first_name, last_name, contact } = req.body;

    // Garantir que `req.user?.id` seja convertido corretamente antes da comparação
    if (Number(req.user?.id) !== id && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Permissão negada' });
      return;
    }

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Atualizamos somente os campos que foram enviados na requisição
    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.first_name = first_name ?? user.first_name;
    user.last_name = last_name ?? user.last_name;
    user.contact = contact ?? user.contact;

    await user.save();

    res.status(200).json({ message: 'Informações atualizadas com sucesso', user });
  } catch (error) {
    next(error);
  }
});


// Atualizar o saldo de um usuário
router.put('/:id/balance', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { total_allocated, balance } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    if (total_allocated !== undefined) user.total_allocated = total_allocated;
    if (balance !== undefined) user.balance = balance;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao atualizar saldo do usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar saldo do usuário', error: (error as Error).message });
  }
});

// Atualizar a role de um usuário
router.patch('/:id/role', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Permissão atualizada com sucesso', user });
  } catch (error) {
    next(error);
  }
});

// Excluir um usuário (apenas administradores)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Number(req.params.id);

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
