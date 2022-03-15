import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ActivityModel } from '../activities/activities.model';
import { User } from './interface/users.interface';

export type UserCreationAttributes = Optional<User, 'id'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public birthday: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(255),      
        validate: {
          isEmail: true
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),      
        validate: {
          isEmail: true
        },
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATEONLY(),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );
  return UserModel;
}
