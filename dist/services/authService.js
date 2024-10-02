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
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Encontrar o usuário pelo email
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
        // Lançar erro se o usuário não for encontrado ou a senha estiver incorreta
        throw new Error('Invalid credentials');
    }
    // Gerar token JWT com o ID do usuário
    const token = jsonwebtoken_1.default.sign({ id: user.id }, appConfig_1.default.jwtSecret, { expiresIn: '1h' });
    return token;
});
exports.login = login;
exports.default = { login: exports.login };
