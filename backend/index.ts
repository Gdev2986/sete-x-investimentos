import express from 'express';
import userRoutes from './routes/userRoutes'; 
import depositRoutes from './routes/depositRoutes'; 
import withdrawalRoutes from './routes/withdrawalRoutes';
import earningsRoutes from './routes/earningsRoutes';
import authRoutes from './routes/authRoutes'; // Importar o authRoutes

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(depositRoutes);
app.use(withdrawalRoutes);
app.use(earningsRoutes);
app.use(authRoutes); // Registrar as rotas de autenticação

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
