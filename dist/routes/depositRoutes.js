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
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Criar um novo depósito (POST /deposits) - Protegido apenas por autenticação
router.post('/deposits', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = yield deposit_1.default.create(req.body);
        res.status(201).json(deposit);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar todos os depósitos (GET /deposits) - Protegido por autenticação e acesso administrativo
router.get('/deposits', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposits = yield deposit_1.default.findAll();
        res.status(200).json(deposits);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar um depósito específico (GET /deposits/:id) - Protegido apenas por autenticação
router.get('/deposits/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = yield deposit_1.default.findByPk(req.params.id);
        if (deposit) {
            res.status(200).json(deposit);
        }
        else {
            res.status(404).json({ message: 'Depósito não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Atualizar um depósito (PUT /deposits/:id) - Protegido apenas por autenticação
router.put('/deposits/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = yield deposit_1.default.findByPk(req.params.id);
        if (deposit) {
            yield deposit.update(req.body);
            res.status(200).json(deposit);
        }
        else {
            res.status(404).json({ message: 'Depósito não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Deletar um depósito (DELETE /deposits/:id) - Protegido por autenticação e acesso administrativo
router.delete('/deposits/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = yield deposit_1.default.findByPk(req.params.id);
        if (deposit) {
            yield deposit.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Depósito não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
exports.default = router;
