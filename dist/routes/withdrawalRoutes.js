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
// Criar uma nova retirada
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawal = yield withdrawal_1.default.create(Object.assign(Object.assign({}, req.body), { user_id: req.user.id }));
        res.status(201).json(withdrawal);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar retirada', error: error.message });
    }
}));
// Obter todas as retiradas (somente administradores)
router.get('/', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawals = yield withdrawal_1.default.findAll();
        res.status(200).json(withdrawals);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar retiradas', error: error.message });
    }
}));
exports.default = router;
