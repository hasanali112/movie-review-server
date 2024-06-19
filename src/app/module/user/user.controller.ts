/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { userService } from './user.service'

const createUserIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.createUser(req.body)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User create successfully',
      date: result,
    })
  } catch (error: any) {
    next()
  }
}

export const userController = {
  createUserIntoDB,
}
