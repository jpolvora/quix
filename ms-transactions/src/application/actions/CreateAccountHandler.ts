import { CreateAccountInput, CreateAccountOuput } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'
import { ICreateAccount } from '@/domain/use-cases'

export class CreateAccountHandler extends ActionHandler<CreateAccountInput, CreateAccountOuput, ICreateAccount> {}
