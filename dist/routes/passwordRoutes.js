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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Verificar a senha atual
router.post('/verify-password', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { currentPassword } = req.body;
    try {
        // Verifica se o usuário está autenticado e se existe no banco
        const user = yield user_1.default.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            res.status(404).json({ valid: false, message: 'Usuário não encontrado' });
            return;
        }
        // Verifica se a senha atual está correta
        const isValidPassword = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!isValidPassword) {
            res.status(401).json({ valid: false, message: 'Senha atual incorreta' });
            return;
        }
        res.status(200).json({ valid: true });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao verificar senha', error: error.message });
    }
}));
// Atualizar a senha
router.put('/update-password', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { newPassword } = req.body;
    try {
        // Verifica se o usuário está autenticado e se existe no banco
        const user = yield user_1.default.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        // Gera o hash da nova senha e salva no banco
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        yield user.save();
        res.status(200).json({ message: 'Senha atualizada com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar senha', error: error.message });
    }
}));
exports.default = router;
