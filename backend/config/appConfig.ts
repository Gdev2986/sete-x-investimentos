import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
const config = {
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret', // Chave secreta para JWT
};


export default config;
