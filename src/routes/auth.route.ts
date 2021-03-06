import { Router } from 'express'
import AuthController from '@controllers/auth.controller'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { Routes } from '@interfaces/routes.interface'
import authMiddleware from '@middlewares/auth.middleware'
import validationMiddleware from '@middlewares/validation.middleware'
import { LoginUserDto } from '@/dtos/users/userLogin.dto'

class AuthRoute implements Routes {
  public path = '/'
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp)
    this.router.get(`${this.path}signup-confirmation/:code`, validationMiddleware(String, 'params'), this.authController.signUpConfirmation)
    this.router.post(`${this.path}login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn)
    this.router.post(`${this.path}logout`, this.authController.logOut)
    this.router.post(`${this.path}reloadToken`, validationMiddleware(String, 'body'), this.authController.reloadToken)
  }
}

export default AuthRoute
