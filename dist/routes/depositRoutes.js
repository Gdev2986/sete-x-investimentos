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
const deposit_1 = __importDefault(require("../models/deposit"));
const user_1 = __importDefault(require("../models/user"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
function traduzirStatus(status) {
    switch (status) {
        case 'pending': return 'Pendente';
        case 'approved': return 'Aprovado';
        case 'cancelled': return 'Cancelado';
        default: return status;
    }
}
function transformarDeposito(deposit) {
    const dataDeposito = deposit.created_at ? new Date(deposit.created_at).toLocaleString('pt-BR') : '';
    return {
        id: deposit.id,
        nome: deposit.user ? deposit.user.name : '',
        valorDepositado: deposit.amount || 0,
        saldoAtual: deposit.user ? deposit.user.balance : 0,
        dataDeposito,
        status: traduzirStatus(deposit.status),
    };
}
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const deposit = yield deposit_1.default.create(Object.assign(Object.assign({}, req.body), { user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }));
        res.status(201).json(deposit);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar depósito', error: error.message });
    }
}));
router.get('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposits = yield deposit_1.default.findAll({
            include: [
                {
                    model: user_1.default,
                    as: 'user',
                    attributes: ['name', 'balance']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        const transformed = deposits.map((d) => transformarDeposito(d));
        res.status(200).json(transformed);
    }
    catch (error) {
        console.error('Erro ao buscar depósitos:', error);
        res.status(500).json({ message: 'Erro ao buscar depósitos', error: error.message });
    }
}));
router.get('/user/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        // Caso queira restringir apenas ao próprio usuário ou admin:
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin' && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== id) {
            res.status(403).json({ message: 'Acesso negado' });
            return;
        }
        const deposits = yield deposit_1.default.findAll({
            where: { user_id: id },
            include: [
                {
                    model: user_1.default,
                    as: 'user',
                    attributes: ['name', 'balance']
                }
            ],
            order: [['created_at', 'DESC']]
        });
        const transformed = deposits.map((d) => transformarDeposito(d));
        res.status(200).json(transformed);
    }
    catch (error) {
        console.error('Erro ao buscar depósitos do usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar depósitos do usuário', error: error.message });
    }
}));
router.put('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const deposit = yield deposit_1.default.findByPk(id);
        if (!deposit) {
            res.status(404).json({ message: 'Depósito não encontrado' });
            return;
        }
        deposit.status = status;
        yield deposit.save();
        const updatedDeposit = yield deposit_1.default.findByPk(id, {
            include: [{ model: user_1.default, as: 'user', attributes: ['name', 'balance'] }]
        });
        const transformed = updatedDeposit ? transformarDeposito(updatedDeposit) : null;
        res.status(200).json(transformed);
    }
    catch (error) {
        console.error('Erro ao atualizar o depósito:', error);
        res.status(500).json({ message: 'Erro ao atualizar o depósito', error: error.message });
    }
}));
exports.default = router;
