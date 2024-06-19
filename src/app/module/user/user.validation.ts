import { z } from 'zod'
import { USER_ROLE, USER_STATUS } from './user.constant'

const createUserValidationSchema = z.object({
  name: z.string(),
  role: z.nativeEnum(USER_ROLE),
  email: z.string().email(),
  password: z.string(),
  status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
  passwordChangeAt: z.date().optional(),
})

export const userValidation = {
  createUserValidationSchema,
}
