"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
class Withdrawal extends sequelize_1.Model {
}
Withdrawal.init({
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
            min: {
                args: [0.01],
                msg: 'O valor da retirada deve ser maior que zero.',
            },
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: 'pending',
        validate: {
            isIn: {
                args: [['pending', 'approved', 'rejected']],
                msg: 'Status inválido. Deve ser "pending", "approved" ou "rejected".',
            },
        },
    },
}, {
    sequelize: database_1.default,
    schema: 'setex',
    modelName: 'Withdrawal',
    tableName: 'withdrawals',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});
exports.default = Withdrawal;
