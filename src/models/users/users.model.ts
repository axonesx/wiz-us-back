import { Sequelize, DataTypes, Model,
  CreationOptional, InferAttributes,
  InferCreationAttributes, NonAttribute,
  HasOneCreateAssociationMixin, HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Association} from 'sequelize'
import { Confirmation } from '../confirmation/confirmation.model'

export class User extends Model<
InferAttributes<User, { omit: 'Confirmation' }>,
InferCreationAttributes<User, { omit: 'Confirmation' }>
> implements User {
  public id: CreationOptional<number>
  public email: string
  public password: string
  public firstName: string
  public lastName: string
  public birthday: Date

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  //SignUpConfirmation methods
  public getConfirmation: HasOneGetAssociationMixin<Confirmation>
  public setConfirmation: HasOneSetAssociationMixin<Confirmation, number>
  public createConfirmation: HasOneCreateAssociationMixin<Confirmation>

  //Associations
  public Confirmation?: NonAttribute<Confirmation>
  public static associations: {
    Confirmation: Association<User, Confirmation>
  }
}

export default function (sequelize: Sequelize): typeof User {
  User.init(
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
        type: DataTypes.DATE(),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  )
  return User
}
