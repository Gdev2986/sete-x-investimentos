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
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const withdrawal = yield withdrawal_1.default.create(Object.assign(Object.assign({}, req.body), { user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }));
        res.status(201).json(withdrawal);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar retirada', error: error.message });
    }
}));
router.get('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawals = yield withdrawal_1.default.findAll();
        res.status(200).json(withdrawals);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar retiradas', error: error.message });
    }
}));
router.get('/user/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const withdrawals = yield withdrawal_1.default.findAll({ where: { user_id: id } });
        if (!withdrawals.length) {
            res.status(404).json({ message: 'Nenhuma retirada encontrada para este usuário' });
            return;
        }
        res.status(200).json(withdrawals);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar retiradas do usuário', error: error.message });
    }
}));
router.put('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const withdrawal = yield withdrawal_1.default.findByPk(id);
        if (!withdrawal) {
            res.status(404).json({ message: 'Retirada não encontrada' });
            return;
        }
        withdrawal.status = status || withdrawal.status;
        yield withdrawal.save();
        res.status(200).json(withdrawal);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar retirada', error: error.message });
    }
}));
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
        res.status(500).json({ message: 'Erro ao excluir retirada', error: error.message });
    }
}));
exports.default = router;
