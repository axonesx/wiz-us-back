import { IUser } from '@/models/users/interface/users.interface'
import { JwtPayload } from 'jsonwebtoken'

interface UserWithStatus {
  user: IUser
  isNewUser: boolean
}

interface DataStoredInToken extends JwtPayload {
  id: number
  firstName: string
  lastName: string
  email: string
  xsrfToken?: string
}

interface TokenData {
  token: string
  expiresIn: number
}

export { TokenData, DataStoredInToken, UserWithStatus }