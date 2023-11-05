import { IUseCase, Result } from '@/domain/use-cases'
import { AccountCreated } from '.'

export interface IAccountCreated extends IUseCase<AccountCreated.Input, AccountCreated.Output> {}
