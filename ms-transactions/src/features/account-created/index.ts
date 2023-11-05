import { AccountDTO } from '@/data/dto/AccountDTO'
import { Result } from '@/domain/use-cases'

export * from './IAccountCreated'
export * from './DbAccountCreated'
export * from './AccountCreatedAdapter'

export namespace AccountCreated {
  export type Input = AccountDTO
  export type Output = Result
}
