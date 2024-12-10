import User from './user';
import Earning from './earnings';
import UserEarningsHistory from './user_earnings_history';

// Associações após todos os modelos serem importados
User.hasMany(UserEarningsHistory, { foreignKey: 'user_id', as: 'earningsHistory' });
UserEarningsHistory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Earning.hasMany(UserEarningsHistory, { foreignKey: 'earning_id', as: 'usersEarnings' });
UserEarningsHistory.belongsTo(Earning, { foreignKey: 'earning_id', as: 'earning' });

export { User, Earning, UserEarningsHistory };
