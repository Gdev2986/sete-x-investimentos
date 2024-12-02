"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
class Earning extends sequelize_1.Model {
}
Earning.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01, // Valor mínimo deve ser positivo
        },
    },
}, {
    sequelize: database_1.default,
    schema: 'setex',
    modelName: 'Earning',
    tableName: 'earnings',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});
exports.default = Earning;
