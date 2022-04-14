import { IUser } from "@/models/users/interface/users.interface"
import { Model, NonAttribute } from "sequelize/types"

export interface IConfirmation extends Model {
  code: string
  isConfirmed: boolean

  createdAt: Date
  updatedAt: Date

  User?: NonAttribute<IUser>
}