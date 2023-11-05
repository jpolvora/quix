import { TransactionPublisher } from '@/data'
import { IAccountRepository } from '@/domain/repository/IAccountRepository'
import { ITransactionRepository } from '@/domain/repository/ITransactionRepository'
import { EntityNotFoundError } from '@/validation/errors'
import { DbError } from '@/validation/errors/DbError'
import { Deposit, IDeposit } from '.'

export class DbDeposit implements IDeposit {
  constructor(
    private readonly accountsRepository: IAccountRepository,
    private readonly transactionsRepository: ITransactionRepository,
    private readonly publisher: TransactionPublisher,
  ) {}

  async execute(input: Deposit.Input): Promise<Deposit.Output> {
    const { accountId, amount } = input

    try {
      //check existing account
      const account = await this.accountsRepository.getAccount(accountId)
      if (!account) {
        return {
          statusCode: 404,
          balance: 0,
          success: false,
          error: new EntityNotFoundError(),
        }
      }

      const data = await this.transactionsRepository.deposit(account.id, amount)

      await this.publisher.publishDeposit(account)

      return {
        statusCode: 201,
        success: true,
        balance: 0,
        ...data,
      }
    } catch (error: unknown) {
      return {
        balance: 0,
        statusCode: 500,
        success: false,
        error: new DbError(error!.toString()),
      }
    }
  }
}
