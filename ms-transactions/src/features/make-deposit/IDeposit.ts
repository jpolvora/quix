import { Deposit } from '.'
import { IUseCase } from '@/domain/use-cases'

export interface IDeposit extends IUseCase<Deposit.Input, Deposit.Output> {}
