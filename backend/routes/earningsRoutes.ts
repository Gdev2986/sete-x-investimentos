import express, { Request, Response, NextFunction } from 'express';
import Earning from '../models/earnings'; // Modelo de Earnings
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware'; // Middleware de autenticação

const router = express.Router();

// Criar novo rendimento (POST /earnings) - Protegido apenas por autenticação
router.post('/earnings', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const earning = await Earning.create(req.body);
    res.status(201).json(earning);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar todos os rendimentos (GET /earnings) - Protegido por autenticação e acesso administrativo
router.get('/earnings', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const earnings = await Earning.findAll();
    res.status(200).json(earnings);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar um rendimento específico (GET /earnings/:id) - Protegido apenas por autenticação
router.get('/earnings/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const earning = await Earning.findByPk(req.params.id);
    if (earning) {
      res.status(200).json(earning);
    } else {
      res.status(404).json({ message: 'Rendimento não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Atualizar um rendimento (PUT /earnings/:id) - Protegido apenas por autenticação
router.put('/earnings/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const earning = await Earning.findByPk(req.params.id);
    if (earning) {
      await earning.update(req.body);
      res.status(200).json(earning);
    } else {
      res.status(404).json({ message: 'Rendimento não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Deletar um rendimento (DELETE /earnings/:id) - Protegido por autenticação e acesso administrativo
router.delete('/earnings/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const earning = await Earning.findByPk(req.params.id);
    if (earning) {
      await earning.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Rendimento não encontrado' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

export default router;