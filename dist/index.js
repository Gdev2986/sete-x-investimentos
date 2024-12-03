"use strict";
// index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const depositRoutes_1 = __importDefault(require("./routes/depositRoutes"));
const withdrawalRoutes_1 = __importDefault(require("./routes/withdrawalRoutes"));
const earningsRoutes_1 = __importDefault(require("./routes/earningsRoutes"));
const appConfig_1 = __importDefault(require("./config/appConfig"));
const passwordRoutes_1 = __importDefault(require("./routes/passwordRoutes"));
// Importa tipos personalizados (garante o reconhecimento no TypeScript)
const app = (0, express_1.default)();
// Middleware para processar JSON
app.use(express_1.default.json());
// Adiciona o prefixo `/api` para todas as rotas
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/deposits', depositRoutes_1.default);
app.use('/api/withdrawals', withdrawalRoutes_1.default);
app.use('/api/earnings', earningsRoutes_1.default);
app.use('/api/auth', passwordRoutes_1.default);
// Middleware de erro genérico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro no servidor', message: err.message });
});
// Inicia o servidor na porta configurada
app.listen(appConfig_1.default.port, () => {
    console.log(`Server running on port ${appConfig_1.default.port}`);
});
exports.default = app;
