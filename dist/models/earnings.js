"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Earning extends sequelize_1.Model {
}
Earning.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'Earning',
    tableName: 'earnings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = Earning;
