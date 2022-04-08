import { compare, hash } from 'bcrypt'
import { JwtPayload, sign, SignOptions } from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from '@config'
import DB from '@databases'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { isEmpty } from '@utils/util'
import { User } from '@/models/users/interface/users.interface'
import { LoginUserDto } from '@/dtos/users/userLogin.dto'
import crypto from 'crypto'
import cookieParser from 'cookie-parser'
import { CookieOptions } from 'express'

class AuthService {
  public users = DB.Users

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({ where: { email: userData.email } })
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`)

    const hashedPassword = await hash(userData.password, 10)
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword })

    return createUserData
  }

  // public async login(userData: LoginUserDto): Promise<{ token: string, refreshToken: string, xsrfToken: string, optionsTokenCookie: CookieOptions, optionsRefreshTokenCookie: CookieOptions, findUser: User }> {
  public async login(userData: LoginUserDto): Promise<{ token: string, xsrfToken: string, optionsTokenCookie: CookieOptions, findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData")

    const findUser: User = await this.users.findOne({ where: { email: userData.email } })
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`)

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching")

    const xsrfToken = this.createXSRFToken()
    const optionsToken: SignOptions = {expiresIn: parseInt(ACCESS_TOKEN_EXPIRES_IN, 10)}
    const token: string = this.createToken(findUser, ACCESS_TOKEN_SECRET, optionsToken, xsrfToken)
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

  public createXSRFToken ():string {
    const xsrfToken = crypto.randomBytes(64).toString('hex')
    return xsrfToken
  }

  public createToken(user: User, secretKey: string, options: SignOptions, xsrfToken?: string ): string {
    const dataStoredInToken: DataStoredInToken = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, xsrfToken }
    const token = sign(dataStoredInToken, secretKey, options)
    return token
  }

}

export default AuthService
