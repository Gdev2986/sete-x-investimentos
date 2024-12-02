import express from 'express';
import Deposit from '../models/deposit';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar um novo depósito
router.post('/', authMiddleware, async (req, res) => {
  try {
    const deposit = await Deposit.create({ ...req.body, user_id: (req as any).user.id });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar depósito', error: (error as Error).message });
  }
});

// Obter todos os depósitos (somente administradores)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deposits = await Deposit.findAll();
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar depósitos', error: (error as Error).message });
  }
});

export default router;
