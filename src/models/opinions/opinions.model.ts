import { Sequelize, DataTypes, Model, Optional } from 'sequelize'
//import { User } from '@/models/users/interface/users.interface'
import { Opinion } from './interface/opinions.interface'

export type OpinionCreationAttributes = Optional<Opinion, 'id'>

export class OpinionModel extends Model<Opinion, OpinionCreationAttributes> implements Opinion {

  public id: number
  public userAuthorId: number
  public userTargetId: number
  public note: number
  public title: string
  public comment: string

  public readonly createdAt!: Date
  //public readonly createdBy!: User
  public readonly updatedAt!: Date
  //public readonly updatedBy!: User
  public readonly deletedAt!: Date
  //public readonly deleteBy!: User
}

export default function (sequelize: Sequelize): typeof OpinionModel {
  OpinionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userAuthorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userTargetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      comment: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'opinions',
      sequelize,
      paranoid: true
    },
  )

  return OpinionModel
}
