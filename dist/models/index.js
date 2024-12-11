"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Withdrawal = exports.UserEarningsHistory = exports.Earning = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const earnings_1 = __importDefault(require("./earnings"));
exports.Earning = earnings_1.default;
const user_earnings_history_1 = __importDefault(require("./user_earnings_history"));
exports.UserEarningsHistory = user_earnings_history_1.default;
const withdrawal_1 = __importDefault(require("./withdrawal"));
exports.Withdrawal = withdrawal_1.default;
// Associações para User
user_1.default.hasMany(user_earnings_history_1.default, { foreignKey: 'user_id', as: 'earningsHistory' });
user_earnings_history_1.default.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
user_1.default.hasMany(withdrawal_1.default, { foreignKey: 'user_id', as: 'withdrawals' });
withdrawal_1.default.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
// Associações para Earnings
earnings_1.default.hasMany(user_earnings_history_1.default, { foreignKey: 'earning_id', as: 'usersEarnings' });
user_earnings_history_1.default.belongsTo(earnings_1.default, { foreignKey: 'earning_id', as: 'earning' });
