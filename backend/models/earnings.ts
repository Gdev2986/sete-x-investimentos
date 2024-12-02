import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Earning extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
}

Earning.init(
  {
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
      validate: {
        min: 0.01, // Valor mínimo deve ser positivo
      },
    },
  },
  {
    sequelize,
    schema: 'setex',
    modelName: 'Earning',
    tableName: 'earnings',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

export default Earning;
