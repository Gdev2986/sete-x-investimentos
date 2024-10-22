import { Request, Response } from 'express';
import User from '../models/user';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Usar findByPk para buscar pelo ID
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    // Captura erros inesperados
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
