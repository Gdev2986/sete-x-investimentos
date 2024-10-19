import express from 'express';
import Withdrawal from '../models/withdrawal'; // Assumindo que o modelo Withdrawal já está criado
import { Request, Response } from 'express';

const router = express.Router();

// Criar uma nova retirada (POST /withdrawals)
router.post('/withdrawals', async (req: Request, res: Response) => {
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

// Pegar todas as retiradas (GET /withdrawals)
router.get('/withdrawals', async (req: Request, res: Response) => {
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

// Pegar uma retirada específica (GET /withdrawals/:id)
router.get('/withdrawals/:id', async (req: Request, res: Response) => {
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

// Atualizar uma retirada (PUT /withdrawals/:id)
router.put('/withdrawals/:id', async (req: Request, res: Response) => {
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

// Deletar uma retirada (DELETE /withdrawals/:id)
router.delete('/withdrawals/:id', async (req: Request, res: Response) => {
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
