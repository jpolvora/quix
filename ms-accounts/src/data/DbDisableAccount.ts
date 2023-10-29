import { DisableAccountOutput } from '@/domain/use-cases'
import AccountsRepository from './DbAccountsRepository'
import { DbError, HttpNotFoundError } from '@/validation/errors'
import { IDisableAccount } from '@/domain/use-cases/IDisableAccount'

export class DbDisableAccount implements IDisableAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(input: string): Promise<DisableAccountOutput> {
    //validacoes etc
    var account = await this.repository.getAccount(input)
    if (!account) {
      return {
        success: false,
        error: new HttpNotFoundError(),
      }
    }

    account.enabled = false

    try {
      await this.repository.save(account)

      return {
        success: true,
        error: undefined,
      }
    } catch (error) {
      return {
        success: false,
        error: new DbError(error),
      }
    }
  }
}
