import { Sequelize, DataTypes, Model } from 'sequelize';
import { ActivityModel } from '../../activities/activities.model';
import { UserModel } from '../../users/users.model';
import { User_Activity } from './interface/user_activity.interface';


export class User_ActivityModel extends Model<User_Activity> implements User_Activity{
  public isOwned: boolean;
}

export default function (sequelize: Sequelize): typeof User_ActivityModel {
  User_ActivityModel.init(
    {
      isOwned: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'user_activity',
      sequelize,
    },
  );

  UserModel.belongsToMany(ActivityModel, {
    through: User_ActivityModel
  });
  ActivityModel.belongsToMany(UserModel, {
    through: User_ActivityModel
  });

  return User_ActivityModel;
}
