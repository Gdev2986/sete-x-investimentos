import { Sequelize } from 'sequelize';

// Conexão manual com o banco de dados PostgreSQL
const sequelize = new Sequelize('postgres://postgres:34213345@localhost:5432/setex', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Desativa logs de SQL no console
});

// Definir o schema padrão (opcional)
sequelize.query('SET search_path TO setex');

export default sequelize;
