import { CreationOptional, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, NonAttribute } from "sequelize/types"

export interface IUser extends Model {
  id:  CreationOptional<number>
  email: string
  password: string
  firstName: string
  lastName: string
  birthday: Date
}