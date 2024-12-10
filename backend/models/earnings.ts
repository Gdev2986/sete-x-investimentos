import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Earning extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Earning.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Earning',
  tableName: 'earnings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Earning;
