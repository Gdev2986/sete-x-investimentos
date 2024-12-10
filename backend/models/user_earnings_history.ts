import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserEarningsHistory extends Model {
  public id!: number;
  public user_id!: number;
  public earning_id!: number;
  public valorRecebido!: number;
  public taxaAplicada!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserEarningsHistory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  earning_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valorRecebido: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  taxaAplicada: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'UserEarningsHistory',
  tableName: 'user_earnings_history',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default UserEarningsHistory;
