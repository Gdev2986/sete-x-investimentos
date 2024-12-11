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
const user_1 = __importDefault(require("../models/user"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Criar um novo usuário (apenas para testes)
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'E-mail já está em uso' });
            return;
        }
        const user = yield user_1.default.create({ name, email, password });
        res.status(201).json({ message: 'Usuário criado com sucesso', user });
    }
    catch (error) {
        next(error);
    }
}));
// Obter todos os usuários (apenas administradores)
router.get('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        const transformedUsers = users.map(user => ({
            id: user.id,
            nome: user.name,
            email: user.email,
            contato: '',
            totalAlocado: 0,
            saldoAtual: user.balance
        }));
        res.status(200).json(transformedUsers);
    }
    catch (error) {
        next(error);
    }
}));
// Obter um único usuário por ID
router.get('/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
// Atualizar informações de um usuário
router.put('/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== id && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== 'admin') {
            res.status(403).json({ message: 'Permissão negada' });
            return;
        }
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        yield user.save();
        res.status(200).json({ message: 'Informações atualizadas com sucesso', user });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id/balance', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { total_allocated, balance } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        if (total_allocated !== undefined)
            user.total_allocated = total_allocated;
        if (balance !== undefined)
            user.balance = balance;
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Erro ao atualizar saldo do usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar saldo do usuário', error: error.message });
    }
}));
// Excluir um usuário (apenas administradores)
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        yield user.destroy();
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    }
    catch (error) {
        next(error);
    }
}));
// Alterar role de um usuário (apenas administradores)
router.patch('/:id/role', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        user.role = role;
        yield user.save();
        res.status(200).json({ message: 'Role do usuário atualizado com sucesso', user });
    }
    catch (error) {
        next(error);
    }
}));
// Obter perfil do usuário autenticado
router.get('/profile', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_1.default.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
