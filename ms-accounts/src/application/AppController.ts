import { Express } from 'express'
import {
  makeChangeAccountTypeUseCase,
  makeCreateAccountUseCase,
  makeGetAccountUseCase,
  makeListAccountsUseCase,
} from './container'
import { ChangeAccountTypeHandler, CreateAccountHandler, GetAccountHandler, ListAccountsHandler } from './actions'

export class AppController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    this.app.get('/list', new ListAccountsHandler(makeListAccountsUseCase).getHandler())
    this.app.get('/get/:id', new GetAccountHandler(makeGetAccountUseCase).getHandler())
    this.app.post('/create', new CreateAccountHandler(makeCreateAccountUseCase).getHandler())
    this.app.patch('/change-account-type', new ChangeAccountTypeHandler(makeChangeAccountTypeUseCase).getHandler())

    return Promise.resolve()
  }
}
