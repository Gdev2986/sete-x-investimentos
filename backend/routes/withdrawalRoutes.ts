import express, { Request, Response } from 'express';
import Withdrawal from '../models/withdrawal';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';
import User from '../models/user'

const router = express.Router();

// Criação de retirada pelo usuário
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, pix_key, name_account_withdrawal } = req.body;

    if (!amount || !pix_key || !name_account_withdrawal) {
      res.status(400).json({ message: 'Todos os campos são obrigatórios (valor, chave Pix e nome do titular).' });
      return;
    }

    const withdrawal = await Withdrawal.create({
      user_id: req.user?.id,
      amount,
      pix_key,
      name_account_withdrawal,
      status: 'pending',
    });

    res.status(201).json(withdrawal);
  } catch (error) {
    console.error('Erro ao criar retirada:', error);
    res.status(400).json({ message: 'Erro ao criar retirada', error: (error as Error).message });
  }
});

// Visualizar retiradas de um usuário específico (para usuários)
router.get('/user/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const withdrawals = await Withdrawal.findAll({ where: { user_id: req.user?.id } });

    if (!withdrawals.length) {
      res.status(404).json({ message: 'Nenhuma retirada encontrada para este usuário' });
      return;
    }

    res.status(200).json(withdrawals);
  } catch (error) {
    console.error('Erro ao buscar retiradas do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar retiradas do usuário', error: (error as Error).message });
  }
});

// Visualizar todas as retiradas (para admin)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const withdrawals = await Withdrawal.findAll();

    res.status(200).json(withdrawals);
  } catch (error) {
    console.error('Erro ao buscar todas as retiradas:', error);
    res.status(500).json({ message: 'Erro ao buscar retiradas', error: (error as Error).message });
  }
});

// Atualizar status de retirada (admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'approved', 'rejected'].includes(status)) {
          res.status(400).json({ message: 'Status inválido. Deve ser "pending", "approved" ou "rejected".' });
          return;
      }

      const withdrawal = await Withdrawal.findByPk(id, {
          include: [{ model: User, as: 'user' }],
      });

      if (!withdrawal) {
          res.status(404).json({ message: 'Retirada não encontrada' });
          return;
      }

      const user = withdrawal.user;
      if (!user) {
          res.status(404).json({ message: 'Usuário associado à retirada não encontrado' });
          return;
      }

      const userBalance = typeof user.balance === 'string' ? parseFloat(user.balance) : user.balance;
      const withdrawalAmount = typeof withdrawal.amount === 'string' ? parseFloat(withdrawal.amount) : withdrawal.amount;

      // Atualiza o saldo com base no fluxo de status
      if (withdrawal.status === 'pending' && status === 'approved') {
          // De 'pending' para 'approved': subtrai do saldo
          user.balance = userBalance - withdrawalAmount;
      } else if (withdrawal.status === 'approved' && status === 'rejected') {
          // De 'approved' para 'rejected': adiciona ao saldo
          user.balance = userBalance + withdrawalAmount;
      } else if (withdrawal.status === 'rejected' && status === 'approved') {
          // De 'rejected' para 'approved': subtrai novamente do saldo
          user.balance = userBalance - withdrawalAmount;
      }

      withdrawal.status = status;
      await withdrawal.save();
      await user.save();

      const updatedWithdrawal = await Withdrawal.findByPk(id, {
          include: [{ model: User, as: 'user', attributes: ['username', 'balance'] }],
      });

      res.status(200).json(updatedWithdrawal);
  } catch (error) {
      console.error('Erro ao atualizar retirada:', error);
      res.status(500).json({ message: 'Erro ao atualizar retirada', error: (error as Error).message });
  }
});

// Excluir uma retirada (admin)
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
    console.error('Erro ao excluir retirada:', error);
    res.status(500).json({ message: 'Erro ao excluir retirada', error: (error as Error).message });
  }
});

export default router;
