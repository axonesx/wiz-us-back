import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '@/dtos/users/users.dto'
import userService from '@services/users.service'
import { User } from '@/models/users/users.model'
import { logger } from '@/utils/logger'

class UsersController {

  public userService = new userService()

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start getUsers`)
      const findAllUsersData: User[] = await this.userService.findAllUser()

      res.status(200).json({ data: findAllUsersData, message: 'findAll' })
      logger.info(`End getUsers`)
    } catch (error) {
      logger.error(`Error during getUsers`)
      next(error)
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start getUserById ${req.params.id}`)
      const userId = Number(req.params.id)
      const findOneUserData: User = await this.userService.findUserById(userId)

      res.status(200).json({ data: findOneUserData, message: 'findOne' })
      logger.info(`End getUserById ${req.params.id}`)
    } catch (error) {
      logger.error(`Error during getUserById ${req.params.id}`)
      next(error)
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start createUser ${req.body.email}`)
      const userData: CreateUserDto = req.body
      const createUserData: User = await this.userService.createUser(userData)

      res.status(201).json({ data: createUserData, message: 'created' })
      logger.info(`End createUser ${req.body.email}`)
    } catch (error) {
      logger.error(`Error during createUser ${req.body.email}`)
      next(error)
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start updateUser ${req.params.id}`)
      const userId = Number(req.params.id)
      const userData: CreateUserDto = req.body
      const updateUserData: User = await this.userService.updateUser(userId, userData)

      res.status(200).json({ data: updateUserData, message: 'updated' })
      logger.info(`End updateUser ${req.params.id}`)
    } catch (error) {
      logger.error(`Error during updateUser ${req.params.id}`)
      next(error)
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start deleteUser ${req.params.id}`)
      const userId = Number(req.params.id)
      const deleteUserData: User = await this.userService.deleteUser(userId)

      res.status(200).json({ data: deleteUserData, message: 'deleted' })
      logger.info(`End deleteUser ${req.params.id}`)
    } catch (error) {
      logger.error(`Error during deleteUser ${req.params.id}`)
      next(error)
    }
  }
}

export default UsersController
