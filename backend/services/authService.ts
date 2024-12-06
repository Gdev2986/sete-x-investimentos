import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import config from '../config/appConfig';

// Serviço para login do usuário
export const login = async (email: string, password: string): Promise<string> => {
  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ where: { email } });

    // Verifica se o usuário existe e se a senha é válida
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gera o token JWT com informações do usuário
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    return token;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

// Serviço para registro de um novo usuário
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('E-mail já está em uso');
    }

    // Cria o usuário e retorna
    const user = await User.create({ name, email, password });
    return user;
  } catch (error) {
    console.error('Erro no registro:', error);
    throw error;
  }
};

export default { login, register };
