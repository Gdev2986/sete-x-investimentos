"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DB_HOST &&
    !process.env.DB_URL &&
    !process.env.DB_USUARIO &&
    !process.env.DB_SENHA) {
    console.error("Database connection string (DB_URL) is missing in .env.");
    process.exit(1);
}
const sequelize = new sequelize_1.Sequelize(String(process.env.DB_URL), String(process.env.DB_USUARIO), process.env.DB_SENHA, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
        ssl: process.env.DB_SSL === "true", // Configura SSL apenas se definido no .env
    },
    retry: {
        max: 5, // Repetir a conexão 5 vezes antes de falhar
    },
});
// Log de status da conexão
sequelize
    .authenticate()
    .then(() => console.log("Database connection established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));
exports.default = sequelize;
