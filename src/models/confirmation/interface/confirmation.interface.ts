import { Model } from "sequelize/types"

export interface IConfirmation extends Model {
  code: string
  isConfirmed: boolean
}