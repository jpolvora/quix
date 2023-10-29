import { CreateAccountInput, CreateAccountOuput } from '@/use-cases'
import ActionHandler from './ActionHandler'
import { ICreateAccount } from '@/use-cases/ICreateAccount'

export class CreateAccountHandler extends ActionHandler<CreateAccountInput, CreateAccountOuput, ICreateAccount> {
  protected getSuccessStatusCode(): number {
    return 201
  }
}
