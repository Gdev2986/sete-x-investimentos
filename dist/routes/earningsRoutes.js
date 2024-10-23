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
const earnings_1 = __importDefault(require("../models/earnings")); // Modelo de Earnings
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Middleware de autenticação
const router = express_1.default.Router();
// Criar novo rendimento (POST /earnings) - Protegido por autenticação
router.post('/earnings', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earning = yield earnings_1.default.create(req.body);
        res.status(201).json(earning);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar todos os rendimentos (GET /earnings) - Protegido por autenticação
router.get('/earnings', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.findAll();
        res.status(200).json(earnings);
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Pegar um rendimento específico (GET /earnings/:id) - Protegido por autenticação
router.get('/earnings/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earning = yield earnings_1.default.findByPk(req.params.id);
        if (earning) {
            res.status(200).json(earning);
        }
        else {
            res.status(404).json({ message: 'Rendimento não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Atualizar um rendimento (PUT /earnings/:id) - Protegido por autenticação
router.put('/earnings/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earning = yield earnings_1.default.findByPk(req.params.id);
        if (earning) {
            yield earning.update(req.body);
            res.status(200).json(earning);
        }
        else {
            res.status(404).json({ message: 'Rendimento não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
// Deletar um rendimento (DELETE /earnings/:id) - Protegido por autenticação
router.delete('/earnings/:id', authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earning = yield earnings_1.default.findByPk(req.params.id);
        if (earning) {
            yield earning.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Rendimento não encontrado' });
        }
    }
    catch (error) {
        next(error); // Usando next() para lidar com erros
    }
}));
exports.default = router;
