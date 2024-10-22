import express from 'express';
import Withdrawal from '../models/withdrawal'; // Modelo de Withdrawal
import { authMiddleware } from '../middlewares/authMiddleware'; // Middleware de autenticação
import { Request, Response } from 'express';

const router = express.Router();

// Criar nova retirada (POST /withdrawals) - Protegido por autenticação
router.post('/withdrawals', authMiddleware, async (req: Request, res: Response) => {
  try {
    const withdrawal = await Withdrawal.create(req.body);
    res.status(201).json(withdrawal);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar todas as retiradas (GET /withdrawals) - Protegido por autenticação
router.get('/withdrawals', authMiddleware, async (req: Request, res: Response) => {
  try {
    const withdrawals = await Withdrawal.findAll();
    res.status(200).json(withdrawals);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar uma retirada específica (GET /withdrawals/:id) - Protegido por autenticação
router.get('/withdrawals/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const withdrawal = await Withdrawal.findByPk(req.params.id);
    if (withdrawal) {
      res.status(200).json(withdrawal);
    } else {
      res.status(404).json({ message: 'Retirada não encontrada' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Atualizar uma retirada (PUT /withdrawals/:id) - Protegido por autenticação
router.put('/withdrawals/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const withdrawal = await Withdrawal.findByPk(req.params.id);
    if (withdrawal) {
      await withdrawal.update(req.body);
      res.status(200).json(withdrawal);
    } else {
      res.status(404).json({ message: 'Retirada não encontrada' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Deletar uma retirada (DELETE /withdrawals/:id) - Protegido por autenticação
router.delete('/withdrawals/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const withdrawal = await Withdrawal.findByPk(req.params.id);
    if (withdrawal) {
      await withdrawal.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Retirada não encontrada' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

export default router;
