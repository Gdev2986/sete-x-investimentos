"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const depositRoutes_1 = __importDefault(require("./routes/depositRoutes"));
const withdrawalRoutes_1 = __importDefault(require("./routes/withdrawalRoutes"));
const earningsRoutes_1 = __importDefault(require("./routes/earningsRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const appConfig_1 = __importDefault(require("./config/appConfig"));
const app = (0, express_1.default)();
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Prefixo global para rotas
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/deposits', depositRoutes_1.default);
app.use('/api/withdrawals', withdrawalRoutes_1.default);
app.use('/api/earnings', earningsRoutes_1.default);
// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
});
// Inicia o servidor
app.listen(appConfig_1.default.port, () => {
    console.log(`Servidor rodando na porta ${appConfig_1.default.port}`);
});
