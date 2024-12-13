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
exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validar o ID
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: 'ID inválido. Por favor, forneça um ID numérico.' });
            return;
        }
        const userId = Number(id);
        // Buscar o usuário pelo ID
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
            return;
        }
        // Retornar o usuário com os campos desejados
        res.status(200).json({
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            contact: user.contact,
            role: user.role,
            balance: parseFloat(user.balance),
            total_allocated: parseFloat(user.total_allocated),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({
            message: 'Erro interno no servidor. Por favor, tente novamente mais tarde.',
            error: error.message,
        });
    }
});
exports.getUser = getUser;
