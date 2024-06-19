/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import { USER_ROLE, USER_STATUS } from './user.constant'
import bycrypt from 'bcryptjs'
import config from '../../config'

const userSchema = new Schema<TUser>({
  name: { type: String, required: [true, 'Name is required'] },
  role: {
    type: String,
    enum: Object.keys(USER_ROLE),
    required: [true, 'Role is requires'],
  },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  status: {
    type: String,
    enum: Object.keys(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
  passwordChangeAt: {
    type: Date,
  },
})

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bycrypt.hash(user.password, Number(config.salt_round))
  next()
})

export const UserModel = model<TUser>('User', userSchema)
