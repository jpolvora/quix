import express, { Express, json } from 'express'
import { AppController } from './AppController'

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

  new AppController(app).configureRoutes()

  return Promise.resolve(app)
}
