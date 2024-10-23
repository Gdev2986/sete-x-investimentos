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
        res.status(401).json({ error: 'Unauthorized' });
        return; // Certifique-se de retornar após enviar a resposta
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtSecret);
        req.user = decoded;
        next(); // Continua para a próxima função
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return; // Certifique-se de retornar após enviar a resposta
    }
};
exports.authMiddleware = authMiddleware;
