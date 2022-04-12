import DB from '@databases'
import { CreateConfirmationDto } from '@/dtos/confirmations.dto'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { Confirmation } from '@/models/confirmation/confirmation.model'
import { IUser } from '@/models/users/interface/users.interface'
import { IConfirmation } from '@/models/confirmation/interface/confirmation.interface'

class ConfirmationService {

  public users = DB.Users

  public async getConfirmation(userData: IUser): Promise<IConfirmation> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not a User")
    const confirmationData: Confirmation = await userData.getConfirmation()
    return confirmationData
  }

  public async createConfirmation(userData: IUser, confirmationData: CreateConfirmationDto): Promise<void> {
    if (isEmpty(confirmationData)) throw new HttpException(400, "You're not confirmationData")
    const test = await userData.createConfirmation({...confirmationData})
  }

  public async updateConfirmation(userData: IUser): Promise<IUser> {
    if (isEmpty(userData.Confirmation)) throw new HttpException(400, "You're not ConfirmationData")
    if (isEmpty(userData)) throw new HttpException(400, "You're not a user")
    await userData.Confirmation.save()
    return userData
  }
}

export default ConfirmationService
