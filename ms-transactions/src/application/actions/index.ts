export * from './DepositHandler'

import { AccountDTO } from '@/data/AccountDTO'
import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { makeUpdateBalanceUseCase } from '../container'
import { TransactionDTO } from '@/data/TransactionDTO'

export async function processDeposit(dto: TransactionDTO): Promise<boolean> {
  console.log('processDeposit:DTO', dto)
  //atualizar saldo
  //notificar
  const useCase: IUpdateBalance = makeUpdateBalanceUseCase()

  const result = await useCase.execute({
    accountId: dto.target,
  })

  console.log(result)

  if (result.error) {
    //handle error
  }

  return result.success
}

export async function processAccountCreated(dto: AccountDTO): Promise<boolean> {
  console.log('processAccountCreated:DTO', dto)

  return await Promise.resolve(true)
}
