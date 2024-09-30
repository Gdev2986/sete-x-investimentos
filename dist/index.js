"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appConfig_1 = __importDefault(require("./config/appConfig"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.listen(appConfig_1.default.port, () => {
    console.log(`Server is running on port ${appConfig_1.default.port}`);
});
