import { AccountsRepository, TransactionRepository } from '.'
import { TRANSACTION_TYPES, UpdateBalanceOutput } from '@/domain/use-cases'
import { TransactionPublisher } from './AccountPublisher'
import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { AccountDTO } from './AccountDTO'
import { Decimal } from '@prisma/client/runtime/library'

export class DbUpdateBalance implements IUpdateBalance {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly transactionsRepository: TransactionRepository,
    private readonly publisher: TransactionPublisher,
  ) {}

  async execute(input: AccountDTO): Promise<UpdateBalanceOutput> {
    //recuperar todas as transactions do jovem
    const transactions = await this.transactionsRepository.getAllTransactionsByAccount(input.id)
    //calcular saldo
    const balance = transactions
      .filter((x) => x.type === TRANSACTION_TYPES.CASH_DEPOSIT)
      .map((x) => x.amount)
      .reduce((x, y) => Decimal.sum(x, y), new Decimal(0))

    console.log('novo saldo: ', balance)
    //atualizar saldo
    try {
      const updated = await this.accountsRepository.updateBalance(input.id, balance)
      //enviar notificacao de atualizar saldo
      this.publisher.publishBalanceUpdated(updated)
    } catch (error) {}

    return {
      balance: balance.toString(),
      success: true,
    }
  }
}
