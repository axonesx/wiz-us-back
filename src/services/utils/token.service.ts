import { logger } from '@/utils/logger'
import { sign, SignOptions } from 'jsonwebtoken'
import { DataStoredInToken } from '@/interfaces/auth.interface'
import crypto from 'crypto'
import { User } from '@/models/users/users.model'
import { IUser } from '@/models/users/interface/users.interface'

class TokenService {

    public createXSRFToken ():string {
        const xsrfToken = crypto.randomBytes(64).toString('hex')
        logger.info(`xsrfToken created`)
        return xsrfToken
    }

    public createToken(user: IUser, secretKey: string, options: SignOptions, xsrfToken?: string ): string {
        const dataStoredInToken: DataStoredInToken = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, xsrfToken }
        const token = sign(dataStoredInToken, secretKey, options)
        logger.info(`Token created`)
        return token
    }

}
export default TokenService