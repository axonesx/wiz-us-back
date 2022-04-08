import { User } from '@/models/users/interface/users.interface'
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

interface DataStoredInToken extends JwtPayload {
  id: number
  firstName: string
  lastName: string
  email: string
  xsrfToken: string
}

interface TokenData {
  token: string
  expiresIn: number
}

interface RequestWithUser extends Request {
  user: User
}

export { RequestWithUser, TokenData, DataStoredInToken }