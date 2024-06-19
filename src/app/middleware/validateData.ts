import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateDataFromClient = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseData = await schema.parseAsync(req.body)

      req.body = parseData
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateDataFromClient
