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
// src/routes/rendimentoRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const rendimentoService_1 = require("../services/rendimentoService");
const router = express_1.default.Router();
router.post('/distribuir', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield (0, rendimentoService_1.distribuirRendimentos)();
        res.status(200).json({
            message: 'Rendimentos distribuídos com sucesso',
            taxaAplicada: `${resultado.taxaAplicada}%`,
            rendimentoBrutoPercentual: `${resultado.rendimentoBrutoPercentual.toFixed(2)}%`,
            totalAlocado: resultado.totalAlocado
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao distribuir rendimentos', error: error.message });
    }
}));
exports.default = router;
