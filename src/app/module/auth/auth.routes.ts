import { Router } from 'express'
import { authController } from './auth.controller'

const routes = Router()

routes.post('/register', authController.register)
routes.post('/login', authController.login)

export const authRoutes = routes
