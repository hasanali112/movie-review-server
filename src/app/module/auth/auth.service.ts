import config from '../../config'
import { USER_ROLE } from '../user/user.constant'
import { TUser } from '../user/user.interface'
import { UserModel } from '../user/user.model'
import { isMatchPassword } from './auth.utils'
import jwt from 'jsonwebtoken'

const userRegister = async (payload: TUser) => {
  const userExist = await UserModel.findOne({ email: payload.email })

  if (userExist) {
    throw new Error('User already exist')
  }

  payload.role = USER_ROLE.USER

  const result = await UserModel.create(payload)
  return result
}

const login = async (payload: TUser) => {
  const userExist = await UserModel.findOne({ email: payload.email })

  if (!userExist) {
    throw new Error('Email not found')
  }

  if (userExist.status === 'BLOCKED') {
    throw new Error('You account has block')
  }

  const matchPassword = await isMatchPassword(
    payload.password,
    userExist.password,
  )

  if (!matchPassword) {
    throw new Error('Password does not match')
  }

  const jwtPayload = {
    email: userExist.email,
    role: userExist.role,
  }

  const accessToken = jwt.sign(jwtPayload, config.access_token as string, {
    expiresIn: config.access_token_expire_in,
  })

  const refreshToken = jwt.sign(jwtPayload, config.refresh_token as string, {
    expiresIn: config.refresh_expire_in,
  })

  return {
    accessToken,
    refreshToken,
  }
}

export const authService = {
  userRegister,
  login,
}
