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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validar se email e senha foram fornecidos
    if (!email || !password) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }
    try {
        // Buscar o usuário pelo email
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }
        // Verificar a senha usando bcrypt
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }
        // Gerar o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, appConfig_1.default.jwtSecret, { expiresIn: '1h' } // O token expira em 1 hora
        );
        // Retornar o token e algumas informações do usuário
        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error('Erro no login:', error); // Log para depuração
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});
exports.login = login;
