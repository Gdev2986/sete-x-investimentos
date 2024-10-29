import express, { Request, Response, NextFunction } from 'express';
import Withdrawal from '../models/withdrawal'; // Modelo de Withdrawal
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware'; // Middleware de autenticação

const router = express.Router();

// Criar nova retirada (POST /withdrawals) - Protegido por autenticação
router.post('/withdrawals', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, amount, status } = req.body;

    // Log dos dados recebidos para verificar o conteúdo do request
    console.log('Recebendo dados:', { user_id, amount, status });

    const withdrawal = await Withdrawal.create({ user_id, amount, status });
    res.status(201).json(withdrawal);
  } catch (error) {
    console.error('Erro ao criar retirada:', error); // Log detalhado do erro
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Erro ao processar a retirada.',
        error: error.message,
        stack: error.stack,
      });
    } else {
      res.status(500).json({ message: 'Erro inesperado.' });
    }
  }
});

// Pegar todas as retiradas (GET /withdrawals) - Restrito a administradores
router.get('/withdrawals', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const withdrawals = await Withdrawal.findAll();
    res.status(200).json(withdrawals);
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Pegar uma retirada específica (GET /withdrawals/:id) - Protegido por autenticação
router.get('/withdrawals/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const withdrawal = await Withdrawal.findByPk(req.params.id);
    if (withdrawal) {
      // Verificação para garantir que o usuário autenticado é o dono ou é administrador
      if ((req as any).user.role === 'admin' || withdrawal.user_id === (req as any).user.id) {
        res.status(200).json(withdrawal);
      } else {
        res.status(403).json({ message: 'Acesso negado' });
      }
    } else {
      res.status(404).json({ message: 'Retirada não encontrada' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Atualizar uma retirada (PUT /withdrawals/:id) - Protegido por autenticação
router.put('/withdrawals/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const withdrawal = await Withdrawal.findByPk(req.params.id);
    if (withdrawal) {
      // Verificação para garantir que o usuário autenticado é o dono ou é administrador
      if ((req as any).user.role === 'admin' || withdrawal.user_id === (req as any).user.id) {
        await withdrawal.update(req.body);
        res.status(200).json(withdrawal);
      } else {
        res.status(403).json({ message: 'Acesso negado' });
      }
    } else {
      res.status(404).json({ message: 'Retirada não encontrada' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

// Deletar uma retirada (DELETE /withdrawals/:id) - Restrito a administradores
router.delete('/withdrawals/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const withdrawal = await Withdrawal.findByPk(req.params.id);
    if (withdrawal) {
      await withdrawal.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Retirada não encontrada' });
    }
  } catch (error) {
    next(error); // Usando next() para lidar com erros
  }
});

export default router;
