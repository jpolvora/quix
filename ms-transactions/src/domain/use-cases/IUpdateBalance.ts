import { AccountDTO } from '@/data/dto/AccountDTO'
import { IUseCase, Result } from './types'

export interface IUpdateBalance extends IUseCase<AccountDTO, Result> {}
