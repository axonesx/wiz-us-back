import { Confirmation } from "@/models/confirmation/confirmation.model"
import { IConfirmation } from "@/models/confirmation/interface/confirmation.interface"
import { CreationOptional, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model, NonAttribute } from "sequelize/types"

export interface IUser extends Model {
  id:  CreationOptional<number>
  email: string
  password: string
  firstName: string
  lastName: string
  birthday: Date
  Confirmation?: NonAttribute<IConfirmation>

 
  createdAt: Date
  updatedAt: Date

  getConfirmation: HasOneGetAssociationMixin<Confirmation>
  setConfirmation: HasOneSetAssociationMixin<Confirmation, number>
  createConfirmation: HasOneCreateAssociationMixin<Confirmation>
}