import { Request, Response } from 'express';
import User from '../models/user';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar o ID
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: 'ID inválido. Por favor, forneça um ID numérico.' });
      return;
    }

    const userId = Number(id);

    // Buscar o usuário pelo ID
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado.' });
      return;
    }

    // Retornar o usuário com os campos desejados
    res.status(200).json({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact: user.contact,
      role: user.role,
      balance: parseFloat(user.balance as unknown as string),
      total_allocated: parseFloat(user.total_allocated as unknown as string),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      message: 'Erro interno no servidor. Por favor, tente novamente mais tarde.',
      error: (error as Error).message,
    });
  }
};
