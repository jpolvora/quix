import { DbError } from '@/validation/errors/DbError'
import { DepositInput, DepositOutput } from '@/domain/use-cases'
import { TransactionPublisher } from './TransactionPublisher'
import { IDeposit } from '@/domain/use-cases/IDeposit'
import { EntityNotFoundError } from '@/validation/errors'
import { IAccountRepository, ITransactionRepository } from '@/domain/repository'

export class DbDeposit implements IDeposit {
  constructor(
    private readonly accountsRepository: IAccountRepository,
    private readonly transactionsRepository: ITransactionRepository,
    private readonly publisher: TransactionPublisher,
  ) {}

  async execute(input: DepositInput): Promise<DepositOutput> {
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

      await this.publisher.publishDeposit(data)

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
