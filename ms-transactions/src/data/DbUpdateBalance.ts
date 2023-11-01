import { TRANSACTION_TYPES, UpdateBalanceInput, UpdateBalanceOutput } from '@/domain/use-cases'
import { TransactionPublisher } from './TransactionPublisher'
import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { Decimal } from '@prisma/client/runtime/library'
import { IAccountRepository, ITransactionRepository } from '@/domain/repository'

export class DbUpdateBalance implements IUpdateBalance {
  constructor(
    private readonly accountsRepository: IAccountRepository,
    private readonly transactionsRepository: ITransactionRepository,
    private readonly publisher: TransactionPublisher,
  ) {}

  async execute(input: UpdateBalanceInput): Promise<UpdateBalanceOutput> {
    if (!input.accountId)
      return {
        success: false,
        balance: '0',
      }
    //recuperar todas as transactions do jovem
    const transactions = await this.transactionsRepository.getAllTransactionsByAccount(input.accountId)
    //calcular saldo
    const balance = transactions
      .filter((x) => x.type === TRANSACTION_TYPES.CASH_DEPOSIT)
      .map((x) => x.amount)
      .reduce((x, y) => Decimal.sum(x, y), new Decimal(0))

    //console.log('novo saldo: ', balance)
    //atualizar saldo
    try {
      const updated = await this.accountsRepository.updateBalance(input.accountId, balance)
      if (updated) {
        //enviar notificacao de atualizar saldo
        this.publisher.publishBalanceUpdated(updated)
      }
    } catch (error) {
      return {
        balance: '0.00',
        success: false,
      }
    }

    return {
      balance: balance.toString(),
      success: true,
    }
  }
}
