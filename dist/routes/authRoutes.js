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
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.login)(req, res);
    }
    catch (error) {
        next(error); // Passa o erro para o middleware de erro
    }
}));
// Rota de registro
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Dados recebidos no registro:', req.body); // Log dos dados recebidos
        const { firstName, lastName, username, email, contact, password } = req.body;
        // Verifica se o e-mail ou username já estão em uso
        const existingUser = yield user_1.default.findOne({ where: { email } });
        const existingUsername = yield user_1.default.findOne({ where: { username } });
        if (existingUser || existingUsername) {
            res.status(400).json({
                message: 'E-mail ou nome de usuário já estão em uso',
            });
            return;
        }
        // Cria um novo usuário
        const user = yield user_1.default.create({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            contact,
            password,
        });
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user,
        });
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error); // Log do erro
        next(error);
    }
}));
exports.default = router;
