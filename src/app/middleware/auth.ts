import { NextFunction, Request, Response } from 'express'
import { USER_ROLE } from '../module/user/user.constant'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { UserModel } from '../module/user/user.model'

export const authorizeUser = (...userRole: (keyof typeof USER_ROLE)[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization
      if (!accessToken) {
        throw new Error('You are not eligible to create admin')
      }
      const varifyToken = jwt.verify(accessToken, config.access_token as string)

      const { role, email } = varifyToken as JwtPayload

      if (!userRole.includes(role)) {
        throw new Error('You are not admin')
      }

      const user = await UserModel.findOne({ email })

      if (user?.role !== role) {
        throw new Error('You are not authorize to create  admin')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
