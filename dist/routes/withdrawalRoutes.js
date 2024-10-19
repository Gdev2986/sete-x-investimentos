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
const withdrawal_1 = __importDefault(require("../models/withdrawal")); // Assumindo que o modelo Withdrawal já está criado
const router = express_1.default.Router();
// Criar uma nova retirada (POST /withdrawals)
router.post('/withdrawals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.create(req.body);
        res.status(201).json(withdrawal);
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
// Pegar todas as retiradas (GET /withdrawals)
router.get('/withdrawals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawals = yield withdrawal_1.default.findAll();
        res.status(200).json(withdrawals);
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
// Pegar uma retirada específica (GET /withdrawals/:id)
router.get('/withdrawals/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.findByPk(req.params.id);
        if (withdrawal) {
            res.status(200).json(withdrawal);
        }
        else {
            res.status(404).json({ message: 'Retirada não encontrada' });
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
// Atualizar uma retirada (PUT /withdrawals/:id)
router.put('/withdrawals/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.findByPk(req.params.id);
        if (withdrawal) {
            yield withdrawal.update(req.body);
            res.status(200).json(withdrawal);
        }
        else {
            res.status(404).json({ message: 'Retirada não encontrada' });
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
// Deletar uma retirada (DELETE /withdrawals/:id)
router.delete('/withdrawals/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.findByPk(req.params.id);
        if (withdrawal) {
            yield withdrawal.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Retirada não encontrada' });
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
