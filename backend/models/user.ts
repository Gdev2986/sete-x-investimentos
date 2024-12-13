import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
  public first_name!: string;
  public last_name!: string;
  public contact!: string;
  public role!: string;
  public balance!: number; // Saldo do usuário
  public total_allocated!: number; // Total alocado do usuário
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Método para verificar a senha
  public static async checkPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
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
      type: DataTypes.STRING(100),
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
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O nome de usuário é obrigatório.',
        },
        len: {
          args: [3, 50],
          msg: 'O nome de usuário deve ter entre 3 e 50 caracteres.',
        },
      },
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O primeiro nome é obrigatório.',
        },
        len: {
          args: [1, 50],
          msg: 'O primeiro nome deve ter no máximo 50 caracteres.',
        },
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: 'O contato deve conter apenas números.',
        },
      },
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: 'user',
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      validate: {
        min: {
          args: [0.0],
          msg: 'O saldo não pode ser negativo.',
        },
      },
      get() {
        const balance = this.getDataValue('balance');
        return balance ? parseFloat(balance) : 0.0;
      },
      set(value: number) {
        this.setDataValue('balance', value.toFixed(2));
      },
    },
    total_allocated: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      validate: {
        min: {
          args: [0.0],
          msg: 'O total alocado não pode ser negativo.',
        },
      },
      get() {
        const totalAllocated = this.getDataValue('total_allocated');
        return totalAllocated ? parseFloat(totalAllocated) : 0.0;
      },
      set(value: number) {
        this.setDataValue('total_allocated', value.toFixed(2));
      },
    },
  },
  {
    sequelize,
    schema: 'setex',
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
