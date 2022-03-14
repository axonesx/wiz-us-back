import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { User } from '@/models/users/interface/users.interface';
import L from '../i18n/i18n-node'
import { Locale } from 'typesafe-i18n/types/core';

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number, locale: Locale): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, L[locale].USER_HTTP_400_ID());

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, L[locale].HTTP_USER_409_USER());

    return findUser;
  }

  public async createUser(userData: CreateUserDto, locale: Locale): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, L[locale].HTTP_USER_400_DATA());

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, L[locale].HTTP_USER_409_EMAIL({ mail: userData.email }));

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto, locale: Locale): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, L[locale].HTTP_USER_400_DATA());

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, L[locale].HTTP_USER_409_USER());

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number, locale: Locale): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, L[locale].USER_HTTP_400_ID());

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, L[locale].HTTP_USER_409_USER());

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
