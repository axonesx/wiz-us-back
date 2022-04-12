import DB from '@databases'
import { CreateConfirmationDto } from '@/dtos/confirmations.dto'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { User } from '@/models/users/users.model'
import { Confirmation } from '@/models/confirmation/confirmation.model'

class ConfirmationService {

  public users = DB.Users

  public async getConfirmation(userData: User): Promise<Confirmation> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not a User")
    const confirmationData: Confirmation = await userData.getConfirmation()
    return confirmationData
  }

  public async createConfirmation(userData: User, confirmationData: CreateConfirmationDto): Promise<void> {
    if (isEmpty(confirmationData)) throw new HttpException(400, "You're not confirmationData")
    const test = await userData.createConfirmation({...confirmationData})
  }

  public async updateConfirmation(userData: User): Promise<User> {
    if (isEmpty(userData.Confirmation)) throw new HttpException(400, "You're not ConfirmationData")
    if (isEmpty(userData)) throw new HttpException(400, "You're not a user")
    await userData.Confirmation.save()
    return userData
  }
}

export default ConfirmationService
