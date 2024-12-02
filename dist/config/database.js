"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DB_URL) {
    console.error('Database connection string (DB_URL) is missing in .env.');
    process.exit(1);
}
const sequelize = new sequelize_1.Sequelize(process.env.DB_URL, {
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
exports.default = sequelize;
