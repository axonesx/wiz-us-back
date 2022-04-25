import { Router } from 'express'
import UsersController from '@controllers/users.controller'
import { CreateUserDto } from '@/dtos/users/users.dto'
import { Routes } from '@interfaces/routes.interface'
import validationMiddleware from '@middlewares/validation.middleware'
import { UpdateUserDto } from '@/dtos/users/userUpdate.dto'
import authMiddleware from '@/middlewares/auth.middleware'
import filesFormMiddleWare from '@/middlewares/filesForm.middleware'

class UsersRoute implements Routes {
  public path = '/users'
  public router = Router()
  public usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.all(`${this.path}/*`, authMiddleware)
    this.router.get(`${this.path}/all`, this.usersController.getUsers)
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser)
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById)
    
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser)
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateUserDto, 'body'), this.usersController.updateUser)
    this.router.post(`${this.path}/:id/upload`, filesFormMiddleWare)
  }
}

export default UsersRoute

