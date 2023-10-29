import express, { Express, Request, Response, json } from 'express'
import { AppController } from './AppController'
import { NextFunction } from 'connect'
import { DbError, ValidationError } from '@/validation/errors'

export async function setupApp(): Promise<Express> {
  //ensure services connected before proceed ()

  try {
    //await prisma.$connect()
    //await amqp-connect
    //await redis-connect
  } catch (error) {
    console.log(error)
    throw error
  }

  const app = express()

  //setup middlewares

  app.use(json())

  app.use((_, res, next) => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-headers', '*')
    res.set('access-control-allow-methods', '*')
    res.type('json')
    return next()
  })

  //setup routes

  app.get('/', (_, res) => {
    return res.json({
      message: 'Welcome to accounts microservice',
    })
  })

  app.get('/throw500', (req, res) => {
    var error = new Error('Error forçado')
    throw error
  })

  app.get('/throw400', (req, res) => {
    var error = new ValidationError('Erro forçado')
    throw error
  })

  await new AppController(app).configureRoutes()

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)

    let statusCode = 500
    if (err instanceof ValidationError) statusCode = 400
    if (err instanceof DbError) statusCode = 500

    return res.status(500).json({
      success: false,
      env: process.env.NODE_ENV,
      statusCode: statusCode,
      error: err,
      errorDetails:
        (process.env.NODE_ENV !== 'production' && {
          message: err.message,
          stack: err.stack,
        }) ||
        undefined,
    })
  })
  return app
}
