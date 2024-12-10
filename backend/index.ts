import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import depositRoutes from './routes/depositRoutes';
import withdrawalRoutes from './routes/withdrawalRoutes';
import earningsRoutes from './routes/earningsRoutes';
import config from './config/appConfig';
import passwordRoutes from './routes/passwordRoutes';
import rendimentoRoutes from './routes/rendimentoRoutes';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg =
          'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
  })
);

// Middleware para processar JSON
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb' }));

// Registra as rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/earnings', earningsRoutes);
app.use('/api/auth', passwordRoutes);
app.use('/api/rendimento', rendimentoRoutes);

// Middleware de erro genérico
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro no servidor', message: err.message });
});

// Inicia o servidor na porta configurada
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
