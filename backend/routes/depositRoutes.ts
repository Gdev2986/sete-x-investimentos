import express, { Request, Response, NextFunction } from 'express';
import Deposit from '../models/deposit';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar um novo depósito (POST /deposits) - Protegido por autenticação
router.post('/deposits', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deposit = await Deposit.create(req.body);
    res.status(201).json(deposit);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar todos os depósitos (GET /deposits) - Protegido por autenticação
router.get('/deposits', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deposits = await Deposit.findAll();
    res.status(200).json(deposits);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar um depósito específico (GET /deposits/:id) - Protegido por autenticação
router.get('/deposits/:id', authMiddleware, adminMiddleware,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      res.status(200).json(deposit);
    } else {
      res.status(404).json({ message: 'Depósito não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Atualizar um depósito (PUT /deposits/:id) - Protegido por autenticação
router.put('/deposits/:id', authMiddleware, adminMiddleware,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      await deposit.update(req.body);
      res.status(200).json(deposit);
    } else {
      res.status(404).json({ message: 'Depósito não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Deletar um depósito (DELETE /deposits/:id) - Protegido por autenticação
router.delete('/deposits/:id', authMiddleware, adminMiddleware,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deposit = await Deposit.findByPk(req.params.id);
    if (deposit) {
      await deposit.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Depósito não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

export default router;
