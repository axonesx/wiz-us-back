import { Model } from 'sequelize/types';
import { OpinionModel } from '../../opinions/opinions.model';
import { UserModel } from '../../users/users.model';
import { User_Opinions } from './interface/user_opinions.interface';


export class User_OpinionsModel extends Model<User_Opinions> implements User_Opinions{
}

export default function (): typeof User_OpinionsModel {

  UserModel.hasMany(OpinionModel);
  OpinionModel.belongsTo(UserModel);

  return User_OpinionsModel;
}
