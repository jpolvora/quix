import { IListAccounts, ListAccountsOutput } from '@/use-cases'
import { Express, NextFunction, Request, Response } from 'express'
import { makeCreateAccountUseCase, makeGetAccountUseCase, makeListAccountsUseCase } from './container'
import { createInputFromRequest } from '@/shared/utils/app'
import { AccountOutput, ICreateAccount } from '@/use-cases/ICreateAccount'
import { ValidationError } from '@/validation/ValidationError'
import { IGetAccount } from '@/use-cases/IGetAccount'
import { HttpNotFoundError } from '@/validation/HttpNotFoundError'

export class AppController {
  constructor(private readonly app: Express) {}

  public configureRoutes() {
    this.app.get('/list', this.list)
    this.app.get('/get/:id', this.get)
    this.app.post('/create', this.create)
  }

  private async list(req: Request, res: Response, next: NextFunction) {
    const page = req.query['page'] || 1
    const pageSize = req.query['pageSize'] || 20
    const useCase: IListAccounts = makeListAccountsUseCase()
    const result: ListAccountsOutput = await useCase.run({
      page: Number(page),
      pageSize: Number(pageSize),
    })
    if (result.success) return res.json(result)
    return next(result.error)
  }

  private async get(req: Request, res: Response, next: NextFunction) {
    //console.log(req.params)
    const id = req.params['id']
    const useCase: IGetAccount = makeGetAccountUseCase()
    const result = await useCase.run(id)
    //console.log(result)

    if (result.success) return res.json(result)
    if (result.error instanceof HttpNotFoundError) {
      return res.status(404).json(result)
    }
    return next(result.error)
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    const request: any = createInputFromRequest(req)

    //todo: better validation layer
    const useCase: ICreateAccount = makeCreateAccountUseCase()
    const result: AccountOutput = await useCase.execute(request.id, request.accountType)

    if (result.success) return res.status(201).json(result)

    if (result.error instanceof ValidationError)
      return res.status(400).json({
        succces: false,
        error: result.error.name,
      })

    return next(result.error)
  }
}
