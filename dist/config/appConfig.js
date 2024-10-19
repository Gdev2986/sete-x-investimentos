"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: process.env.PORT || 5432,
    jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
};
exports.default = config;
