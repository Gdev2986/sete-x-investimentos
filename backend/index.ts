import express from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';  // Ajuste conforme suas rotas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Testando conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');
  })
  .catch((error) => {
    console.error('Erro ao conectar no banco de dados:', error);
  });

app.use('/users', userRoutes);  // Rota de exemplo

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
