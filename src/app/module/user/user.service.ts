import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createUser = async (payload: TUser) => {
  const result = await UserModel.create(payload)
  return result
}

export const userService = {
  createUser,
}
