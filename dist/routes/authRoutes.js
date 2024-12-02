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
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// Rota de login
router.post('/login', authController_1.login);
// Rota de registro
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Validação: Verifica se o e-mail já está em uso
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já está em uso' });
        }
        // Criação do usuário
        const user = yield user_1.default.create({ name, email, password });
        // Resposta de sucesso
        res.status(201).json({ message: 'Usuário criado com sucesso', user });
    }
    catch (error) {
        // Retorna erro detalhado
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
}));
exports.default = router;
