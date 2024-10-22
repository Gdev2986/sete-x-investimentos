import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:34213345@localhost:5432/postgres', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: false, // Para conexões locais, evite SSL
  },
});

export default sequelize;
