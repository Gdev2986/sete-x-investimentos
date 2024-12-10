import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/verify-password', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { currentPassword } = req.body;

  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      res.status(404).json({ valid: false, message: 'Usuário não encontrado' });
      return;
    }

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

router.put('/update-password', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { newPassword } = req.body;

  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar senha', error: (error as Error).message });
  }
});

export default router;
