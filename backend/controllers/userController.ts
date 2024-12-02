import { Request, Response } from 'express';
import User from '../models/user';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar o ID
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }

    // Usar findByPk para buscar pelo ID
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor', error: (error as Error).message });
  }
};
  