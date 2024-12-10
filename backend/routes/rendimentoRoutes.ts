// src/routes/rendimentoRoutes.ts
import express, { Request, Response } from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';
import { distribuirRendimentos } from '../services/rendimentoService';

const router = express.Router();

router.post('/distribuir', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await distribuirRendimentos();
    res.status(200).json({
      message: 'Rendimentos distribuídos com sucesso',
      taxaAplicada: `${resultado.taxaAplicada}%`,
      rendimentoBrutoPercentual: `${resultado.rendimentoBrutoPercentual.toFixed(2)}%`,
      totalAlocado: resultado.totalAlocado
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao distribuir rendimentos', error: (error as Error).message });
  }
});

export default router;
