import { Request } from 'express'
import { DisableAccountInput, DisableAccountOutput } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'
import { IDisableAccount } from '@/domain/use-cases/IDisableAccount'

export class DisableAccountHandler extends ActionHandler<DisableAccountInput, DisableAccountOutput, IDisableAccount> {
  getInput(req: Request): DisableAccountInput {
    const input: DisableAccountInput = req.params['id']
    return input
  }
}
