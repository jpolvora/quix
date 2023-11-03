import { Result, TRANSACTION_TYPES } from '@/domain/use-cases'
import { TransactionPublisher } from '../TransactionPublisher'
import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { Decimal } from '@prisma/client/runtime/library'
import { IAccountRepository, ITransactionRepository } from '@/domain/repository'
import { AccountDTO } from '../dto/AccountDTO'
import { DbError, MissingParamError } from '@/validation/errors'

export class DbUpdateBalance implements IUpdateBalance {
  constructor(
    private readonly accountsRepository: IAccountRepository,
    private readonly transactionsRepository: ITransactionRepository,
    private readonly publisher: TransactionPublisher,
  ) {}

  async execute(input: AccountDTO): Promise<Result> {
    const { id: accountId } = input

    if (!accountId)
      return {
        success: false,
        error: new MissingParamError('input.id'),
      }

    //recuperar todas as transactions do jovem
    const transactions = await this.transactionsRepository.getAllTransactionsByAccount(accountId)
    //calcular saldo
    const balance = transactions
      .filter((x) => x.type === TRANSACTION_TYPES.CASH_DEPOSIT)
      .map((x) => x.amount)
      .reduce((x, y) => Decimal.sum(x, y), new Decimal(0))

    //console.log('novo saldo: ', balance)
    //atualizar saldo
    try {
      const updated = await this.accountsRepository.updateBalance(accountId, balance)
      if (updated) {
        //enviar notificacao de atualizar saldo
        this.publisher.publishBalanceUpdated(updated)
      }
    } catch (error: any) {
      return {
        success: false,
        error: new DbError(error.toString()),
      }
    }

    return {
      success: true,
    }
  }
}
