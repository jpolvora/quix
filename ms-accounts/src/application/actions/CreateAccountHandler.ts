import { CreateAccountInput, CreateAccountOuput } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'
import { ICreateAccount } from '@/domain/use-cases'
//import { Request } from 'express'

export class CreateAccountHandler extends ActionHandler<CreateAccountInput, CreateAccountOuput, ICreateAccount> {
  // protected getInput(req: Request): CreateAccountInput {
  //   return {
  //     accountType: req.body.accountType,
  //     id: req.body.id,
  //   }
  // }

  protected getSuccessStatusCode(): number {
    return 201
  }
}
