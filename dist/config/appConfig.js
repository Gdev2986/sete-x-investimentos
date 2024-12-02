"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing in .env file.');
    process.exit(1);
}
const config = {
    jwtSecret: process.env.JWT_SECRET,
    port: parseInt(process.env.PORT || '4000', 10), // Garantir que o valor é um número
};
exports.default = config;
