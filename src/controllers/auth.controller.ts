import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { User } from '@models/users/interface/users.interface'
import { RequestWithUser } from '@interfaces/auth.interface'
import AuthService from '@services/auth.service'
import { LoginUserDto } from '@/dtos/users/userLogin.dto'

class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const signUpUserData: User = await this.authService.signup(userData)

      res.status(201).json({ data: signUpUserData, message: 'signup' })
    } catch (error) {
      next(error)
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body
      // const { token, refreshToken, xsrfToken, optionsTokenCookie, optionsRefreshTokenCookie, findUser } = await this.authService.login(userData)
      const { token, xsrfToken, optionsTokenCookie, findUser } = await this.authService.login(userData)

      res.cookie('access-token', token, optionsTokenCookie)
      // res.cookie('refresh-token', refreshToken, optionsRefreshTokenCookie)
      res.status(200).json({
        data: {
          xsrfToken,
          findUser
        },
        message: 'login'
      })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user
      const logOutUserData: User = await this.authService.logout(userData)

      res.cookie('access-token', '', {maxAge: 0})
      res.status(200).json({ data: logOutUserData, message: 'logout' })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
