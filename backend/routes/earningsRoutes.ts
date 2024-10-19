import express from 'express';
import Earnings from '../models/earnings'; // Assumindo que o modelo Earnings já está criado
import { Request, Response } from 'express';

const router = express.Router();

// Criar novo rendimento (POST /earnings)
router.post('/earnings', async (req: Request, res: Response) => {
  try {
    const earnings = await Earnings.create(req.body);
    res.status(201).json(earnings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar todos os rendimentos (GET /earnings)
router.get('/earnings', async (req: Request, res: Response) => {
  try {
    const earnings = await Earnings.findAll();
    res.status(200).json(earnings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar um rendimento específico (GET /earnings/:id)
router.get('/earnings/:id', async (req: Request, res: Response) => {
  try {
    const earnings = await Earnings.findByPk(req.params.id);
    if (earnings) {
      res.status(200).json(earnings);
    } else {
      res.status(404).json({ message: 'Rendimento não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Atualizar um rendimento (PUT /earnings/:id)
router.put('/earnings/:id', async (req: Request, res: Response) => {
  try {
    const earnings = await Earnings.findByPk(req.params.id);
    if (earnings) {
      await earnings.update(req.body);
      res.status(200).json(earnings);
    } else {
      res.status(404).json({ message: 'Rendimento não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Deletar um rendimento (DELETE /earnings/:id)
router.delete('/earnings/:id', async (req: Request, res: Response) => {
  try {
    const earnings = await Earnings.findByPk(req.params.id);
    if (earnings) {
      await earnings.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Rendimento não encontrado' });
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
