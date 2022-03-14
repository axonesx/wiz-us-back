import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@models/users/interface/users.interface';
import userService from '@services/users.service';
import { I18n } from '@/i18n';

class UsersController {
  
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locale = I18n.getPreferredLocale(req)
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId, locale);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locale = I18n.getPreferredLocale(req)
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData, locale);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locale = I18n.getPreferredLocale(req)
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData, locale);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locale = I18n.getPreferredLocale(req)
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId, locale);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
