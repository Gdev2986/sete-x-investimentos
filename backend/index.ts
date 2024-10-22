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

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
