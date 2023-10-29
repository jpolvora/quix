import { CreateAccountInput, CreateAccountOuput, IUseCase } from './types'

export interface ICreateAccount extends IUseCase<CreateAccountInput, CreateAccountOuput> {}
