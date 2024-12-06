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
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
// Serviço para login do usuário
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca o usuário pelo email
        const user = yield user_1.default.findOne({ where: { email } });
        // Verifica se o usuário existe e se a senha é válida
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }
        // Gera o token JWT com informações do usuário
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, appConfig_1.default.jwtSecret, { expiresIn: '1h' } // Token expira em 1 hora
        );
        return token;
    }
    catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
});
exports.login = login;
// Serviço para registro de um novo usuário
const register = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica se o email já está em uso
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('E-mail já está em uso');
        }
        // Cria o usuário e retorna
        const user = yield user_1.default.create({ name, email, password });
        return user;
    }
    catch (error) {
        console.error('Erro no registro:', error);
        throw error;
    }
});
exports.register = register;
exports.default = { login: exports.login, register: exports.register };
