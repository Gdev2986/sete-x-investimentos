import User from './user';
import Earning from './earnings';
import UserEarningsHistory from './user_earnings_history';
import Withdrawal from './withdrawal';

// Associações para User
User.hasMany(UserEarningsHistory, { foreignKey: 'user_id', as: 'earningsHistory' });
UserEarningsHistory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Withdrawal, { foreignKey: 'user_id', as: 'withdrawals' });
Withdrawal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Associações para Earnings
Earning.hasMany(UserEarningsHistory, { foreignKey: 'earning_id', as: 'usersEarnings' });
UserEarningsHistory.belongsTo(Earning, { foreignKey: 'earning_id', as: 'earning' });

export { User, Earning, UserEarningsHistory, Withdrawal };
