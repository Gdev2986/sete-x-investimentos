import express from 'express';
import Earning from '../models/earnings';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar um novo rendimento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const earning = await Earning.create({ ...req.body, user_id: req.user?.id });
    res.status(201).json(earning);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar rendimento', error: (error as Error).message });
  }
});

// Obter todos os rendimentos (apenas para administradores)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const earnings = await Earning.findAll();
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar rendimentos', error: (error as Error).message });
  }
});

export default router;
