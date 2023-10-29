import { Express } from 'express'
import {
  makeChangeAccountTypeUseCase,
  makeCreateAccountUseCase,
  makeDisableAccountHandler,
  makeDisableAccountUseCase,
  makeEnableAccountHandler,
  makeGetAccountUseCase,
  makeListAccountHandler,
  makeListAccountsUseCase,
} from './container'
import { ChangeAccountTypeHandler, CreateAccountHandler, GetAccountHandler, ListAccountsHandler } from './actions'
import { ExpressAdapter } from './actions/ExpressAdapter'

export class ApiController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    this.app.get('/list', makeListAccountHandler())
    this.app.get('/get/:id', new GetAccountHandler(makeGetAccountUseCase).getHandler())
    this.app.post('/create', new CreateAccountHandler(makeCreateAccountUseCase).getHandler())
    this.app.patch('/change-account-type', new ChangeAccountTypeHandler(makeChangeAccountTypeUseCase).getHandler())
    this.app.patch('/disable-account/:id', makeDisableAccountHandler())
    this.app.patch('/enable-account/:id', makeEnableAccountHandler())

    return Promise.resolve()
  }
}
