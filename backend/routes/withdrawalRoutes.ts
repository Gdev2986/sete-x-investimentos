import express from 'express';
import Withdrawal from '../models/withdrawal';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar uma nova retirada
router.post('/', authMiddleware, async (req, res) => {
  try {
    const withdrawal = await Withdrawal.create({ ...req.body, user_id: (req as any).user.id });
    res.status(201).json(withdrawal);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar retirada', error: (error as Error).message });
  }
});

// Obter todas as retiradas (somente administradores)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.findAll();
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar retiradas', error: (error as Error).message });
  }
});

export default router;
