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
// Criar um novo usuário
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, first_name, last_name, contact } = req.body;
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'E-mail já está em uso' });
            return;
        }
        const user = yield user_1.default.create({ username, email, password, first_name, last_name, contact });
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
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            contact: user.contact,
            totalAlocado: user.total_allocated,
            saldoAtual: user.balance,
            permissao: user.role,
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
        const id = Number(req.params.id);
        const user = yield user_1.default.findByPk(id);
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
        const id = Number(req.params.id); // Convertemos o parâmetro para número
        const { username, email, password, first_name, last_name, contact } = req.body;
        // Garantir que `req.user?.id` seja convertido corretamente antes da comparação
        if (Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== id && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== 'admin') {
            res.status(403).json({ message: 'Permissão negada' });
            return;
        }
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        // Atualizamos somente os campos que foram enviados na requisição
        user.username = username !== null && username !== void 0 ? username : user.username;
        user.email = email !== null && email !== void 0 ? email : user.email;
        user.password = password !== null && password !== void 0 ? password : user.password;
        user.first_name = first_name !== null && first_name !== void 0 ? first_name : user.first_name;
        user.last_name = last_name !== null && last_name !== void 0 ? last_name : user.last_name;
        user.contact = contact !== null && contact !== void 0 ? contact : user.contact;
        yield user.save();
        res.status(200).json({ message: 'Informações atualizadas com sucesso', user });
    }
    catch (error) {
        next(error);
    }
}));
// Atualizar o saldo de um usuário
router.put('/:id/balance', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
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
// Atualizar a role de um usuário
router.patch('/:id/role', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { role } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        user.role = role;
        yield user.save();
        res.status(200).json({ message: 'Permissão atualizada com sucesso', user });
    }
    catch (error) {
        next(error);
    }
}));
// Excluir um usuário (apenas administradores)
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
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
