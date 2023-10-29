import { Express } from 'express'
import {
  makeChangeAccountHandler,
  makeCreateAccountHandler,
  makeDisableAccountHandler,
  makeEnableAccountHandler,
  makeGetAccountHandler,
  makeListAccountHandler,
} from './container'

export class ApiController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    this.app.get('/list', makeListAccountHandler())
    this.app.get('/get/:id', makeGetAccountHandler())
    this.app.post('/create', makeCreateAccountHandler())
    this.app.patch('/change-account-type', makeChangeAccountHandler())
    this.app.patch('/disable-account/:id', makeDisableAccountHandler())
    this.app.patch('/enable-account/:id', makeEnableAccountHandler())

    return Promise.resolve()
  }
}
