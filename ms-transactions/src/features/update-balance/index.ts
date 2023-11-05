import { AccountDTO } from '@/data/dto/AccountDTO'
import { Result } from '@/domain/use-cases'

export * from './DbUpdateBalance'
export * from './IUpdateBalance'
export * from './UpdateBalanceAdapter'

export namespace UpdateBalance {
  export type Input = AccountDTO
  export type Outpout = Result
}
