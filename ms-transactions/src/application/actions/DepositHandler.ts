import { DepositInput, DepositOutput } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'
import { IDeposit } from '@/domain/use-cases/IDeposit'
import { Request } from 'express'

export class DepositHandler extends ActionHandler<DepositInput, DepositOutput, IDeposit> {
  protected getInput(req: Request): DepositInput {
    return {
      accountId: req.params['accountId'],
      amount: req.body.amount,
    }
  }
}
