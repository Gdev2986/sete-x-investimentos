import { DataTypes, Model, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Deposit extends Model {
  public id!: number;
  public user_id!: number;
  public amount!: number;
  public status!: string;

  // Adicione isso para tipar a associação
  public user?: User; // Aqui, adicionamos a propriedade `user`
  public getUser!: BelongsToGetAssociationMixin<User>; // Métodos de associação
}

Deposit.init(
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
      validate: {
        min: {
          args: [0.01],
          msg: 'O valor do depósito deve ser maior que zero.',
        },
      },
    },
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: {
          args: [['pending', 'approved', 'rejected']],
          msg: 'Status inválido. Deve ser "pending", "approved" ou "rejected".',
        },
      },
    },
  },
  {
    sequelize,
    schema: 'setex',
    modelName: 'Deposit',
    tableName: 'deposits',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

// Defina explicitamente o relacionamento
Deposit.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

export default Deposit;
