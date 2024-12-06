import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.DB_HOST &&
  !process.env.DB_URL &&
  !process.env.DB_USUARIO &&
  !process.env.DB_SENHA
) {
  console.error("Database connection string (DB_URL) is missing in .env.");
  process.exit(1);
}

const sequelize = new Sequelize(
  String(process.env.DB_URL),
  String(process.env.DB_USUARIO),
  process.env.DB_SENHA,
  {
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
  }
);

// Log de status da conexão
sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
