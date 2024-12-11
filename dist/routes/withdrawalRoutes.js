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
const withdrawal_1 = __importDefault(require("../models/withdrawal"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Criação de retirada pelo usuário
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { amount, pix_key, name_account_withdrawal } = req.body;
        if (!amount || !pix_key || !name_account_withdrawal) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios (valor, chave Pix e nome do titular).' });
            return;
        }
        const withdrawal = yield withdrawal_1.default.create({
            user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            amount,
            pix_key,
            name_account_withdrawal,
            status: 'pending',
        });
        res.status(201).json(withdrawal);
    }
    catch (error) {
        console.error('Erro ao criar retirada:', error);
        res.status(400).json({ message: 'Erro ao criar retirada', error: error.message });
    }
}));
// Visualizar retiradas de um usuário específico (para usuários)
router.get('/user', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const withdrawals = yield withdrawal_1.default.findAll({ where: { user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!withdrawals.length) {
            res.status(404).json({ message: 'Nenhuma retirada encontrada para este usuário' });
            return;
        }
        res.status(200).json(withdrawals);
    }
    catch (error) {
        console.error('Erro ao buscar retiradas do usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar retiradas do usuário', error: error.message });
    }
}));
// Visualizar todas as retiradas (para admin)
router.get('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawals = yield withdrawal_1.default.findAll();
        res.status(200).json(withdrawals);
    }
    catch (error) {
        console.error('Erro ao buscar todas as retiradas:', error);
        res.status(500).json({ message: 'Erro ao buscar retiradas', error: error.message });
    }
}));
// Atualizar status de retirada (admin)
router.put('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            res.status(400).json({ message: 'Status inválido. Deve ser "pending", "approved" ou "rejected".' });
            return;
        }
        const withdrawal = yield withdrawal_1.default.findByPk(id);
        if (!withdrawal) {
            res.status(404).json({ message: 'Retirada não encontrada' });
            return;
        }
        withdrawal.status = status;
        yield withdrawal.save();
        res.status(200).json(withdrawal);
    }
    catch (error) {
        console.error('Erro ao atualizar retirada:', error);
        res.status(500).json({ message: 'Erro ao atualizar retirada', error: error.message });
    }
}));
// Excluir uma retirada (admin)
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const withdrawal = yield withdrawal_1.default.findByPk(id);
        if (!withdrawal) {
            res.status(404).json({ message: 'Retirada não encontrada' });
            return;
        }
        yield withdrawal.destroy();
        res.status(200).json({ message: 'Retirada excluída com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir retirada:', error);
        res.status(500).json({ message: 'Erro ao excluir retirada', error: error.message });
    }
}));
exports.default = router;
