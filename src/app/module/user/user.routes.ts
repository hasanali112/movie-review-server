/* eslint-disable no-undef */
import { Router } from 'express'
import validateDataFromClient from '../../middleware/validateData'
import { userValidation } from './user.validation'
import { userController } from './user.controller'
import { USER_ROLE } from './user.constant'
import { authorizeUser } from '../../middleware/auth'

const route = Router()

route.post(
  '/create-admin',
  authorizeUser(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateDataFromClient(userValidation.createUserValidationSchema),
  userController.createUserIntoDB,
)

export const userRoutes = route
