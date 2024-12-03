import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Verificar a senha atual
router.post('/verify-password', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { currentPassword } = req.body;

  try {
    // Verifica se o usuário está autenticado e se existe no banco
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      res.status(404).json({ valid: false, message: 'Usuário não encontrado' });
      return;
    }

    // Verifica se a senha atual está correta
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      res.status(401).json({ valid: false, message: 'Senha atual incorreta' });
      return;
    }

    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar senha', error: (error as Error).message });
  }
});

// Atualizar a senha
router.put('/update-password', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { newPassword } = req.body;

  try {
    // Verifica se o usuário está autenticado e se existe no banco
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Gera o hash da nova senha e salva no banco
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar senha', error: (error as Error).message });
  }
});

export default router;
