import { AccountsRepository, TransactionRepository } from '.'
import { UpdateBalanceOutput } from '@/domain/use-cases'
import { TransactionPublisher } from './AccountPublisher'
import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { AccountDTO } from './AccountDTO'

export class DbUpdateBalance implements IUpdateBalance {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly transactionsRepository: TransactionRepository,
    private readonly publisher: TransactionPublisher,
  ) {}

  execute(input: AccountDTO): Promise<UpdateBalanceOutput> {
    return Promise.resolve({
      balance: '0',
      success: true,
      error: undefined,
    })
  }
}
