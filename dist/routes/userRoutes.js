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
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Middleware de autenticação JWT
const router = express_1.default.Router();
// Criar novo usuário (POST /users) - Não precisa de autenticação
router.post('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar todos os usuários (GET /users) - Protegido por autenticação
router.get('/users', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar um usuário específico (GET /users/:id) - Protegido por autenticação
router.get('/users/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Atualizar um usuário (PUT /users/:id) - Protegido por autenticação
router.put('/users/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.params.id);
        if (user) {
            yield user.update(req.body);
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Deletar um usuário (DELETE /users/:id) - Protegido por autenticação
router.delete('/users/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByPk(req.params.id);
        if (user) {
            yield user.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
exports.default = router;
