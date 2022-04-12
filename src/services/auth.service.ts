import { compare, hash } from 'bcrypt'
import { SignOptions, verify } from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET, TOKEN_SECRET } from '@config'
import DB from '@databases'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { LoginUserDto } from '@/dtos/users/userLogin.dto'
import { CookieOptions } from 'express'
import TokenService from '@services/utils/token.service'
import ConfirmationService from '@/services/confirmations.service'
import { DataStoredInToken, UserWithStatus } from '@/interfaces/auth.interface'
import { CreateConfirmationDto } from '@/dtos/confirmations.dto'
import { Locales } from '@/i18n/i18n-types'
import EmailService from './utils/email.service'
import { User } from '@/models/users/users.model'
import { logger } from '@/utils/logger'
import { IUser } from '@/models/users/interface/users.interface'

class AuthService {
  public users = DB.Users
  public confirmations = DB.Confirmations
  public tokenService = new TokenService()
  public confirmationService = new ConfirmationService()
  public emailService = new EmailService()

  public async signUpConfirmation(confirmationCode: string ): Promise<void> {
    if (isEmpty(confirmationCode)) throw new HttpException(400, "Not a confirmation code")
    const dataStoredInToken: DataStoredInToken = verify(confirmationCode, TOKEN_SECRET) as DataStoredInToken

    if (isEmpty(dataStoredInToken.id)) throw new HttpException(400, "No user ID in confirmation Code")
    let findUser: IUser = await this.users.findByPk( dataStoredInToken.id, { include: [this.confirmations] })
    if(findUser.Confirmation.code !== confirmationCode) throw new HttpException(409, "Your confirmation code is expired")
    findUser.Confirmation.isConfirmed=true
    findUser = await this.confirmationService.updateConfirmation(findUser)

    if(!findUser.Confirmation.isConfirmed) throw new HttpException(409, "Your account can't be actived")
  }

  public async signup(userData: CreateUserDto, locale: Locales): Promise<UserWithStatus> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: IUser = await this.users.findOne({ where: { email: userData.email }, include: [this.confirmations] })
    if (findUser) {
      if(findUser.Confirmation?.isConfirmed){
        throw new HttpException(409, `An activated account already exits for this email ${userData.email}.`)
      } else {
        const confirmationData = await this.createAndSendSignUpConfirmation(findUser, locale)
        findUser.Confirmation.code = confirmationData.code
        await this.confirmationService.updateConfirmation(findUser)
        return { user: findUser, isNewUser: false}
      }
    } else {
      const hashedPassword = await hash(userData.password, 10)
      const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword })
      const confirmationData = await this.createAndSendSignUpConfirmation(createUserData, locale)
      await this.confirmationService.createConfirmation(createUserData, confirmationData)
      return { user: createUserData, isNewUser: true}
    }
  }

  public async createAndSendSignUpConfirmation(userData: IUser, locale: Locales): Promise<CreateConfirmationDto> {
    const confirmationCode = this.tokenService.createToken(userData, TOKEN_SECRET, {})
    if(!confirmationCode) throw new HttpException(409, `Can't create confirmation code`)

    const mailId = await this.emailService.sendSignUpConfirmationMail(userData.email, confirmationCode, locale)
    if(!mailId) throw new HttpException(409, `Can't send the confirmation mail`)

    const confirmationData: CreateConfirmationDto = {
        code: confirmationCode,
        isConfirmed: false
    }
    return confirmationData
  }

  // public async login(userData: LoginUserDto): Promise<{ token: string, refreshToken: string, xsrfToken: string, optionsTokenCookie: CookieOptions, optionsRefreshTokenCookie: CookieOptions, findUser: User }> {
  public async login(userData: LoginUserDto): Promise<{ token: string, xsrfToken: string, optionsTokenCookie: CookieOptions, findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({ where: { email: userData.email }, include: [this.confirmations] } )
    if (!findUser) throw new HttpException(409, `Your email ${userData.email} not found`)
    if (!findUser.Confirmation.isConfirmed) throw new HttpException(409, `Your account is not confirmed, please check your email`)

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching")

    const xsrfToken = this.tokenService.createXSRFToken()
    const optionsToken: SignOptions = {expiresIn: parseInt(ACCESS_TOKEN_EXPIRES_IN, 10)}
    const token: string = this.tokenService.createToken(findUser, ACCESS_TOKEN_SECRET, optionsToken, xsrfToken)
    // const optionsRefreshToken: SignOptions = {expiresIn: parseInt(REFRESH_TOKEN_EXPIRES_IN, 10)}
    // const refreshToken: string = this.createToken(findUser, REFRESH_TOKEN_SECRET, optionsRefreshToken)
    const optionsTokenCookie = {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(ACCESS_TOKEN_EXPIRES_IN, 10),
      path: '*'
    }
    // const optionsRefreshTokenCookie = {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: parseInt(REFRESH_TOKEN_EXPIRES_IN, 10),
    //   path: '/token'
    // }

    // return { token, refreshToken, xsrfToken, optionsTokenCookie, optionsRefreshTokenCookie, findUser }
    return { token, xsrfToken, optionsTokenCookie, findUser }
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } })
    if (!findUser) throw new HttpException(409, "You're not user")

    return findUser
  }

}

export default AuthService
