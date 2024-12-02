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
    const authHeader = req.header('Authorization');
    // Valida o cabeçalho Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
        return;
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        // Decodifica o token JWT
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtSecret);
        // Busca o usuário no banco
        const user = yield user_1.default.findByPk(decoded.id);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        // Armazena o usuário na requisição
        req.user = user; // Substitua por tipagem correta se possível
        next();
    }
    catch (error) {
        console.error('Erro ao validar token:', error);
        res.status(401).json({ error: 'Token inválido' });
    }
});
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    // Verifica se o usuário está autenticado
    if (!user) {
        res.status(401).json({ error: 'Autenticação necessária' });
        return;
    }
    // Verifica o papel do usuário
    if (user.role !== 'admin') {
        res.status(403).json({ error: 'Acesso restrito para administradores' });
        return;
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
