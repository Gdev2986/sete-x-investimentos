import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Para conexões SSL, se necessário
      },
    },
  });
} else {
  console.log('DATABASE_URL não configurada. Conexão com o banco de dados não será feita.');
  sequelize = new Sequelize('sqlite::memory:'); // Modo temporário em memória (opcional)
}

export default sequelize;
