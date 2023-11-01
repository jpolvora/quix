import express, { Express, NextFunction, Request, Response, json } from 'express'
import { ApiController } from './ApiController'
import { DbError, EntityNotFoundError, ValidationError } from '@/validation/errors'
import { IApplication } from '../shared/types/IApplication'
import { startApp } from '@/shared/utils/app'

export class ExpressApp implements IApplication<Express> {
  private app: Express | null = null

  constructor(readonly port: number | string) {}

  getApp(): Express {
    if (this.app == null) this.app = express()
    return this.app
  }

  async start(): Promise<void> {
    const app = this.getApp()

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
        message: 'Welcome to TRANSACTIONS microservice',
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

    await new ApiController(app).configureRoutes()

    //global 404 error handler
    app.use((_req: Request, _res: Response, next: NextFunction) => {
      return next(new EntityNotFoundError())
    })

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      //console.error(err.stack)

      let statusCode = 500
      if (err instanceof ValidationError) statusCode = 400
      if (err instanceof EntityNotFoundError) statusCode = 404
      if (err instanceof DbError) statusCode = 500

      return res.status(statusCode).json({
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

    await startApp(app, Number(this.port))
  }
}
