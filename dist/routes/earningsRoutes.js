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
const earnings_1 = __importDefault(require("../models/earnings")); // Assumindo que o modelo Earnings já está criado
const router = express_1.default.Router();
// Criar novo rendimento (POST /earnings)
router.post('/earnings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.create(req.body);
        res.status(201).json(earnings);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Pegar todos os rendimentos (GET /earnings)
router.get('/earnings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.findAll();
        res.status(200).json(earnings);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Pegar um rendimento específico (GET /earnings/:id)
router.get('/earnings/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.findByPk(req.params.id);
        if (earnings) {
            res.status(200).json(earnings);
        }
        else {
            res.status(404).json({ message: 'Rendimento não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Atualizar um rendimento (PUT /earnings/:id)
router.put('/earnings/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.findByPk(req.params.id);
        if (earnings) {
            yield earnings.update(req.body);
            res.status(200).json(earnings);
        }
        else {
            res.status(404).json({ message: 'Rendimento não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Deletar um rendimento (DELETE /earnings/:id)
router.delete('/earnings/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const earnings = yield earnings_1.default.findByPk(req.params.id);
        if (earnings) {
            yield earnings.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Rendimento não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
exports.default = router;
