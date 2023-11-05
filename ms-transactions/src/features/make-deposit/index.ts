import { HttpResult } from '@/domain/use-cases'

export * from './IDeposit'
export * from './DepositAdapter'
export * from './DbDeposit'

export namespace Deposit {
  export type Input = {
    accountId: string
    amount: number
  }

  export type Output = HttpResult & {
    balance: number
  }
}
