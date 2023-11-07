import express, { Express, NextFunction, Request, Response, json } from 'express'
import { DbError, EntityNotFoundError, ValidationError } from '@/validation/errors'
import { IApplication } from '../shared/types/IApplication'
import { startApp } from '@/shared/utils/app'
import { Server } from 'http'
import { makeDepositHandler, makeDummyHandler } from './container'

export class ExpressApp implements IApplication<Express> {
  private readonly app: Express
  private started: boolean = false
  private configured: boolean = false
  private server: Server | null = null

  constructor(readonly port: number | string) {
    this.app = express()
    this.configure()
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.started) return resolve()
      if (this.started) {
        return this.server?.close(() => resolve())
      }
    })
  }

  getApp(): Express {
    return this.app
  }

  getServer() {
    return this.server
  }

  async configure() {
    if (this.configured) return

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

    //############# APP CUSTOM ROUTES

    app.get('/list', makeDummyHandler())
    //listar todas as transacoes de uma determinada conta
    app.get('/list/:id', makeDummyHandler())
    //saque em dinheiro
    app.get('/withdawal/:account', makeDummyHandler())
    //deposito em dinheiro
    app.post('/deposit/:accountId', makeDepositHandler())
    //transferencia para outra conta
    app.get('/transfer/:sourceAccount/:targetAccount', makeDummyHandler())
    //receive pix
    app.get('/pix/:targetPix', makeDummyHandler())
    //send pix
    app.get('/pix/:sourceAccount/:targetPix', makeDummyHandler())
    //payment
    app.get('/payment/:sourceAccount/:doc', makeDummyHandler())

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

    this.configured = true
  }

  async start(): Promise<void> {
    if (this.started) return
    const app = this.getApp()
    this.server = await startApp(app, Number(this.port))
    this.started = true
  }
}
