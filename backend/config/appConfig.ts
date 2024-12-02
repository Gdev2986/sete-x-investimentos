import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing in .env file.');
  process.exit(1);
}

const config = {
  jwtSecret: process.env.JWT_SECRET, 
  port: parseInt(process.env.PORT || '4000', 10), // Garantir que o valor é um número
};

export default config;
