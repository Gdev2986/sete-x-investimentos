import express, { Request, Response } from 'express';
import Earning from '../models/earnings';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const earning = await Earning.create({
      amount,
      user_id: req.user?.id,
    });
    res.status(201).json(earning);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar rendimento', error: (error as Error).message });
  }
});

router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const earnings = await Earning.findAll();
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar rendimentos', error: (error as Error).message });
  }
});

router.get('/user/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const earnings = await Earning.findAll({ where: { user_id: id } });

    if (!earnings.length) {
      res.status(404).json({ message: 'Nenhum rendimento encontrado para este usuário' });
      return;
    }

    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar rendimentos do usuário', error: (error as Error).message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const earning = await Earning.findByPk(id);
    if (!earning) {
      res.status(404).json({ message: 'Rendimento não encontrado' });
      return;
    }

    earning.amount = amount || earning.amount;
    await earning.save();

    res.status(200).json(earning);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar rendimento', error: (error as Error).message });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const earning = await Earning.findByPk(id);
    if (!earning) {
      res.status(404).json({ message: 'Rendimento não encontrado' });
      return;
    }

    await earning.destroy();
    res.status(200).json({ message: 'Rendimento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir rendimento', error: (error as Error).message });
  }
});

export default router;
