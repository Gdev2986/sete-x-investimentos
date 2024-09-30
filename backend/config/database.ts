import { Sequelize } from 'sequelize';

// Criando a conexão com o banco de dados usando Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,   // Desativa logs do Sequelize no console
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Para conexões SSL
    }
  }
});

export default sequelize;
