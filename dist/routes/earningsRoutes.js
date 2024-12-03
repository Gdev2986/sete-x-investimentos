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
const earnings_1 = __importDefault(require("../models/earnings"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Criar um novo rendimento
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { amount } = req.body; // Pegando a coluna 'amount' do request body
        const earning = yield earnings_1.default.create({
            amount,
            user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, // Relacionando com o usuário autenticado
        });
        res.status(201).json(earning);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar rendimento', error: error.message });
    }
}));
// Obter todos os rendimentos (apenas para administradores)
router.get('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.findAll();
        res.status(200).json(earnings);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar rendimentos', error: error.message });
    }
}));
// Obter rendimentos de um usuário específico (autenticado)
router.get('/user/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const earnings = yield earnings_1.default.findAll({ where: { user_id: id } });
        if (!earnings.length) {
            res.status(404).json({ message: 'Nenhum rendimento encontrado para este usuário' });
            return;
        }
        res.status(200).json(earnings);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar rendimentos do usuário', error: error.message });
    }
}));
// Atualizar um rendimento (apenas para administradores)
router.put('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { amount } = req.body;
        const earning = yield earnings_1.default.findByPk(id);
        if (!earning) {
            res.status(404).json({ message: 'Rendimento não encontrado' });
            return;
        }
        earning.amount = amount || earning.amount; // Atualizando o campo 'amount'
        yield earning.save();
        res.status(200).json(earning);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar rendimento', error: error.message });
    }
}));
// Excluir um rendimento (apenas para administradores)
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const earning = yield earnings_1.default.findByPk(id);
        if (!earning) {
            res.status(404).json({ message: 'Rendimento não encontrado' });
            return;
        }
        yield earning.destroy();
        res.status(200).json({ message: 'Rendimento excluído com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao excluir rendimento', error: error.message });
    }
}));
exports.default = router;
