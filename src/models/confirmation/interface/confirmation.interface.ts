import { IUser } from "@/models/users/interface/users.interface"
import { Model, NonAttribute } from "sequelize/types"

export interface IConfirmation extends Model {
  code: string
  isConfirmed: boolean

  User?: NonAttribute<IUser>
}