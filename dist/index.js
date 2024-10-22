"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Importa as rotas de usuários
const depositRoutes_1 = __importDefault(require("./routes/depositRoutes"));
const withdrawalRoutes_1 = __importDefault(require("./routes/withdrawalRoutes"));
const earningsRoutes_1 = __importDefault(require("./routes/earningsRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(userRoutes_1.default);
app.use(depositRoutes_1.default);
app.use(withdrawalRoutes_1.default);
app.use(earningsRoutes_1.default);
// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
