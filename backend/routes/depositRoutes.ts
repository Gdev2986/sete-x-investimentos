import express, { Request, Response } from 'express';
import Deposit from '../models/deposit';
import User from '../models/user';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * Traduz o status para exibição.
 */
function traduzirStatus(status: string): string {
    switch (status) {
        case 'pending':
            return 'Pendente';
        case 'approved':
            return 'Aprovado';
        case 'cancelled':
            return 'Cancelado';
        default:
            return status;
    }
}

/**
 * Transforma um depósito para o formato necessário no frontend.
 */
function transformarDeposito(deposit: any) {
    const dataDeposito = deposit.created_at
        ? new Date(deposit.created_at).toLocaleString('pt-BR')
        : '';
    return {
        id: deposit.id,
        nome: deposit.user ? deposit.user.name : '',
        valorDepositado: deposit.amount || 0,
        saldoAtual: deposit.user ? deposit.user.balance : 0,
        dataDeposito,
        status: traduzirStatus(deposit.status),
    };
}

/**
 * POST: Criar um depósito.
 */
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const deposit = await Deposit.create({
            ...req.body,
            user_id: req.user?.id,
        });
        res.status(201).json(deposit);
    } catch (error) {
        console.error('Erro ao criar depósito:', error);
        res.status(400).json({ message: 'Erro ao criar depósito', error: (error as Error).message });
    }
});

/**
 * GET: Listar todos os depósitos (Admin).
 */
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const deposits = await Deposit.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'balance'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const transformed = deposits.map((d) => transformarDeposito(d));
        res.status(200).json(transformed);
    } catch (error) {
        console.error('Erro ao buscar depósitos:', error);
        res.status(500).json({ message: 'Erro ao buscar depósitos', error: (error as Error).message });
    }
});

/**
 * GET: Listar depósitos de um usuário específico.
 */
router.get('/user/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Permite acesso apenas ao próprio usuário ou a administradores.
        if (req.user?.role !== 'admin' && Number(req.user?.id) !== Number(id)) {
          res.status(403).json({ message: 'Acesso negado' });
          return;
      }

        const deposits = await Deposit.findAll({
            where: { user_id: id },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'balance'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const transformed = deposits.map((d) => transformarDeposito(d));
        res.status(200).json(transformed);
    } catch (error) {
        console.error('Erro ao buscar depósitos do usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar depósitos do usuário', error: (error as Error).message });
    }
});

/**
 * PUT: Atualizar o status de um depósito (Admin).
 */
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Busca o depósito pelo ID com os dados do usuário associados
        const deposit = await Deposit.findByPk(id, {
            include: [{ model: User, as: 'user' }],
        });

        if (!deposit) {
            res.status(404).json({ message: 'Depósito não encontrado' });
            return;
        }

        const user = deposit.user;
        if (!user) {
            res.status(404).json({ message: 'Usuário associado ao depósito não encontrado' });
            return;
        }

        // Converte valores para garantir operações matemáticas seguras
        const userBalance = typeof user.balance === 'string' ? parseFloat(user.balance) : user.balance;
        const depositAmount = typeof deposit.amount === 'string' ? parseFloat(deposit.amount) : deposit.amount;

        // Atualiza o saldo com base no status
        if (deposit.status === 'approved' && status !== 'approved') {
            // Estava aprovado, alterado para outro status: subtraímos o valor
            user.balance = userBalance - depositAmount;
        } else if (deposit.status !== 'approved' && status === 'approved') {
            // Não estava aprovado, agora foi aprovado: somamos o valor
            user.balance = userBalance + depositAmount;
        }

        // Atualiza o status do depósito
        deposit.status = status;
        await deposit.save();

        // Salva a alteração no saldo do usuário
        await user.save();

        const updatedDeposit = await Deposit.findByPk(id, {
            include: [{ model: User, as: 'user', attributes: ['name', 'balance'] }],
        });

        const transformed = updatedDeposit ? transformarDeposito(updatedDeposit) : null;
        res.status(200).json(transformed);
    } catch (error) {
        console.error('Erro ao atualizar o depósito:', error);
        res.status(500).json({ message: 'Erro ao atualizar o depósito', error: (error as Error).message });
    }
});


export default router;
