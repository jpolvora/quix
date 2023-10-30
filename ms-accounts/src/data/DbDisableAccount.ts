import { DisableAccountOutput } from '@/domain/use-cases'
import { AccountsRepository } from './DbAccountsRepository'
import { DbError, EntityNotFoundError } from '@/validation/errors'
import { IDisableAccount } from '@/domain/use-cases/IDisableAccount'

export class DbDisableAccount implements IDisableAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(input: string): Promise<DisableAccountOutput> {
    //validacoes etc
    var account = await this.repository.getAccount(input)
    if (!account) {
      return {
        statusCode: 404,
        success: false,
        error: new EntityNotFoundError(),
      }
    }

    account.enabled = false

    try {
      await this.repository.save(account)

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
