import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Notification } from './interface/notifications.interface';

export type NotificationCreationAttributes = Optional<Notification, 'id'>;

export class NotificationModel extends Model<Notification, NotificationCreationAttributes> implements Notification {

  public id: number;
  public title: string;
  public message: string;

  public readonly createdAt!: Date;
  //public readonly createdBy!: User;
  public readonly updatedAt!: Date;
  //public readonly updatedBy!: User;
  public readonly deletedAt!: Date;
  //public readonly deleteBy!: User;
}

export default function (sequelize: Sequelize): typeof NotificationModel {
  NotificationModel.init(
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
      message: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'notifications',
      sequelize,
      paranoid: true
    },
  );

  return NotificationModel;
}
