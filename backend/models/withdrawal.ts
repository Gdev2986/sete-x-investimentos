import { DataTypes, Model, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Withdrawal extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
  public status!: string;
  public pix_key!: string;
  public name_account_withdrawal!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Métodos para associação com o modelo User
  public user?: User;
  public getUser!: BelongsToGetAssociationMixin<User>;
}

Withdrawal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'approved', 'rejected']],
      },
    },
    pix_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name_account_withdrawal: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    schema: 'setex',
    tableName: 'withdrawals',
    modelName: 'Withdrawal',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Definição de associação
Withdrawal.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

export default Withdrawal;
