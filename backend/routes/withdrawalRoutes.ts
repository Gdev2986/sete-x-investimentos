import express, { Request, Response } from 'express';
import Withdrawal from '../models/withdrawal';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar uma nova retirada
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const withdrawal = await Withdrawal.create({ ...req.body, user_id: req.user?.id });
    res.status(201).json(withdrawal);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar retirada', error: (error as Error).message });
  }
});

// Obter todas as retiradas (apenas para administradores)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const withdrawals = await Withdrawal.findAll();
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar retiradas', error: (error as Error).message });
  }
});

// Obter retiradas de um usuário específico (autenticado)
router.get('/user/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const withdrawals = await Withdrawal.findAll({ where: { user_id: id } });

    if (!withdrawals.length) {
      res.status(404).json({ message: 'Nenhuma retirada encontrada para este usuário' });
      return;
    }

    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar retiradas do usuário', error: (error as Error).message });
  }
});

// Atualizar uma retirada (apenas para administradores)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const withdrawal = await Withdrawal.findByPk(id);
    if (!withdrawal) {
      res.status(404).json({ message: 'Retirada não encontrada' });
      return;
    }

    withdrawal.status = status || withdrawal.status;
    await withdrawal.save();

    res.status(200).json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar retirada', error: (error as Error).message });
  }
});

// Excluir uma retirada (apenas para administradores)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const withdrawal = await Withdrawal.findByPk(id);
    if (!withdrawal) {
      res.status(404).json({ message: 'Retirada não encontrada' });
      return;
    }

    await withdrawal.destroy();
    res.status(200).json({ message: 'Retirada excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir retirada', error: (error as Error).message });
  }
});

export default router;
