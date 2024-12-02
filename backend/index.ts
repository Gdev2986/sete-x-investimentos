import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import depositRoutes from './routes/depositRoutes';
import withdrawalRoutes from './routes/withdrawalRoutes';
import earningsRoutes from './routes/earningsRoutes';
import authRoutes from './routes/authRoutes';
import config from './config/appConfig';

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Prefixo global para rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/earnings', earningsRoutes);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
});

// Inicia o servidor
app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
