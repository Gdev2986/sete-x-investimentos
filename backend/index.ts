import express from 'express';
import userRoutes from './routes/userRoutes'; // Importa as rotas de usuários
import depositRoutes from './routes/depositRoutes'; 
import withdrawalRoutes from './routes/withdrawalRoutes';
import earningsRoutes from './routes/earningsRoutes';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(depositRoutes);
app.use(withdrawalRoutes);
app.use(earningsRoutes);

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
