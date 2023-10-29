import { DisableAccountOutput } from '@/domain/use-cases'
import AccountsRepository from './DbAccountsRepository'
import { DbError, HttpNotFoundError } from '@/validation/errors'
import { IEnableAccount } from '@/domain/use-cases/IEnableAccount'

export class DbEnableAccount implements IEnableAccount {
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

    account.enabled = true

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
