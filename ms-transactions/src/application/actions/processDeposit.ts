import { AccountDTO } from '@/data/AccountDTO'
import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { makeUpdateBalanceUseCase } from '../container'

export async function processDeposit(dto: AccountDTO): Promise<boolean> {
  console.log('processDeposit:DTO', dto)
  //atualizar saldo
  //notificar
  const useCase: IUpdateBalance = makeUpdateBalanceUseCase()

  return (await useCase.execute(dto)).success
}
