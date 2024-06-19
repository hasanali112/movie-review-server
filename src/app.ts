import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import middlewareRoutes from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

app.use('/api/v1', middlewareRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    successe: true,
    message: 'Movie review running successfully',
  })
})

app.use(globalErrorHandler)

export default app
