/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { authService } from './auth.service'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.userRegister(req.body)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User register successfully',
      date: result,
    })
  } catch (error: any) {
    next()
  }
}
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.Node_env === 'production',
    })
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User login successfully',
      date: { accessToken },
    })
  } catch (error: any) {
    next()
  }
}

export const authController = {
  register,
  login,
}
