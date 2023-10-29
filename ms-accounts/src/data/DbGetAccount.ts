import { GetAccountInput, GetAccountOutput } from '@/use-cases'
import { IGetAccount } from '@/use-cases/IGetAccount'
import AccountsRepository from './DbAccountsRepository'
import { DbError } from '@/validation/DbError'
import { HttpNotFoundError } from '@/validation/HttpNotFoundError'

export default class DbGetAccount implements IGetAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async run(id: GetAccountInput): Promise<GetAccountOutput> {
    try {
      const account = await this.repository.getAccount(id)
      if (!account)
        return {
          success: false,
          error: new HttpNotFoundError(),
        }
      return {
        success: true,
        data: account,
      }
    } catch (er) {
      return {
        success: false,
        error: new DbError(er),
      }
    }
  }
}
