import { Request } from 'express'
import { EnableAccountInput, EnableAccountOutput } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'
import { IEnableAccount } from '@/domain/use-cases/IEnableAccount'

export class EnableAccountHandler extends ActionHandler<EnableAccountInput, EnableAccountOutput, IEnableAccount> {
  getInput(req: Request): EnableAccountInput {
    const input: EnableAccountInput = req.params['id']
    return input
  }
}
