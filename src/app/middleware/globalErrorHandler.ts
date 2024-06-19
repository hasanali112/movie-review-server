import { ErrorRequestHandler } from 'express'
import httpStatus from 'http-status'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = httpStatus.BAD_REQUEST
  let message = 'Something went wrong !'
  res.status(statusCode).json({
    success: httpStatus.BAD_REQUEST,
    message: err.message || message,
    error: err,
  })
}

export default globalErrorHandler
