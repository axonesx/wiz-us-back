import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { RequestWithUser } from '@interfaces/auth.interface'
import AuthService from '@services/auth.service'
import { LoginUserDto } from '@/dtos/users/userLogin.dto'
import { I18n } from '@/i18n'
import { User } from '@/models/users/users.model'
import { FRONT_URL } from '@/config'
import { logger } from '@/utils/logger'

class AuthController {
  public authService = new AuthService()

  public signUpConfirmation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start signUpConfirmation code ${req.params.code}`)
      const confirmationCode: string = req.params.code
      await this.authService.signUpConfirmation(confirmationCode)

      res.status(201).redirect(`${FRONT_URL}/login`)
      logger.info(`End signUpConfirmation code ${req.params.code}`)
    } catch (error) {
      logger.error(`Error during signUpConfirmation code ${req.params.code}`)
      next(error)
    }
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start sign up User ${req.body.email}`)
      const userData: CreateUserDto = req.body
      const locale = I18n.getPreferredLocale(req)
      const signUpUserData: User = await this.authService.signup(userData, locale)

      res.status(201).json({ data: signUpUserData, message: 'signup' })
      logger.info(`End sign up User ${req.body.email}`)
    } catch (error) {
      logger.error(`Error during sign up User ${req.body.email}`)
      next(error)
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start login User ${req.body.email}`)
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
      logger.info(`End login User ${req.body.email}`)
    } catch (error) {
      logger.error(`Error during login User ${req.body.email}`)
      next(error)
    }
  }

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start logout User ${req.user.id}`)
      const userData: User = req.user
      const logOutUserData: User = await this.authService.logout(userData)

      res.cookie('access-token', '', {maxAge: 0})
      res.status(200).json({ data: logOutUserData, message: 'logout' })
      logger.info(`End logout User ${req.user.id}`)
    } catch (error) {
      logger.error(`Error during logout User ${req.user.id}`)
      next(error)
    }
  }
}

export default AuthController
