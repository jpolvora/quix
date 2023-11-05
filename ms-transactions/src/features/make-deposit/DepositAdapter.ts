import ExpressAdapter from '@/infra/ExpressAdapter'
import { Deposit, IDeposit } from '.'
import { Request } from 'express'

export class DepositAdapter extends ExpressAdapter<Deposit.Input, Deposit.Output, IDeposit> {
  protected getInput(req: Request): Deposit.Input {
    return {
      accountId: req.params['accountId'],
      amount: req.body.amount,
    }
  }
}
