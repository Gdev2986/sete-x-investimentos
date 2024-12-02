import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URL) {
  console.error('Database connection string (DB_URL) is missing in .env.');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true', // Configura SSL apenas se definido no .env
  },
  retry: {
    max: 5, // Repetir a conexão 5 vezes antes de falhar
  },
});

export default sequelize;
