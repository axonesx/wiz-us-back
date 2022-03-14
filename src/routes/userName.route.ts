import { Router } from 'express';
import userNameController from '@controllers/userName.controller';
import { Routes } from '@interfaces/routes.interface';

class UserNameRoute implements Routes {
  public path = '/:name';
  public router = Router();
  public userNameController = new userNameController();

  

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userNameController.index);
  }
}

export default UserNameRoute;
