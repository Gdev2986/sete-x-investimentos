"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Criando a conexão com o banco de dados usando Sequelize
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || '', {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Desativa logs do Sequelize no console
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Para conexões SSL
        }
    }
});
exports.default = sequelize;
