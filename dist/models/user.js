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
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
    // Método para verificar a senha
    static checkPassword(inputPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(inputPassword, storedPassword);
        });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Formato de e-mail inválido.',
            },
            notNull: {
                msg: 'O e-mail é obrigatório.',
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A senha é obrigatória.',
            },
            len: {
                args: [8, 100],
                msg: 'A senha deve ter pelo menos 8 caracteres.',
            },
        },
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome de usuário é obrigatório.',
            },
            len: {
                args: [3, 50],
                msg: 'O nome de usuário deve ter entre 3 e 50 caracteres.',
            },
        },
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O primeiro nome é obrigatório.',
            },
            len: {
                args: [1, 50],
                msg: 'O primeiro nome deve ter no máximo 50 caracteres.',
            },
        },
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    contact: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
        validate: {
            is: {
                args: /^[0-9]+$/,
                msg: 'O contato deve conter apenas números.',
            },
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: 'user',
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: {
            min: {
                args: [0.0],
                msg: 'O saldo não pode ser negativo.',
            },
        },
        get() {
            const balance = this.getDataValue('balance');
            return balance ? parseFloat(balance) : 0.0;
        },
        set(value) {
            this.setDataValue('balance', value.toFixed(2));
        },
    },
    total_allocated: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: {
            min: {
                args: [0.0],
                msg: 'O total alocado não pode ser negativo.',
            },
        },
        get() {
            const totalAllocated = this.getDataValue('total_allocated');
            return totalAllocated ? parseFloat(totalAllocated) : 0.0;
        },
        set(value) {
            this.setDataValue('total_allocated', value.toFixed(2));
        },
    },
}, {
    sequelize: database_1.default,
    schema: 'setex',
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(user.password, salt);
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed('password')) {
                const salt = yield bcrypt_1.default.genSalt(10);
                user.password = yield bcrypt_1.default.hash(user.password, salt);
            }
        }),
    },
});
exports.default = User;
