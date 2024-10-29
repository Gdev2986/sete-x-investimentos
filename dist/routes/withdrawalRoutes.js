"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withdrawal_1 = __importDefault(require("../models/withdrawal")); // Modelo de Withdrawal
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Middleware de autenticação
const router = express_1.default.Router();
// Criar nova retirada (POST /withdrawals) - Protegido por autenticação
router.post('/withdrawals', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, amount, status } = req.body;
        // Log dos dados recebidos para verificar o conteúdo do request
        console.log('Recebendo dados:', { user_id, amount, status });
        const withdrawal = yield withdrawal_1.default.create({ user_id, amount, status });
        res.status(201).json(withdrawal);
    }
    catch (error) {
        console.error('Erro ao criar retirada:', error); // Log detalhado do erro
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Erro ao processar a retirada.',
                error: error.message,
                stack: error.stack,
            });
        }
        else {
            res.status(500).json({ message: 'Erro inesperado.' });
        }
    }
}));
// Pegar todas as retiradas (GET /withdrawals) - Restrito a administradores
router.get('/withdrawals', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawals = yield withdrawal_1.default.findAll();
        res.status(200).json(withdrawals);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar uma retirada específica (GET /withdrawals/:id) - Protegido por autenticação
router.get('/withdrawals/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.findByPk(req.params.id);
        if (withdrawal) {
            // Verificação para garantir que o usuário autenticado é o dono ou é administrador
            if (req.user.role === 'admin' || withdrawal.user_id === req.user.id) {
                res.status(200).json(withdrawal);
            }
            else {
                res.status(403).json({ message: 'Acesso negado' });
            }
        }
        else {
            res.status(404).json({ message: 'Retirada não encontrada' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Atualizar uma retirada (PUT /withdrawals/:id) - Protegido por autenticação
router.put('/withdrawals/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.findByPk(req.params.id);
        if (withdrawal) {
            // Verificação para garantir que o usuário autenticado é o dono ou é administrador
            if (req.user.role === 'admin' || withdrawal.user_id === req.user.id) {
                yield withdrawal.update(req.body);
                res.status(200).json(withdrawal);
            }
            else {
                res.status(403).json({ message: 'Acesso negado' });
            }
        }
        else {
            res.status(404).json({ message: 'Retirada não encontrada' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Deletar uma retirada (DELETE /withdrawals/:id) - Restrito a administradores
router.delete('/withdrawals/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.findByPk(req.params.id);
        if (withdrawal) {
            yield withdrawal.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Retirada não encontrada' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
exports.default = router;
