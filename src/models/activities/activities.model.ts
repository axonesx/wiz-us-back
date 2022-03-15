import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserModel } from '../users/users.model';
//import { User } from '@/models/users/interface/users.interface';
import { Activity } from './interface/activities.interface';

export type ActivityCreationAttributes = Optional<Activity, 'id' | 'description' | 'duration' | 'type' | 'image'>;

export class ActivityModel extends Model<Activity, ActivityCreationAttributes> implements Activity {

  public id: number;
  public title: string;
  public description: string;
  public date: Date;
  public duration: number;
  public type: string;
  public image: string;
  public location: string;

  public readonly createdAt!: Date;
  //public readonly createdBy!: User;
  public readonly updatedAt!: Date;
  //public readonly updatedBy!: User;
  public readonly deletedAt!: Date;
  //public readonly deleteBy!: User;
}

export default function (sequelize: Sequelize): typeof ActivityModel {
  ActivityModel.init(
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
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      duration: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      image: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      location: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'activities',
      sequelize,
      paranoid: true
    },
  );

  return ActivityModel;
}
