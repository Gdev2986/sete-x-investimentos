"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;