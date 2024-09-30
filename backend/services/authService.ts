import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import config from '../config/appConfig';

export const login = async (email: string, password: string): Promise<string> => {
  // Encontrar o usuário pelo email
  const user = await User.findOne({ where: { email } });
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    // Lançar erro se o usuário não for encontrado ou a senha estiver incorreta
    throw new Error('Invalid credentials');
  }
  
  // Gerar token JWT com o ID do usuário
  const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
  
  return token;
};

export default { login };
