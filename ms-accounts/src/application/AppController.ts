import {
  CreateAccountInput,
  CreateAccountOuput,
  GetAccountInput,
  GetAccountOutput,
  IListAccounts,
  ListAccountsInput,
  ListAccountsOutput,
} from '@/use-cases'
import { Express, NextFunction, Request, Response } from 'express'
import { makeCreateAccountUseCase, makeGetAccountUseCase, makeListAccountsUseCase } from './container'
import { createInputFromRequest } from '@/shared/utils/app'
import { ICreateAccount } from '@/use-cases/ICreateAccount'
import { IGetAccount } from '@/use-cases/IGetAccount'
import ActionHandler from './actions/ActionHandler'

interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export class AppController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    this.app.get('/list', this.list.bind(this))
    this.app.get('/get/:id', this.get.bind(this))
    this.app.post('/create', this.create.bind(this))

    return Promise.resolve()
  }

  private async list(req: Request, res: Response, next: NextFunction) {
    const page = req.query['page'] || 1
    const pageSize = req.query['pageSize'] || 20

    const handler = new ActionHandler<ListAccountsInput, ListAccountsOutput, IListAccounts>(makeListAccountsUseCase, {
      req,
      res,
      next,
    })
    await handler.handle({
      page: Number(page),
      pageSize: Number(pageSize),
    })
  }

  private async get(req: Request, res: Response, next: NextFunction) {
    const input: GetAccountInput = req.params['id']

    const handler = new ActionHandler<GetAccountInput, GetAccountOutput, IGetAccount>(makeGetAccountUseCase, {
      req,
      res,
      next,
    })
    await handler.handle(input)
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    const input: CreateAccountInput = createInputFromRequest(req)

    const handler = new ActionHandler<CreateAccountInput, CreateAccountOuput, ICreateAccount>(
      makeCreateAccountUseCase,
      {
        req,
        res,
        next,
      },
    )
    await handler.handle(input, 201)
  }
}
