import { CreateAccountInput, CreateAccountOuput, IUseCase, Result } from './types'

export interface ICreateAccount extends IUseCase<CreateAccountInput, CreateAccountOuput> {}
