import { Express, NextFunction, Request, Response } from 'express'
import { makeCreateAccountUseCase, makeGetAccountUseCase, makeListAccountsUseCase } from './container'
import { CreateAccountHandler, GetAccountHandler, ListAccountsHandler } from './actions'

export class AppController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    this.app.get('/list', new ListAccountsHandler(makeListAccountsUseCase).getHandler())
    this.app.get('/get/:id', new GetAccountHandler(makeGetAccountUseCase).getHandler())
    this.app.post('/create', new CreateAccountHandler(makeCreateAccountUseCase).getHandler())

    return Promise.resolve()
  }
}
