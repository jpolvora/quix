import { DepositInput, DepositOutput } from '@/domain/use-cases'
import ExpressAdapter from '../../../infra/ExpressAdapter'
import { IDeposit } from '@/domain/use-cases/IDeposit'
import { Request } from 'express'

export class DepositAdapter extends ExpressAdapter<DepositInput, DepositOutput, IDeposit> {
  protected getInput(req: Request): DepositInput {
    return {
      accountId: req.params['accountId'],
      amount: req.body.amount,
    }
  }
}
