import { AccountDTO } from '@/data/dto/AccountDTO'
import { IUseCase, Result } from './types'

export interface IAccountCreated extends IUseCase<AccountDTO, Result> {}
