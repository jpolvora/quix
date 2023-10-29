import { GetAccountInput, GetAccountOutput } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'
import { IGetAccount } from '@/domain/use-cases/IGetAccount'
import { Request } from 'express'

export class GetAccountHandler extends ActionHandler<GetAccountInput, GetAccountOutput, IGetAccount> {
  getInput(req: Request): GetAccountInput {
    const input: GetAccountInput = req.params['id']
    return input
  }
}
