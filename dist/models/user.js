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
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome é obrigatório.',
            },
            len: {
                args: [3, 100],
                msg: 'O nome deve ter entre 3 e 100 caracteres.',
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
