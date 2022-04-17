import { hash } from 'bcrypt'
import DB from '@databases'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import ConfirmationService from '@/services/confirmations.service'
import { IUser } from '@/models/users/interface/users.interface'

class UserService {
  public users = DB.Users
  public confirmations = DB.Confirmations
  public confirmationService = new ConfirmationService()

  public async findAllUser(): Promise<IUser[]> {
    const allUser: IUser[] = await this.users.findAll({include: [this.confirmations]})
    return allUser
  }

  public async findUserById(userId: number): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, "Not a user ID")

    const findUser: IUser = await this.users.findByPk(userId, {include: [this.confirmations]})
    if (!findUser) throw new HttpException(409, `This user ${userId} is not an existing user`)

    return findUser
  }

  public async findUserByEmail(userEmail: string): Promise<IUser> {
    if (isEmpty(userEmail)) throw new HttpException(400, "Not a userEmail")

    const findUser: IUser = await this.users.findOne({ where: { email: userEmail }, include: [this.confirmations] })
    if (!findUser) throw new HttpException(409, `This email ${userEmail} does not exist`)

    return findUser
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: IUser = await this.users.findOne({ where: { email: userData.email } })
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`)
    const hashedPassword = await hash(userData.password, 10)
    const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword})
    return createUserData
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: IUser = await this.users.findByPk(userId)
    if (!findUser) throw new HttpException(409, "You're not user")

    const hashedPassword = await hash(userData.password, 10)
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } })
    let updateUser: IUser = await this.users.findByPk(userId)

    return updateUser
  }

  public async deleteUser(userId: number): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, "Not a user ID")

    const findUser: IUser = await this.users.findByPk(userId)
    if (!findUser) throw new HttpException(409, "You're not user")

    await this.users.destroy({ where: { id: userId } })

    return findUser
  }
}

export default UserService
