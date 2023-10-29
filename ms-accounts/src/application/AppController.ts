import {
  CreateAccountInput,
  CreateAccountOuput,
  GetAccountInput,
  GetAccountOutput,
  IListAccounts,
  ListAccountsOutput,
  Paging,
} from '@/use-cases'
import { Express, NextFunction, Request, Response } from 'express'
import { makeCreateAccountUseCase, makeGetAccountUseCase, makeListAccountsUseCase } from './container'
import { createInputFromRequest } from '@/shared/utils/app'
import { ICreateAccount } from '@/use-cases/ICreateAccount'
import { ValidationError } from '@/validation/errors/ValidationError'
import { IGetAccount } from '@/use-cases/IGetAccount'
import { HttpNotFoundError } from '@/validation/errors/HttpNotFoundError'
import { DbError, MissingParamError } from '@/validation/errors'

export class AppController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    this.app.get('/list', this.list.bind(this))
    this.app.get('/get/:id', this.get.bind(this))
    this.app.post('/create', this.create.bind(this))

    return Promise.resolve()
  }

  private handleError(error: Error, res: Response, next: NextFunction) {
    if (!error) return next(new Error('unknow error'))

    if (error instanceof HttpNotFoundError) {
      return res.status(404).json({
        succces: false,
        error: error.name,
      })
    }

    if (error instanceof DbError) {
      return res.status(500).json({
        succces: false,
        error: error.name,
      })
    }

    if (error instanceof ValidationError || error instanceof MissingParamError) {
      return res.status(400).json({
        succces: false,
        error: error.name,
      })
    }

    return next(error)
  }

  private async list(req: Request, res: Response, next: NextFunction) {
    const page = req.query['page'] || 1
    const pageSize = req.query['pageSize'] || 20

    const useCase: IListAccounts = makeListAccountsUseCase()

    const input: Paging = {
      page: Number(page),
      pageSize: Number(pageSize),
    }

    const output: ListAccountsOutput = await useCase.execute(input)
    if (output.success) return res.json(output)

    return this.handleError(output.error, res, next)
  }

  private async get(req: Request, res: Response, next: NextFunction) {
    const input: GetAccountInput = req.params['id']
    const useCase: IGetAccount = makeGetAccountUseCase()
    const output: GetAccountOutput = await useCase.execute(input)

    if (output.success) return res.json(output)

    return this.handleError(output.error, res, next)
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    const request: any = createInputFromRequest(req)
    const useCase: ICreateAccount = makeCreateAccountUseCase()
    const input: CreateAccountInput = {
      id: request.id,
      accountType: request.accountType,
    }
    const output: CreateAccountOuput = await useCase.execute(input)

    if (output.success) return res.status(201).json(output)

    return output.error ? this.handleError(output.error, res, next) : next(new Error('unhandled error'))
  }
}
