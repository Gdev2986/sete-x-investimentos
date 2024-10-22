"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
    if (!token) {
        // Retornar o erro caso não haja token
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }
    try {
        // Verificar o token JWT
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtSecret);
        // Passar o payload decodificado para o `req.user`
        req.user = decoded;
        next(); // Continuar para a próxima função do middleware
    }
    catch (error) {
        // Retornar o erro caso o token seja inválido
        return res.status(401).json({ error: 'Token is not valid' });
    }
};
exports.authMiddleware = authMiddleware;
