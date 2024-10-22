import express from 'express';
import Earning from '../models/earning'; // Modelo de Earnings
import { authMiddleware } from '../middlewares/authMiddleware'; // Middleware de autenticação
import { Request, Response } from 'express';

const router = express.Router();

// Criar novo rendimento (POST /earnings) - Protegido por autenticação
router.post('/earnings', authMiddleware, async (req: Request, res: Response) => {
  try {
    const earning = await Earning.create(req.body);
    res.status(201).json(earning);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar todos os rendimentos (GET /earnings) - Protegido por autenticação
router.get('/earnings', authMiddleware, async (req: Request, res: Response) => {
  try {
    const earnings = await Earning.findAll();
    res.status(200).json(earnings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});

// Pegar um rendimento específico (GET /earnings/:id) - Protegido por autenticação
router.get('/earnings/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const earning = await Earning.findByPk(req.params.id);
    if (earning) {
      res.status(200).json(earning);
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

// Atualizar um rendimento (PUT /earnings/:id) - Protegido por autenticação
router.put('/earnings/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const earning = await Earning.findByPk(req.params.id);
    if (earning) {
      await earning.update(req.body);
      res.status(200).json(earning);
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

// Deletar um rendimento (DELETE /earnings/:id) - Protegido por autenticação
router.delete('/earnings/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const earning = await Earning.findByPk(req.params.id);
    if (earning) {
      await earning.destroy();
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
