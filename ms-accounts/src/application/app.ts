import express, { Express, Request, Response, json } from 'express'
import { AppController } from './AppController'
import { NextFunction } from 'connect'

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

  await new AppController(app).configureRoutes()

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)

    return res.status(500).json({
      success: false,
      statusCode: 500,
      error: err,
      errorDetails: err.message,
    })
  })
  return app
}
