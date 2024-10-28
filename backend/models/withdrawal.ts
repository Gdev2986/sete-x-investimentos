import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Withdrawal extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
  public status!: string;
}

Withdrawal.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
  },
}, {
  sequelize,
  schema: 'setex',
  modelName: 'Withdrawal',
  tableName: 'withdrawals',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

export default Withdrawal;
