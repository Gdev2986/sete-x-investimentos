import express from 'express';
import Deposit from '../models/deposit'; // Assumindo que o modelo de Deposit já está criado
import { Request, Response } from 'express';

const router = express.Router();

// Criar um novo depósito (POST /deposits)
router.post('/deposits', async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.create(req.body);
    res.status(201).json(deposit);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar todos os depósitos (GET /deposits)
router.get('/deposits', async (req: Request, res: Response) => {
  try {
    const deposits = await Deposit.findAll();
    res.status(200).json(deposits);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar um depósito específico (GET /deposits/:id)
router.get('/deposits/:id', async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      res.status(200).json(deposit);
    } else {
      res.status(404).json({ message: 'Depósito não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Atualizar um depósito (PUT /deposits/:id)
router.put('/deposits/:id', async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      await deposit.update(req.body);
      res.status(200).json(deposit);
    } else {
      res.status(404).json({ message: 'Depósito não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Deletar um depósito (DELETE /deposits/:id)
router.delete('/deposits/:id', async (req: Request, res: Response) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      await deposit.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Depósito não encontrado' });
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
