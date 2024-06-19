import { Router } from 'express'
import { userRoutes } from '../module/user/user.routes'
import { authRoutes } from '../module/auth/auth.routes'

const middlewareRoutes = Router()
const routes = [
  {
    path: '/users',
    router: userRoutes,
  },
  {
    path: '/auth',
    router: authRoutes,
  },
]

routes.forEach(route => middlewareRoutes.use(route.path, route.router))

export default middlewareRoutes
