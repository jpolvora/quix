import { HttpResult } from '@/domain/use-cases'
import { AccountsRepository } from './DbAccountsRepository'
import { DbError, EntityNotFoundError } from '@/validation/errors'
import { IEnableAccount } from '@/domain/use-cases/IEnableAccount'
import { AccountPublisher } from './AccountPublisher'

export class DbEnableAccount implements IEnableAccount {
  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: AccountPublisher,
  ) {}

  async execute(input: string): Promise<HttpResult> {
    //validacoes etc
    var account = await this.repository.getAccount(input)
    if (!account) {
      return {
        statusCode: 404,
        success: false,
        error: new EntityNotFoundError(),
      }
    }

    account.enabled = true

    try {
      await this.repository.save(account)
      await this.publisher.publishAccountEnabled(account)

      return {
        statusCode: 204,
        success: true,
        error: undefined,
      }
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        error: new DbError(error),
      }
    }
  }
}
