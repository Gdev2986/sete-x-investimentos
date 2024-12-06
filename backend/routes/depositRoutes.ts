import express from 'express';
import Deposit from '../models/deposit';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Criar um novo depósito
router.post('/', authMiddleware, async (req, res) => {
  try {
    const deposit = await Deposit.create({ ...req.body, user_id: req.user?.id });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar depósito', error: (error as Error).message });
  }
});

// Obter todos os depósitos (apenas para administradores)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deposits = await Deposit.findAll();
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar depósitos', error: (error as Error).message });
  }
});

// Obter os depósitos de um usuário específico
router.get('/user/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deposits = await Deposit.findAll({ where: { user_id: id } });
    res.status(200).json(deposits);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar depósitos do usuário', error: (error as Error).message });
  }
});

// Atualizar o status de um depósito específico
router.put('/:id', authMiddleware, adminMiddleware, async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { id } = req.params; // Captura o ID do depósito
    const { status } = req.body; // Captura o novo status do corpo da requisição

    // Busca o depósito pelo ID
    const deposit = await Deposit.findByPk(id);
    if (!deposit) {
      res.status(404).json({ message: 'Depósito não encontrado' });
      return;
    }

    // Atualiza o status do depósito
    deposit.status = status;
    await deposit.save();

    res.status(200).json(deposit);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o depósito', error: (error as Error).message });
  }
});


export default router;
