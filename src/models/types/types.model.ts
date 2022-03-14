import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
//import { User } from '@/models/users/interface/users.interface';
import { Type } from './interface/types.interface';

export type TypeCreationAttributes = Optional<Type, 'id'>;

export class TypeModel extends Model<Type, TypeCreationAttributes> implements Type {

  public id: number;
  public title: string;
  public description: string;

  public readonly createdAt!: Date;
  //public readonly createdBy!: User;
  public readonly updatedAt!: Date;
  //public readonly updatedBy!: User;
  public readonly deletedAt!: Date;
  //public readonly deleteBy!: User;
}

export default function (sequelize: Sequelize): typeof TypeModel {
  TypeModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'types',
      sequelize,
      paranoid: true
    },
  );

  return TypeModel;
}
