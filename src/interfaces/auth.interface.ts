import { Activity } from '@/models/activities/interface/activities.interface';
import { User } from '@/models/users/interface/users.interface';
import { Request } from 'express';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}