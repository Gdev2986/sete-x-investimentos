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
            res.status(400).json({ message: 'ID inválido' });
            return;
        }
        // Buscar o usuário pelo ID
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        else {
            // Retornar usuário com campos adicionais
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                balance: user.balance,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        }
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});
exports.getUser = getUser;
