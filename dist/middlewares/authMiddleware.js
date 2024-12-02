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
exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const user_1 = __importDefault(require("../models/user"));
// Middleware de autenticação geral
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header('Authorization');
        // Verifica se o cabeçalho Authorization foi fornecido corretamente
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
            return;
        }
        const token = authHeader.replace('Bearer ', '');
        // Decodifica o token JWT
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtSecret);
        // Busca o usuário no banco de dados pelo ID
        const user = yield user_1.default.findByPk(decoded.id);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        // Adiciona o usuário à requisição
        req.user = { id: user.id.toString(), role: user.role };
        // Passa para o próximo middleware
        next();
    }
    catch (error) {
        console.error('Erro ao validar token:', error);
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
});
exports.authMiddleware = authMiddleware;
// Middleware de verificação de administrador
const adminMiddleware = (req, res, next) => {
    try {
        const user = req.user;
        // Verifica se o usuário está autenticado
        if (!user) {
            res.status(401).json({ error: 'Autenticação necessária' });
            return;
        }
        // Verifica se o usuário é um administrador
        if (user.role !== 'admin') {
            res.status(403).json({ error: 'Acesso restrito para administradores' });
            return;
        }
        // Passa para o próximo middleware
        next();
    }
    catch (error) {
        console.error('Erro no adminMiddleware:', error);
        res.status(500).json({ error: 'Erro inesperado' });
    }
};
exports.adminMiddleware = adminMiddleware;
exports.default = {
    authMiddleware: exports.authMiddleware,
    adminMiddleware: exports.adminMiddleware,
};
