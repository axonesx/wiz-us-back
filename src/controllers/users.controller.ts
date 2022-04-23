import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '@/dtos/users/users.dto'
import userService from '@services/users.service'
import { User } from '@/models/users/users.model'
import { logger } from '@/utils/logger'
import { UpdateUserDto } from '@/dtos/users/userUpdate.dto'

class UsersController {

  public userService = new userService()

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start >> getUsers`)
      const findAllUsersData: User[] = await this.userService.findAllUser()

      res.status(200).json({ data: findAllUsersData, message: 'findAll' })
      logger.info(`End >> getUsers`)
    } catch (error) {
      logger.error(`Error >> getUsers`)
      next(error)
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start >> getUserById >> userId ${req.params.id}`)
      const userId = Number(req.params.id)
      const findOneUserData: User = await this.userService.findUserById(userId)

      res.status(200).json({ data: findOneUserData, message: 'findOne' })
      logger.info(`End >> getUserById >> userId ${req.params.id}`)
    } catch (error) {
      logger.error(`Error >> getUserById >> userId ${req.params.id}`)
      next(error)
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start >> createUser >> mail ${req.body.email}`)
      const userData: CreateUserDto = req.body
      const createUserData: User = await this.userService.createUser(userData)

      res.status(201).json({ data: createUserData, message: 'created' })
      logger.info(`End >> createUser >> mail ${req.body.email}`)
    } catch (error) {
      logger.error(`Error >> createUser >> mail ${req.body.email}`)
      next(error)
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start >> updateUser >> userId ${req.params.id}`)
      const userId = Number(req.params.id)
      const userData: UpdateUserDto = req.body
      const updateUserData: User = await this.userService.updateUser(userId, userData)

      res.status(200).json({ data: updateUserData, message: 'updated' })
      logger.info(`End >> updateUser >> userId ${req.params.id}`)
    } catch (error) {
      logger.error(`Error >> updateUser >> userId ${req.params.id}`)
      next(error)
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Start >> deleteUser >> userId ${req.params.id}`)
      const userId = Number(req.params.id)
      const deleteUserData: User = await this.userService.deleteUser(userId)

      res.status(200).json({ data: deleteUserData, message: 'deleted' })
      logger.info(`End >> deleteUser >> userId ${req.params.id}`)
    } catch (error) {
      logger.error(`Error >> deleteUser >> userId ${req.params.id}`)
      next(error)
    }
  }
}

export default UsersController
