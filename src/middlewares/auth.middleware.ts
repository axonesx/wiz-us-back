import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '@config'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface'
import UserService from '@/services/users.service'

const userService = new UserService()

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { cookies, headers } = req

    if (!cookies || !cookies['access-token']) {
      return next(new HttpException(401, 'Authentication token missing'))
    }
    const accessToken: string = cookies['access-token']

    if (!headers || !headers['x-xsrf-token']) {
      return next(new HttpException(401, 'Missing XSRF token in headers'))
    }
    const xsrfToken = headers['x-xsrf-token']

    const decodedToken = verify(accessToken, ACCESS_TOKEN_SECRET) as DataStoredInToken

    if (xsrfToken !== decodedToken.xsrfToken) {
      return next(new HttpException(498, 'Bad xsrf token'))
    }

    const userId = decodedToken.id
    const user = await userService.findUserById(userId)
    if (!user) {
      return res.status(401).json({ message: `User ${userId} not exists` })
    }

    req.user = user

    return next()
  } catch (err) {
    return next(new HttpException(500, 'Internal error'))
  }
}

export default authMiddleware
