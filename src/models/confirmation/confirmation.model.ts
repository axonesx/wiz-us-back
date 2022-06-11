import { InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize'
import { Sequelize, DataTypes, Model } from 'sequelize'
import { User } from '../users/users.model'
import { IConfirmation } from './interface/confirmation.interface'

export class Confirmation extends Model<
InferAttributes<Confirmation, { omit: 'User' }>,
InferCreationAttributes<Confirmation, { omit: 'User' }>
> implements IConfirmation {
  public code: string
  public isConfirmed: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  //Associations
  public User?: NonAttribute<User>
}

export default function (sequelize: Sequelize): typeof Confirmation {
  Confirmation.init(
    {
      code: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      isConfirmed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'confirmations',
      sequelize,
    },
  )
  return Confirmation
}
