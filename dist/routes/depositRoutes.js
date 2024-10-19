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
const deposit_1 = __importDefault(require("../models/deposit")); // Assumindo que o modelo de Deposit já está criado
const router = express_1.default.Router();
// Criar um novo depósito (POST /deposits)
router.post('/deposits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = yield deposit_1.default.create(req.body);
        res.status(201).json(deposit);
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
// Pegar todos os depósitos (GET /deposits)
router.get('/deposits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposits = yield deposit_1.default.findAll();
        res.status(200).json(deposits);
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
// Pegar um depósito específico (GET /deposits/:id)
router.get('/deposits/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Atualizar um depósito (PUT /deposits/:id)
router.put('/deposits/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Deletar um depósito (DELETE /deposits/:id)
router.delete('/deposits/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
exports.default = router;
