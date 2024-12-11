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
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'approved', 'rejected']],
        },
    },
    pix_key: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    name_account_withdrawal: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    schema: 'setex',
    tableName: 'withdrawals',
    modelName: 'Withdrawal',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
// Definição de associação
Withdrawal.belongsTo(user_1.default, { as: 'user', foreignKey: 'user_id' });
exports.default = Withdrawal;
