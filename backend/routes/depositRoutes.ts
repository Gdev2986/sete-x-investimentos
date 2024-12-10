import express, { Request, Response } from 'express';
import Deposit from '../models/deposit';
import User from '../models/user';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

function traduzirStatus(status: string): string {
  switch (status) {
    case 'pending': return 'Pendente';
    case 'approved': return 'Aprovado';
    case 'cancelled': return 'Cancelado';
    default: return status;
  }
}

function transformarDeposito(deposit: any) {
  const dataDeposito = deposit.created_at ? new Date(deposit.created_at).toLocaleString('pt-BR') : '';
  return {
    id: deposit.id,
    nome: deposit.user ? deposit.user.name : '',
    valorDepositado: deposit.amount || 0,
    saldoAtual: deposit.user ? deposit.user.balance : 0,
    dataDeposito,
    status: traduzirStatus(deposit.status),
  };
}

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const deposit = await Deposit.create({ ...req.body, user_id: req.user?.id });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar depósito', error: (error as Error).message });
  }
});

router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const deposits = await Deposit.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'balance']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    const transformed = deposits.map((d) => transformarDeposito(d));
    res.status(200).json(transformed);
  } catch (error) {
    console.error('Erro ao buscar depósitos:', error);
    res.status(500).json({ message: 'Erro ao buscar depósitos', error: (error as Error).message });
  }
});

router.get('/user/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Caso queira restringir apenas ao próprio usuário ou admin:
    if (req.user?.role !== 'admin' && req.user?.id !== id) {
      res.status(403).json({ message: 'Acesso negado' });
      return;
    }

    const deposits = await Deposit.findAll({
      where: { user_id: id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'balance']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    const transformed = deposits.map((d) => transformarDeposito(d));
    res.status(200).json(transformed);
  } catch (error) {
    console.error('Erro ao buscar depósitos do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar depósitos do usuário', error: (error as Error).message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const deposit = await Deposit.findByPk(id);
    if (!deposit) {
      res.status(404).json({ message: 'Depósito não encontrado' });
      return;
    }

    deposit.status = status;
    await deposit.save();

    const updatedDeposit = await Deposit.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['name', 'balance'] }]
    });

    const transformed = updatedDeposit ? transformarDeposito(updatedDeposit) : null;
    res.status(200).json(transformed);
  } catch (error) {
    console.error('Erro ao atualizar o depósito:', error);
    res.status(500).json({ message: 'Erro ao atualizar o depósito', error: (error as Error).message });
  }
});

export default router;
